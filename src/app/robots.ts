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
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
