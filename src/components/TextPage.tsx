import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Container, PageHeader } from "@/components/PageHeader";
import type { Lang } from "@/i18n";

/** Gabarit des pages de texte (À propos, pages légales…). */
export function TextPage({
  title,
  path,
  intro,
  eyebrow,
  children,
  lang = "fr",
}: {
  title: string;
  path: string;
  intro?: ReactNode;
  eyebrow?: string;
  children: ReactNode;
  lang?: Lang;
}) {
  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumbs items={[{ name: title, href: path }]} lang={lang} />
      <div className="mt-8">
        <PageHeader eyebrow={eyebrow} title={title} intro={intro} />
      </div>
      <div className="prose-travel mt-10 max-w-[68ch]">{children}</div>
    </Container>
  );
}

/** Repère visuel pour une information légale à compléter. */
export function ToFill({ children, lang = "fr" }: { children: ReactNode; lang?: Lang }) {
  return (
    <mark className="rounded bg-sun/40 px-1 text-ink">
      [{lang === "en" ? "To be completed: " : "À compléter : "}
      {children}]
    </mark>
  );
}
