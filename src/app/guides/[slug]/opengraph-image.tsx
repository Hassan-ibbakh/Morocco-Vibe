import { getAllGuides, getCategory, getGuide } from "@/lib/content";
import { ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Illustration de partage du guide";

export function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export default async function GuideOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getGuide((await params).slug);
  return renderOgImage({
    title: guide?.title ?? "Guide de voyage",
    eyebrow: guide ? getCategory(guide.category)?.name : undefined,
  });
}
