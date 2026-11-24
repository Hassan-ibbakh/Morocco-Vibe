import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GuideGrid } from "@/components/GuideCard";
import { Container, PageHeader } from "@/components/PageHeader";
import { Pagination, guidesPageHref } from "@/components/Pagination";
import { getAllCategories, getGuidesByCategory } from "@/lib/content";
import type { Guide } from "@/lib/types";
import type { Crumb } from "@/lib/seo";

/** Filtre par catégorie, sous forme de liens vers des pages indexables. */
export function CategoryFilter({ active }: { active?: string }) {
  const categories = getAllCategories().filter((c) => getGuidesByCategory(c.slug).length > 0);
  const pill = "inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium transition-colors";
  return (
    <nav aria-label="Catégories de guides" className="mt-10">
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link
            href="/guides"
            aria-current={!active ? "page" : undefined}
            className={`${pill} ${!active ? "bg-ink text-paper" : "border border-sand-deep text-ink hover:bg-sand"}`}
          >
            Tous les guides
          </Link>
        </li>
        {categories.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/guides/categorie/${c.slug}`}
              aria-current={active === c.slug ? "page" : undefined}
              className={`${pill} ${active === c.slug ? "bg-ink text-paper" : "border border-sand-deep text-ink hover:bg-sand"}`}
            >
              {c.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function GuidesListing({
  guides,
  page,
  totalPages,
}: {
  guides: Guide[];
  page: number;
  totalPages: number;
}) {
  const crumbs: Crumb[] = [{ name: "Guides", href: "/guides" }];
  if (page > 1) crumbs.push({ name: `Page ${page}`, href: guidesPageHref(page) });

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumbs items={crumbs} />
      <div className="mt-8">
        <PageHeader
          eyebrow="Guides"
          title={page > 1 ? `Tous les guides — page ${page}` : "Guides pour voyager au Maroc"}
          intro="Préparatifs, itinéraires, visites et conseils sur place : des guides pratiques, régulièrement relus."
        />
      </div>
      <CategoryFilter />
      <div className="mt-10">
        {guides.length ? (
          <GuideGrid guides={guides} headingLevel="h2" />
        ) : (
          <p className="rounded-2xl border border-dashed border-sand-deep p-8 text-ink-soft">
            Aucun guide n&apos;est encore publié. Revenez bientôt !
          </p>
        )}
      </div>
      <Pagination current={page} total={totalPages} />
    </Container>
  );
}
