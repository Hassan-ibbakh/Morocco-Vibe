"use client";

import { useState, useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};
const hasNativeShare = () => typeof navigator.share === "function";
const noNativeShareOnServer = () => false;

/**
 * Partage d'un article sans script tiers ni traceur : simples liens vers les
 * pages de partage des réseaux, partage natif du téléphone (Web Share API)
 * lorsqu'il existe, et copie du lien.
 */
export type ShareLabels = {
  title: string;
  native: string;
  copy: string;
  copied: string;
  copyFailed: string;
  email: string;
  newTab: string;
};

export function ShareButtons({ url, title, labels }: { url: string; title: string; labels: ShareLabels }) {
  // Faux côté serveur, détecté dans le navigateur sans écart d'hydratation.
  const canShare = useSyncExternalStore(noopSubscribe, hasNativeShare, noNativeShareOnServer);
  const [status, setStatus] = useState("");

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { label: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}` },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { label: "X", href: `https://x.com/intent/post?text=${t}&url=${u}` },
    { label: labels.email, href: `mailto:?subject=${t}&body=${u}` },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setStatus(labels.copied);
    } catch {
      setStatus(labels.copyFailed);
    }
  }

  async function nativeShare() {
    try {
      await navigator.share({ title, url });
    } catch {
      // Partage annulé par l'utilisateur : rien à faire.
    }
  }

  const btn =
    "inline-flex min-h-11 items-center gap-2 rounded-full border border-sand-deep bg-white px-4 text-sm font-medium text-ink transition hover:-translate-y-0.5 hover:border-sea hover:text-sea motion-reduce:hover:translate-y-0";

  return (
    <section aria-labelledby="partage-titre" className="mt-12">
      <h2 id="partage-titre" className="font-display text-xl font-semibold text-ink">
        {labels.title}
      </h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {canShare && (
          <li>
            <button type="button" onClick={nativeShare} className={btn}>
              {labels.native}
            </button>
          </li>
        )}
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target={l.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className={btn}
            >
              {l.label}
              {!l.href.startsWith("mailto:") && <span className="sr-only">{labels.newTab}</span>}
            </a>
          </li>
        ))}
        <li>
          <button type="button" onClick={copy} className={btn}>
            {labels.copy}
          </button>
        </li>
      </ul>
      <p aria-live="polite" className="mt-2 min-h-5 text-sm text-sea">
        {status}
      </p>
    </section>
  );
}
