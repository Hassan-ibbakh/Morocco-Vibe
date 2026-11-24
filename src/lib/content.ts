import { categories } from "@/content/categories";
import { destinations } from "@/content/destinations";
import { guides } from "@/content/guides";
import type { Block, Category, Destination, Guide } from "@/lib/types";
import { affiliatePartners } from "@/config/monetization";

export const GUIDES_PER_PAGE = 6;

/** Segments réservés sous /guides : aucun guide ne peut porter ces slugs. */
export const RESERVED_GUIDE_SLUGS = ["page", "categorie"];

const byDateDesc = (a: Guide, b: Guide) =>
  (b.updatedAt ?? b.publishedAt).localeCompare(a.updatedAt ?? a.publishedAt) ||
  a.slug.localeCompare(b.slug);

const sortedGuides = [...guides].sort(byDateDesc);

/* ---------- Guides ---------- */

export function getAllGuides(): Guide[] {
  return sortedGuides;
}

export function getGuide(slug: string): Guide | undefined {
  return sortedGuides.find((g) => g.slug === slug);
}

export function getFeaturedGuides(limit = 3): Guide[] {
  const featured = sortedGuides.filter((g) => g.featured);
  const rest = sortedGuides.filter((g) => !g.featured);
  return [...featured, ...rest].slice(0, limit);
}

export function getGuidesByCategory(slug: string): Guide[] {
  return sortedGuides.filter((g) => g.category === slug);
}

/** Une catégorie n'est indexée que si elle contient au moins un guide publié (non démo). */
export function isCategoryIndexable(slug: string): boolean {
  return getGuidesByCategory(slug).some((g) => !g.demo);
}

export function getGuidesByDestination(slug: string): Guide[] {
  return sortedGuides.filter((g) => g.destination === slug);
}

export function getTotalGuidePages(): number {
  return Math.max(1, Math.ceil(sortedGuides.length / GUIDES_PER_PAGE));
}

export function getGuidesPage(page: number): Guide[] {
  const start = (page - 1) * GUIDES_PER_PAGE;
  return sortedGuides.slice(start, start + GUIDES_PER_PAGE);
}

/**
 * Articles liés : même destination d'abord, puis même catégorie, puis les
 * plus récents. Le score reste simple et prévisible pour l'équipe éditoriale.
 */
export function getRelatedGuides(guide: Guide, limit = 3): Guide[] {
  return sortedGuides
    .filter((g) => g.slug !== guide.slug)
    .map((g) => ({
      g,
      score:
        (guide.destination && g.destination === guide.destination ? 2 : 0) +
        (g.category === guide.category ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ g }) => g);
}

/* ---------- Destinations & catégories ---------- */

export function getAllDestinations(): Destination[] {
  return destinations;
}

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

export function getFeaturedDestinations(limit = 3): Destination[] {
  const featured = destinations.filter((d) => d.featured);
  return (featured.length ? featured : destinations).slice(0, limit);
}

export function getAllCategories(): Category[] {
  return categories;
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

/* ---------- Texte ---------- */

function blockText(block: Block): string {
  switch (block.type) {
    case "p":
    case "h3":
    case "tip":
    case "warning":
      return block.text;
    case "list":
      return block.items.join(" ");
    case "image":
      return block.caption ?? "";
    case "affiliate":
      return block.label;
  }
}

/** Retire la mise en forme **gras** et [lien](url) pour obtenir du texte brut. */
export function stripInlineMarkup(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1");
}

export function getGuidePlainText(guide: Guide): string {
  return [
    guide.intro,
    ...guide.sections.flatMap((s) => [s.title, ...s.blocks.map(blockText)]),
    ...(guide.keyTips ?? []),
  ]
    .map(stripInlineMarkup)
    .join(" ");
}

export function getReadingTime(guide: Guide): number {
  const words = getGuidePlainText(guide).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Indique si l'article contient au moins un lien affilié réellement actif. */
export function hasActiveAffiliateLinks(guide: Guide): boolean {
  return guide.sections.some((s) =>
    s.blocks.some((b) => b.type === "affiliate" && b.partner in affiliatePartners),
  );
}

/* ---------- Recherche ---------- */

export type SearchEntry = {
  type: "guide" | "destination";
  href: string;
  title: string;
  excerpt: string;
  meta: string;
  text: string;
};

/** Index léger envoyé au composant de recherche (exécutée dans le navigateur). */
export function getSearchIndex(): SearchEntry[] {
  const destinationEntries: SearchEntry[] = destinations.map((d) => ({
    type: "destination",
    href: `/destinations/${d.slug}`,
    title: d.name,
    excerpt: d.summary,
    meta: `Destination · ${d.country}`,
    text: [d.name, d.country, d.region, d.summary, ...d.highlights].join(" "),
  }));
  const guideEntries: SearchEntry[] = sortedGuides.map((g) => ({
    type: "guide",
    href: `/guides/${g.slug}`,
    title: g.title,
    excerpt: g.description,
    meta: `Guide · ${getCategory(g.category)?.name ?? ""}`,
    text: [
      g.title,
      g.description,
      getDestination(g.destination ?? "")?.name ?? "",
      g.sections.map((s) => s.title).join(" "),
    ].join(" "),
  }));
  return [...destinationEntries, ...guideEntries];
}
