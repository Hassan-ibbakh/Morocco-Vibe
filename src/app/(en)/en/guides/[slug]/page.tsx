import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideArticle } from "@/components/GuideArticle";
import { guidePath } from "@/i18n";
import { getAllGuides, getGuide, getTranslation } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

/** Rendu entièrement statique : un slug inconnu renvoie un vrai code 404. */
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return getAllGuides("en").map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/en/guides/[slug]">): Promise<Metadata> {
  const guide = getGuide((await params).slug, "en");
  if (!guide) return { title: "Guide not found" };
  const translation = getTranslation(guide);
  const path = guidePath(guide.slug, "en");
  return pageMetadata({
    lang: "en",
    title: guide.title,
    description: guide.description,
    path,
    languages: translation && !translation.draft ? { fr: guidePath(translation.slug, "fr"), en: path } : undefined,
    type: "article",
    publishedTime: guide.publishedAt,
    modifiedTime: guide.updatedAt ?? guide.publishedAt,
    noindex: guide.demo || guide.draft,
    ogImagePath: guide.cover.src ?? "/en/share-image.png",
  });
}

export default async function EnglishGuidePage({ params }: PageProps<"/en/guides/[slug]">) {
  const guide = getGuide((await params).slug, "en");
  if (!guide) notFound();
  return <GuideArticle guide={guide} />;
}
