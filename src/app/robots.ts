import type { MetadataRoute } from "next";
import { isIndexable } from "@/config/site";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  // Déploiements de prévisualisation : exploration interdite.
  if (!isIndexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  // /recherche reste explorable : sa balise noindex doit pouvoir être lue.
  return {
    // Le tableau de bord et son API n'ont rien à faire dans les moteurs de recherche.
    rules: { userAgent: "*", allow: "/", disallow: ["/keystatic", "/api/"] },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
