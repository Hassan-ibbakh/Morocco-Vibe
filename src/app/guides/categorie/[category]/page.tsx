import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GuideGrid } from "@/components/GuideCard";
import { CategoryFilter } from "@/components/GuidesListing";
import { Container, PageHeader } from "@/components/PageHeader";
import { getAllCategories, getCategory, getGuidesByCategory, isCategoryIndexable } from "@/lib/content";
import { fitDescription, pageMetadata } from "@/lib/seo";

/** Rendu entièrement statique : un slug inconnu renvoie un vrai code 404. */
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/categorie/[category]">): Promise<Metadata> {
  const category = getCategory((await params).category);
  if (!category) return { title: "Catégorie introuvable" };
  return pageMetadata({
    title: `${category.name} : guides pour voyager au Maroc`,
    description:
      category.seoDescription ??
      fitDescription(category.description, [
        `Tous nos guides « ${category.name} » pour préparer votre voyage au Maroc.`,
        "Tous nos guides pour préparer votre voyage au Maroc.",
      ]),
    path: `/guides/categorie/${category.slug}`,
    // Tant qu'elle ne contient que des exemples (noindex), la catégorie n'est pas indexée.
    noindex: !isCategoryIndexable(category.slug),
  });
}

export default async function CategoryPage({ params }: PageProps<"/guides/categorie/[category]">) {
  const category = getCategory((await params).category);
  if (!category) notFound();
  const guides = getGuidesByCategory(category.slug);

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumbs
        items={[
          { name: "Guides", href: "/guides" },
          { name: category.name, href: `/guides/categorie/${category.slug}` },
        ]}
      />
      <div className="mt-8">
        <PageHeader eyebrow="Catégorie" title={category.name} intro={category.description} />
      </div>
      <CategoryFilter active={category.slug} />
      <div className="mt-10">
        {guides.length ? (
          <GuideGrid guides={guides} headingLevel="h2" />
        ) : (
          <p className="rounded-2xl border border-dashed border-sand-deep p-8 text-ink-soft">
            Aucun guide n&apos;est encore publié dans cette catégorie.
          </p>
        )}
      </div>
    </Container>
  );
}
