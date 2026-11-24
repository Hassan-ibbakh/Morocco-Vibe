import Link from "next/link";
import { AdSlot } from "@/components/AdSlot";
import { AffiliateDisclosure } from "@/components/Affiliate";
import { ArticleBody, TableOfContents } from "@/components/ArticleBody";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CoverImage } from "@/components/CoverImage";
import { DemoNotice, DraftNotice } from "@/components/DemoNotice";
import { FaqSection } from "@/components/FaqSection";
import { GuideGrid } from "@/components/GuideCard";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/PageHeader";
import { PhotoCredit } from "@/components/PhotoCredit";
import { ShareButtons } from "@/components/ShareButtons";
import { siteConfig } from "@/config/site";
import { formatDateIn, getDictionary, guidePath } from "@/i18n";
import {
  getCategory,
  getDestination,
  getReadingTime,
  getRelatedGuides,
  getTranslation,
  hasActiveAffiliateLinks,
  stripInlineMarkup,
} from "@/lib/content";
import { absoluteUrl, publisherJsonLd } from "@/lib/seo";
import type { Guide } from "@/lib/types";

/**
 * Page d'un article, commune au français (/guides/…) et à l'anglais
 * (/en/guides/…) : en-tête, couverture, sommaire, texte, l'essentiel,
 * questions fréquentes, partage et articles liés, avec leurs données
 * structurées (Article, FAQPage, BreadcrumbList).
 */
