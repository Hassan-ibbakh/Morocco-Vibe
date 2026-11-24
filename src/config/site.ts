/**
 * Configuration générale du site.
 *
 * Tout ce qui identifie le site (nom, slogan, contact…) est centralisé ici
 * pour être remplacé en un seul endroit. Les valeurs entre crochets sont des
 * exemples à personnaliser avant la mise en ligne.
 */

import { loadSettings } from "@/lib/content-source";

function resolveSiteUrl(): string {
  // 1. Domaine définitif, à définir dans Vercel (Settings → Environment Variables).
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");

  // 2. Domaine de production fourni automatiquement par Vercel.
  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProduction) return `https://${vercelProduction}`;

  // 3. Développement local.
  return "http://localhost:3000";
}

/** Réglages modifiables depuis le tableau de bord (content/settings.yaml). */
const settings = loadSettings();

export const siteConfig = {
  name: settings.name ?? "Morocco Vibe",
  /** Nom court (manifest, onglets). */
  shortName: settings.name ?? "Morocco Vibe",
  /** Slogan affiché sous le logo et dans les métadonnées. */
  tagline: settings.tagline ?? "Guides pratiques pour voyager au Maroc",
  /** Description par défaut (110 à 160 caractères). */
  description:
    settings.description ??
    "Guides pratiques, idées de visites et conseils fiables pour préparer votre voyage au Maroc : villes impériales, côte atlantique, montagnes et désert.",
  /** URL absolue, sans barre oblique finale. */
  url: resolveSiteUrl(),
  locale: "fr_FR",
  language: "fr",
  /** Adresse publique de contact. Vide = pas d'adresse affichée. */
  contactEmail: settings.contactEmail ?? process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  /** Nom de l'équipe éditoriale utilisé comme auteur par défaut. */
  editorialTeam: settings.editorialTeam ?? "La rédaction",
  /** Réseaux sociaux officiels. */
  social: settings.social,
  /** Textes de l'en-tête de la page d'accueil. */
  hero: {
    eyebrow: settings.heroEyebrow ?? "Carnets de voyage au Maroc",
    title: settings.heroTitle ?? "Préparez votre voyage au Maroc,",
    highlight: settings.heroHighlight ?? "ville après ville.",
    intro:
      settings.heroIntro ??
      "Des guides pratiques, des idées de visites et des conseils clairs pour organiser votre séjour : médinas, côte atlantique, montagnes et désert.",
  },
};

/**
 * Le site n'est indexable que sur le déploiement de production.
 * Les déploiements de prévisualisation Vercel (VERCEL_ENV=preview) sont
 * exclus des moteurs de recherche pour éviter le contenu dupliqué.
 */
export const isIndexable =
  process.env.VERCEL_ENV === undefined || process.env.VERCEL_ENV === "production";

/** Code de vérification Google Search Console (balise meta), optionnel. */
export const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION || undefined;

export const mainNav = [
  { href: "/destinations", label: "Destinations" },
  { href: "/guides", label: "Guides" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
] as const;

export const legalNav = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/confidentialite", label: "Confidentialité" },
  { href: "/cookies", label: "Cookies" },
  { href: "/transparence", label: "Publicité et affiliation" },
  { href: "/credits", label: "Crédits photos" },
  { href: "/plan-du-site", label: "Plan du site" },
] as const;
