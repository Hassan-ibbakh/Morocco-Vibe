import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateDisclosure } from "@/components/Affiliate";
import { ArticleBody, TableOfContents } from "@/components/ArticleBody";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CoverImage } from "@/components/CoverImage";
import { DemoNotice } from "@/components/DemoNotice";
import { GuideGrid } from "@/components/GuideCard";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/PageHeader";
import { siteConfig } from "@/config/site";
import {
  getAllGuides,
  getCategory,
  getDestination,
  getGuide,
  getReadingTime,
  getRelatedGuides,
  hasActiveAffiliateLinks,
} from "@/lib/content";
import { formatDate } from "@/lib/format";
import { absoluteUrl, organizationId, pageMetadata } from "@/lib/seo";

/** Rendu entièrement statique : un slug inconnu renvoie un vrai code 404. */
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const guide = getGuide((await params).slug);
  if (!guide) return { title: "Guide introuvable" };
  return pageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    type: "article",
    publishedTime: guide.publishedAt,
    modifiedTime: guide.updatedAt ?? guide.publishedAt,
    noindex: guide.demo,
  });
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const guide = getGuide((await params).slug);
  if (!guide) notFound();

  const category = getCategory(guide.category);
  const destination = guide.destination ? getDestination(guide.destination) : undefined;
  const related = getRelatedGuides(guide, 3);
  const author = guide.author ?? siteConfig.editorialTeam;
  const modified = guide.updatedAt ?? guide.publishedAt;
  const url = `/guides/${guide.slug}`;

  const crumbs = [
    { name: "Guides", href: "/guides" },
    ...(category ? [{ name: category.name, href: `/guides/categorie/${category.slug}` }] : []),
    { name: guide.title, href: url },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    dateModified: modified,
    inLanguage: siteConfig.language,
    mainEntityOfPage: absoluteUrl(url),
    author: guide.author
      ? { "@type": "Person", name: guide.author }
      : { "@type": "Organization", name: `${author} — ${siteConfig.name}`, url: absoluteUrl("/a-propos") },
    publisher: { "@id": organizationId },
    image: guide.cover.src ? absoluteUrl(guide.cover.src) : absoluteUrl(`${url}/opengraph-image`),
    ...(category ? { articleSection: category.name } : {}),
  };

  return (
    <>
      <article>
        <Container className="pt-10 sm:pt-14">
          <Breadcrumbs items={crumbs} />
          <header className="mx-auto mt-8 max-w-3xl">
            <p className="flex flex-wrap gap-x-3 gap-y-1 text-sm font-semibold tracking-[0.16em] uppercase">
              {category && (
                <Link href={`/guides/categorie/${category.slug}`} className="text-terracotta hover:underline">
                  {category.name}
                </Link>
              )}
              {destination && (
                <Link href={`/destinations/${destination.slug}`} className="text-sea hover:underline">
                  {destination.name}
                </Link>
              )}
            </p>
            <h1 className="mt-4 font-display text-4xl leading-[1.1] font-semibold text-balance text-ink sm:text-5xl">
              {guide.title}
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-ink-soft">{guide.intro}</p>
            <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-soft">
              <span>
                Par <Link href="/a-propos" className="font-semibold text-ink hover:underline">{author}</Link>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                Publié le <time dateTime={guide.publishedAt}>{formatDate(guide.publishedAt)}</time>
              </span>
              {guide.updatedAt && guide.updatedAt !== guide.publishedAt && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>
                    Mis à jour le <time dateTime={guide.updatedAt}>{formatDate(guide.updatedAt)}</time>
                  </span>
                </>
              )}
              <span aria-hidden="true">·</span>
              <span>{getReadingTime(guide)} min de lecture</span>
            </p>
            <div className="mt-6 space-y-3">
              {guide.demo && <DemoNotice kind="guide" />}
              {hasActiveAffiliateLinks(guide) && <AffiliateDisclosure />}
            </div>
          </header>
        </Container>

        <Container className="mt-10">
          <figure className="mx-auto max-w-5xl">
            <CoverImage
              image={guide.cover}
              seed={guide.slug}
              palette={destination?.palette}
              sizes="(min-width: 1024px) 1024px, 100vw"
              preload
              className="aspect-[16/9] rounded-3xl"
            />
            {guide.cover.credit && (
              <figcaption className="mt-2 text-xs text-ink-soft">{guide.cover.credit}</figcaption>
            )}
          </figure>
        </Container>

        <Container className="mt-12">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
            <div className="min-w-0 max-w-[68ch]">
              {guide.sections.length >= 3 && (
                <div className="mb-10 lg:hidden">
                  <TableOfContents sections={guide.sections} />
                </div>
              )}
              <ArticleBody sections={guide.sections} slug={guide.slug} />

              <AdSlot slot="article-fin" />

              {guide.keyTips && guide.keyTips.length > 0 && (
                <aside aria-labelledby="essentiel-titre" className="mt-12 rounded-3xl bg-ink p-6 text-paper sm:p-8">
                  <h2 id="essentiel-titre" className="font-display text-2xl font-semibold text-sun">
                    L&apos;essentiel à retenir
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {guide.keyTips.map((tip) => (
                      <li key={tip} className="flex gap-3">
                        <span aria-hidden="true" className="text-sun">
                          ✦
                        </span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </aside>
              )}

              <p className="mt-10 border-t border-sand-deep pt-6 text-sm text-ink-soft">
                Une information vous semble inexacte ou dépassée ?{" "}
                <Link href="/contact" className="text-sea underline underline-offset-4">
                  Signalez-la-nous
                </Link>
                .
              </p>
            </div>

            {guide.sections.length >= 3 && (
              <div className="hidden lg:block">
                <div className="sticky top-24">
                  <TableOfContents sections={guide.sections} />
                </div>
              </div>
            )}
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="lies-titre" className="mt-20">
          <Container>
            <h2 id="lies-titre" className="font-display text-3xl font-semibold text-ink">
              À lire aussi
            </h2>
            <div className="mt-8">
              <GuideGrid guides={related} />
            </div>
          </Container>
        </section>
      )}

      <JsonLd data={jsonLd} />
    </>
  );
}