export function GuideArticle({ guide }: { guide: Guide }) {
  const lang = guide.lang;
  const t = getDictionary(lang);
  const en = lang === "en";

  const category = getCategory(guide.category);
  const categoryName = en ? (category?.nameEn ?? category?.name) : category?.name;
  const destination = guide.destination ? getDestination(guide.destination) : undefined;
  const destinationName = en ? (destination?.nameEn ?? destination?.name) : destination?.name;
  const related = getRelatedGuides(guide, 3);
  const translation = getTranslation(guide);
  const author = guide.author ?? (en ? "The editorial team" : siteConfig.editorialTeam);
  const modified = guide.updatedAt ?? guide.publishedAt;
  const url = guidePath(guide.slug, lang);
  // En anglais, les catégories n'ont pas de page dédiée : on renvoie vers la section de la liste.
  const categoryHref = category && (en ? `/en/guides#${category.slug}` : `/guides/categorie/${category.slug}`);

  const crumbs = [
    { name: t.guides, href: t.guidesPath },
    ...(category && categoryName ? [{ name: categoryName, href: categoryHref! }] : []),
    { name: guide.title, href: url },
  ];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    dateModified: modified,
    inLanguage: t.htmlLang,
    mainEntityOfPage: absoluteUrl(url),
    // Google attend uniquement le nom dans `author.name` (sans fonction ni mention).
    author: guide.author
      ? { "@type": "Person", name: guide.author, url: absoluteUrl(t.aboutPath) }
      : { "@type": "Organization", name: siteConfig.name, url: absoluteUrl(t.aboutPath) },
    publisher: publisherJsonLd(),
    image: absoluteUrl(guide.cover.src ?? (en ? "/en/share-image.png" : `/guides/${guide.slug}/share-image.png`)),
    ...(categoryName ? { articleSection: categoryName } : {}),
  };

  const faqJsonLd =
    guide.faq && guide.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage: t.htmlLang,
          mainEntity: guide.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: stripInlineMarkup(item.answer) },
          })),
        }
      : undefined;

  return (
    <>
      {/* Barre de progression de lecture (CSS seul, décorative). */}
      <div aria-hidden="true" className="reading-progress fixed inset-x-0 top-0 z-50 h-1 bg-terracotta" />
      <article>
        <Container className="pt-10 sm:pt-14">
          <Breadcrumbs items={crumbs} lang={lang} />
          <header className="mx-auto mt-8 max-w-3xl">
            <p className="flex flex-wrap gap-x-3 gap-y-1 text-sm font-semibold tracking-[0.16em] uppercase">
              {categoryHref && categoryName && (
                <Link href={categoryHref} className="text-terracotta hover:underline">
                  {categoryName}
                </Link>
              )}
              {destination &&
                (en ? (
                  <span className="text-sea">{destinationName}</span>
                ) : (
                  <Link href={`/destinations/${destination.slug}`} className="text-sea hover:underline">
                    {destinationName}
                  </Link>
                ))}
            </p>
            <h1 className="title-3d mt-4 font-display text-4xl leading-[1.1] font-semibold text-balance text-ink sm:text-5xl">
              {guide.title}
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-ink-soft">{guide.intro}</p>
            <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-soft">
              <span>
                {t.by}{" "}
                <Link href={t.aboutPath} className="font-semibold text-ink hover:underline">
                  {author}
                </Link>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                {t.published} <time dateTime={guide.publishedAt}>{formatDateIn(guide.publishedAt, lang)}</time>
              </span>
              {guide.updatedAt && guide.updatedAt !== guide.publishedAt && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>
                    {t.updated} <time dateTime={guide.updatedAt}>{formatDateIn(guide.updatedAt, lang)}</time>
                  </span>
                </>
              )}
              <span aria-hidden="true">·</span>
              <span>{t.readingTime(getReadingTime(guide))}</span>
            </p>
            {translation && (
              <p className="mt-4">
                <Link
                  href={guidePath(translation.slug, translation.lang)}
                  hrefLang={t.otherLanguage.lang}
                  lang={t.otherLanguage.lang}
                  className="inline-flex items-center gap-2 rounded-full border border-sand-deep bg-white px-4 py-1.5 text-sm font-medium text-sea hover:border-sea"
                >
                  <span aria-hidden="true" className="font-semibold">
                    {t.otherLanguage.short}
                  </span>
                  {t.otherLanguage.readIn}
                </Link>
              </p>
            )}
            <div className="mt-6 space-y-3">
              {guide.draft && <DraftNotice />}
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
              className="aspect-video rounded-3xl"
              transitionName={`guide-cover-${lang}-${guide.slug}`}
            />
            <figcaption className="mt-2">
              <PhotoCredit image={guide.cover} lang={lang} />
            </figcaption>
          </figure>
        </Container>

        <Container className="mt-12">
          <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
            {/* Un seul sommaire : avant le texte sur mobile, colonne collante sur ordinateur. */}
            {guide.sections.filter((s) => s.title).length >= 3 && (
              <div className="lg:col-start-2 lg:row-start-1">
                <div className="lg:sticky lg:top-24">
                  <TableOfContents sections={guide.sections} lang={lang} />
                </div>
              </div>
            )}
            <div className="min-w-0 max-w-[68ch] lg:col-start-1 lg:row-start-1">
              <ArticleBody sections={guide.sections} slug={guide.slug} lang={lang} />

              {!en && <AdSlot slot="article-fin" />}

              {guide.keyTips && guide.keyTips.length > 0 && (
                <aside aria-labelledby="essentiel-titre" className="mt-12 rounded-3xl bg-ink p-6 text-paper sm:p-8">
                  <h2 id="essentiel-titre" className="font-display text-2xl font-semibold text-sun">
                    {t.keyTakeaways}
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

              {guide.faq && guide.faq.length > 0 && <FaqSection items={guide.faq} lang={lang} />}

              <ShareButtons
                url={absoluteUrl(url)}
                title={guide.title}
                labels={{
                  title: t.share,
                  native: t.shareNative,
                  copy: t.copyLink,
                  copied: t.copied,
                  copyFailed: t.copyFailed,
                  email: t.email,
                  newTab: t.newTab,
                }}
              />

              <p className="mt-10 border-t border-sand-deep pt-6 text-sm text-ink-soft">
                {t.reportError}{" "}
                <Link href={t.contactPath} className="text-sea underline underline-offset-4">
                  {t.reportErrorLink}
                </Link>
                .
              </p>
            </div>
          </div>
        </Container>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="lies-titre" className="mt-20">
          <Container>
            <h2 id="lies-titre" className="font-display text-3xl font-semibold text-ink">
              {t.readNext}
            </h2>
            <div className="mt-8">
              <GuideGrid guides={related} />
            </div>
          </Container>
        </section>
      )}

      <JsonLd data={faqJsonLd ? [articleJsonLd, faqJsonLd] : articleJsonLd} />
    </>
  );
}
