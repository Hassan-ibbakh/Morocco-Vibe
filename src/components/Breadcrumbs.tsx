import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { getDictionary, type Lang } from "@/i18n";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";

/**
 * Fil d'Ariane visible + données structurées BreadcrumbList correspondantes.
 * Le premier élément (Accueil) est ajouté automatiquement.
 */
export function Breadcrumbs({ items, lang = "fr" }: { items: Crumb[]; lang?: Lang }) {
  const t = getDictionary(lang);
  const crumbs: Crumb[] = [{ name: t.home, href: t.homePath }, ...items];
  return (
    <>
      <nav aria-label={t.breadcrumb} className="text-sm text-ink-soft">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-2">
                {isLast ? (
                  <span aria-current="page" className="font-medium text-ink">
                    {crumb.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={crumb.href}
                      className="underline-offset-4 hover:text-terracotta hover:underline"
                    >
                      {crumb.name}
                    </Link>
                    <span aria-hidden="true" className="text-sand-deep">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
