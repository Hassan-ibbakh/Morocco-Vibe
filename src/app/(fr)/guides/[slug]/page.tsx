import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/GuideArticle";
import { guidePath } from "@/i18n";
import { getAllGuides, getGuide, getTranslation } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

/** Rendu entièrement statique : un slug inconnu renvoie un vrai code 404. */
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return getAllGuides("fr").map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const guide = getGuide((await params).slug, "fr");
  if (!guide) return { title: "Guide introuvable" };
  const translation = getTranslation(guide);
  const path = guidePath(guide.slug, "fr");
  return pageMetadata({
    title: guide.title,
    description: guide.description,
    path,
    languages: translation && !translation.draft ? { fr: path, en: guidePath(translation.slug, "en") } : undefined,
    type: "article",
    publishedTime: guide.publishedAt,
    modifiedTime: guide.updatedAt ?? guide.publishedAt,
    noindex: guide.demo || guide.draft,
    // Photo de couverture si elle existe, sinon le visuel généré pour l'article.
    ogImagePath: guide.cover.src ?? `/guides/${guide.slug}/share-image.png`,
  });
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const guide = getGuide((await params).slug, "fr");
  if (!guide) notFound();
  return <GuideArticle guide={guide} />;
}
