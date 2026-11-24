import type { MetadataRoute } from "next";
import { legalNav } from "@/config/site";
import {
  getAllCategories,
  getAllDestinations,
  getAllGuides,
  getTotalGuidePages,
  isCategoryIndexable,
} from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

/**
 * Plan du site. Les contenus marqués `demo: true` sont volontairement exclus :
 * ils ne doivent pas être indexés avant d'avoir été réécrits et vérifiés.
 * La page de recherche (noindex) n'y figure pas non plus.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const guides = getAllGuides().filter((g) => !g.demo && !g.draft);
  const destinations = getAllDestinations().filter((d) => !d.demo);
  const latest = guides[0]?.updatedAt ?? guides[0]?.publishedAt;

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: latest, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/destinations"), changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/guides"), lastModified: latest, changeFrequency: "weekly", priority: 0.8 },
    { url: absoluteUrl("/a-propos"), changeFrequency: "yearly", priority: 0.4 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.3 },
    ...legalNav.map((l) => ({ url: absoluteUrl(l.href), changeFrequency: "yearly" as const, priority: 0.2 })),
  ];

  const pagination = Array.from({ length: getTotalGuidePages() - 1 }, (_, i) => ({
    url: absoluteUrl(`/guides/page/${i + 2}`),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  const categories = getAllCategories()
    .filter((c) => isCategoryIndexable(c.slug))
    .map((c) => ({
      url: absoluteUrl(`/guides/categorie/${c.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

  return [
    ...staticPages,
    ...pagination,
    ...categories,
    ...destinations.map((d) => ({
      url: absoluteUrl(`/destinations/${d.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      // Sitemap d'images : aide Google Images à découvrir les photos.
      ...(d.cover.src ? { images: [absoluteUrl(d.cover.src)] } : {}),
    })),
    ...guides.map((g) => ({
      url: absoluteUrl(`/guides/${g.slug}`),
      lastModified: g.updatedAt ?? g.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      ...(g.cover.src ? { images: [absoluteUrl(g.cover.src)] } : {}),
    })),
  ];
}
