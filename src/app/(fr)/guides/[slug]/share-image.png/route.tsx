import { getAllGuides, getCategory, getGuide } from "@/lib/content";
import { renderOgImage } from "@/lib/og";

/**
 * Visuel de partage d'un guide sans photo de couverture (1200×630), à une
 * adresse fixe : dans un groupe de routes, un fichier `opengraph-image`
 * recevrait un suffixe imprévisible.
 */
export function generateStaticParams() {
  return getAllGuides("fr").map((g) => ({ slug: g.slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const guide = getGuide((await params).slug, "fr");
  return renderOgImage({
    title: guide?.title ?? "Guide de voyage",
    eyebrow: guide ? getCategory(guide.category)?.name : undefined,
  });
}
