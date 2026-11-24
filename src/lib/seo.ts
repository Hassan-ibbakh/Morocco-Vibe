import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export function absoluteUrl(path = "/"): string {
  return new URL(path, `${siteConfig.url}/`).toString();
}

type PageMetaInput = {
  title: string;
  description: string;
  /** Chemin canonique, ex. "/guides". */
  path: string;
  /** Contenu à ne pas indexer (démo, recherche…). */
  noindex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  /** Titre complet, sans le suffixe « | Nom du site ». */
  absoluteTitle?: boolean;
};

/**
 * Métadonnées d'une page : titre, description, URL canonique et Open Graph.
 * L'image Open Graph provient des fichiers `opengraph-image` du dossier app.
 */
export function pageMetadata({
  title,
  description,
  path,
  noindex,
  type = "website",
  publishedTime,
  modifiedTime,
  absoluteTitle,
}: PageMetaInput): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/* ---------- Données structurées Schema.org ---------- */

export const organizationId = `${siteConfig.url}/#organization`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/logo.svg"),
    ...(siteConfig.contactEmail ? { email: siteConfig.contactEmail } : {}),
    ...(siteConfig.social.length ? { sameAs: siteConfig.social.map((s) => s.href) } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: siteConfig.language,
    publisher: { "@id": organizationId },
  };
}

export type Crumb = { name: string; href: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.href),
    })),
  };
}
