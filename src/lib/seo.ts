import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export function absoluteUrl(path = "/"): string {
  return new URL(path, `${siteConfig.url}/`).toString();
}

type PageMetaInput = {
  /** Langue de la page (français par défaut). */
  lang?: "fr" | "en";
  /**
   * Versions de la page dans chaque langue, pour les balises hreflang.
   * Ex. { fr: "/guides/x", en: "/en/guides/y" }. La version française sert
   * aussi de version par défaut (x-default).
   */
  languages?: Partial<Record<"fr" | "en", string>>;
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
  /**
   * Chemin de l'image de partage propre à la page (ex. généré par un fichier
   * route `share-image.png`). Par défaut : l'image du site.
   */
  ogImagePath?: string;
};

/** Longueur au-delà de laquelle Google tronque généralement un titre. */
export const MAX_TITLE_LENGTH = 60;
const TITLE_SUFFIX = ` | ${siteConfig.name}`;

/**
 * Titre affiché dans Google : le suffixe « | Nom du site » n'est ajouté que
 * s'il tient dans la limite, pour éviter la troncature du titre utile.
 */
export function seoTitle(title: string, absolute = false): string {
  if (absolute || title.length + TITLE_SUFFIX.length > MAX_TITLE_LENGTH) return title;
  return `${title}${TITLE_SUFFIX}`;
}

export const MAX_DESCRIPTION_LENGTH = 160;

/**
 * Complète une description trop courte avec la première phrase d'appoint qui
 * tient dans la limite (≈ 160 caractères affichés par Google).
 */
export function fitDescription(base: string, complements: string[]): string {
  const text = base.trim();
  if (text.length >= 110) return text;
  for (const c of complements) {
    const candidate = `${text} ${c}`;
    if (candidate.length <= MAX_DESCRIPTION_LENGTH) return candidate;
  }
  return text;
}

/** Image de partage par défaut (générée par src/app/share-image.png/route.tsx). */
const defaultOgImage = {
  url: "/share-image.png",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — ${siteConfig.tagline}`,
};

/**
 * Métadonnées d'une page : titre, description, URL canonique et Open Graph.
 * Une page déclarant son propre `openGraph` remplace celui du layout, image
 * comprise, et l'emporte aussi sur un fichier `opengraph-image` voisin :
 * l'image est donc toujours déclarée ici (`ogImagePath` pour une image dédiée).
 */
export function pageMetadata({
  lang = "fr",
  languages,
  title,
  description,
  path,
  noindex,
  type = "website",
  publishedTime,
  modifiedTime,
  absoluteTitle,
  ogImagePath,
}: PageMetaInput): Metadata {
  // Les dimensions ne sont déclarées que pour les visuels générés (1200×630).
  const image = !ogImagePath
    ? defaultOgImage
    : ogImagePath.endsWith("/share-image.png")
      ? { ...defaultOgImage, url: ogImagePath, alt: title }
      : { url: ogImagePath, alt: title };
  return {
    title: { absolute: seoTitle(title, absoluteTitle) },
    description,
    // `alternates` d'une page remplace celui du layout : le flux RSS est redéclaré ici.
    alternates: {
      canonical: path,
      ...(languages && Object.keys(languages).length > 1
        ? { languages: { ...languages, "x-default": languages.fr ?? path } }
        : {}),
      // Le flux RSS ne contient que les guides en français.
      ...(lang === "fr"
        ? { types: { "application/rss+xml": [{ url: "/rss.xml", title: `${siteConfig.name} — guides` }] } }
        : {}),
    },
    openGraph: {
      type,
      title,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: lang === "en" ? "en_GB" : siteConfig.locale,
      ...(languages && Object.keys(languages).length > 1
        ? { alternateLocale: lang === "en" ? [siteConfig.locale] : ["en_GB"] }
        : {}),
      images: [image],
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
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
    logo: absoluteUrl("/logo.png"),
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

/** Éditeur inclus directement dans chaque Article (pas de référence à un autre bloc). */
export function publisherJsonLd() {
  return {
    "@type": "Organization",
    "@id": organizationId,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: { "@type": "ImageObject", url: absoluteUrl("/logo.png"), width: 512, height: 512 },
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
