import Link from "next/link";
import type { ReactNode } from "react";
import { getDictionary, type Lang } from "@/i18n";

/**
 * Rend la mise en forme minimale autorisée dans le contenu :
 *   **gras**        → <strong>
 *   [texte](/lien)  → lien interne (next/link) ou externe
 * Le texte n'est jamais interprété comme du HTML.
 */
const TOKEN = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;

export function parseInline(text: string, lang: Lang = "fr"): ReactNode[] {
  const nodes: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const match of text.matchAll(TOKEN)) {
    const index = match.index ?? 0;
    if (index > last) nodes.push(text.slice(last, index));
    const [, label, href, bold] = match;
    if (bold) {
      nodes.push(<strong key={key++}>{bold}</strong>);
    } else if (href.startsWith("/")) {
      nodes.push(
        <Link key={key++} href={href}>
          {label}
        </Link>,
      );
    } else {
      nodes.push(
        <a key={key++} href={href} rel="noopener noreferrer" target="_blank">
          {label}
          <span className="sr-only">{getDictionary(lang).newTab}</span>
        </a>,
      );
    }
    last = index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

export function RichText({ text, lang = "fr" }: { text: string; lang?: Lang }) {
  return <>{parseInline(text, lang)}</>;
}
