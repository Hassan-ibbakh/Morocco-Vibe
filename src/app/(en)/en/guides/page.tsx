import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GuideGrid } from "@/components/GuideCard";
import { Container, PageHeader } from "@/components/PageHeader";
import { getAllCategories, getAllGuides } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  lang: "en",
  languages: { fr: "/guides", en: "/en/guides" },
  title: "Morocco travel guides: itineraries and practical tips",
  description:
    "All our Morocco travel guides in English: when to go, getting around, itineraries, food, money, hammams and the best things to do in Marrakech, Fez and beyond.",
  path: "/en/guides",
  ogImagePath: "/en/share-image.png",
});

/** Liste des guides en anglais, classés par catégorie (ancres utilisées par le menu). */
export default function EnglishGuidesPage() {
  const guides = getAllGuides("en");
  const sections = getAllCategories()
    .map((c) => ({ category: c, guides: guides.filter((g) => g.category === c.slug) }))
    .filter((s) => s.guides.length > 0);

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumbs items={[{ name: "Guides", href: "/en/guides" }]} lang="en" />
      <div className="mt-8">
        <PageHeader
          eyebrow="Guides"
          title="Morocco travel guides"
          intro="Practical, dated articles to prepare your trip: seasons, transport, itineraries, food, money and etiquette."
        />
      </div>

      {sections.length > 1 && (
        <nav aria-label="Jump to a category" className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {sections.map(({ category }) => (
              <li key={category.slug}>
                <a
                  href={`#${category.slug}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-sand-deep px-4 text-sm font-medium text-ink hover:bg-sand"
                >
                  {category.nameEn ?? category.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {sections.map(({ category, guides: list }) => (
        <section key={category.slug} id={category.slug} aria-labelledby={`${category.slug}-title`} className="mt-14 scroll-mt-24">
          <h2 id={`${category.slug}-title`} className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            {category.nameEn ?? category.name}
          </h2>
          {category.descriptionEn && <p className="mt-2 max-w-2xl text-ink-soft">{category.descriptionEn}</p>}
          <div className="mt-6">
            <GuideGrid guides={list} headingLevel="h3" />
          </div>
        </section>
      ))}
    </Container>
  );
}
