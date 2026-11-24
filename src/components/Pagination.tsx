import Link from "next/link";

/** URL d'une page de la liste : la page 1 est la liste elle-même (pas de doublon). */
export function guidesPageHref(page: number): string {
  return page <= 1 ? "/guides" : `/guides/page/${page}`;
}

/** Pagination par liens classiques, explorable par les moteurs de recherche. */
export function Pagination({ current, total }: { current: number; total: number }) {
  if (total <= 1) return null;
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  const base =
    "inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-4 text-sm font-medium transition-colors";

  return (
    <nav aria-label="Pagination des guides" className="mt-12">
      <ul className="flex flex-wrap items-center justify-center gap-2">
        {current > 1 && (
          <li>
            <Link href={guidesPageHref(current - 1)} className={`${base} border border-sand-deep hover:bg-sand`}>
              <span aria-hidden="true">←&nbsp;</span>Précédente
            </Link>
          </li>
        )}
        {pages.map((p) => (
          <li key={p}>
            {p === current ? (
              <span aria-current="page" className={`${base} bg-ink text-paper`}>
                <span className="sr-only">Page </span>
                {p}
              </span>
            ) : (
              <Link href={guidesPageHref(p)} className={`${base} border border-sand-deep hover:bg-sand`}>
                <span className="sr-only">Page </span>
                {p}
              </Link>
            )}
          </li>
        ))}
        {current < total && (
          <li>
            <Link href={guidesPageHref(current + 1)} className={`${base} border border-sand-deep hover:bg-sand`}>
              Suivante<span aria-hidden="true">&nbsp;→</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
