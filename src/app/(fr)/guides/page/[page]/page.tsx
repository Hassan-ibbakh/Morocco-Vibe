import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { GuidesListing } from "@/components/GuidesListing";
import { getGuidesPage, getTotalGuidePages } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

/** Rendu entièrement statique : une page inconnue renvoie un vrai code 404. */
export const ensureStatic = "navigation";

/** Pages 2 à N (la page 1 est /guides). */
export function generateStaticParams() {
  const total = getTotalGuidePages();
  const pages = Array.from({ length: total - 1 }, (_, i) => ({ page: String(i + 2) }));
  // Cache Components exige au moins un paramètre : s'il n'y a qu'une page,
  // « 2 » est généré et renvoie une 404.
  return pages.length ? pages : [{ page: "2" }];
}

function parsePage(raw: string): number | null {
  if (!/^\d+$/.test(raw)) return null;
  return Number(raw);
}

export async function generateMetadata({ params }: PageProps<"/guides/page/[page]">): Promise<Metadata> {
  const page = parsePage((await params).page);
  if (!page || page < 2 || page > getTotalGuidePages()) return { title: "Page introuvable" };
  return pageMetadata({
    title: `Guides de voyage au Maroc — page ${page}`,
    description: `Page ${page} de nos guides pour voyager au Maroc : checklist avant le départ, itinéraires, idées de visites, budget et conseils pratiques sur place.`,
    path: `/guides/page/${page}`,
  });
}

export default async function GuidesPaginatedPage({ params }: PageProps<"/guides/page/[page]">) {
  const page = parsePage((await params).page);
  if (page === 1) permanentRedirect("/guides");
  if (!page || page < 2 || page > getTotalGuidePages()) notFound();
  return <GuidesListing guides={getGuidesPage(page)} page={page} totalPages={getTotalGuidePages()} />;
}
