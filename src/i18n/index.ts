/**
 * Langues du site et textes de l'interface.
 *
 * Le français est la langue principale (adresses sans préfixe), l'anglais est
 * servi sous /en. Les textes éditoriaux (articles, réglages) viennent du
 * dossier content/ ; seuls les libellés de l'interface sont ici.
 */
export type Lang = "fr" | "en";

export const LANGS: Lang[] = ["fr", "en"];

const dateFormatters: Record<Lang, Intl.DateTimeFormat> = {
  fr: new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
  en: new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }),
};

/** "2026-11-10" → "10 novembre 2026" / "10 November 2026" (date fixe, en UTC). */
export function formatDateIn(isoDate: string, lang: Lang): string {
  return dateFormatters[lang].format(new Date(`${isoDate}T00:00:00Z`));
}

const fr = {
  htmlLang: "fr",
  ogLocale: "fr_FR",
  home: "Accueil",
  homePath: "/",
  guidesPath: "/guides",
  guides: "Guides",
  breadcrumb: "Fil d'Ariane",
  by: "Par",
  published: "Publié le",
  updated: "Mis à jour le",
  readingTime: (minutes: number) => `${minutes} min de lecture`,
  contents: "Sommaire",
  keyTakeaways: "L'essentiel à retenir",
  faq: "Questions fréquentes",
  share: "Partager ce guide",
  shareNative: "Partager…",
  copyLink: "Copier le lien",
  copied: "Lien copié dans le presse-papiers.",
  copyFailed: "Copie impossible : sélectionnez l'adresse dans la barre du navigateur.",
  email: "E-mail",
  newTab: " (nouvel onglet)",
  readNext: "À lire aussi",
  reportError: "Une information vous semble inexacte ou dépassée ?",
  reportErrorLink: "Signalez-la-nous",
  contactPath: "/contact",
  aboutPath: "/a-propos",
  tip: "Conseil",
  warning: "À savoir",
  photo: "Photo :",
  via: "via",
  otherLanguage: { lang: "en" as Lang, label: "English", short: "EN", readIn: "Read this guide in English" },
  switchTo: "English version",
  nav: {
    label: "Navigation principale",
    openSubmenu: "Ouvrir le sous-menu",
    closeSubmenu: "Fermer le sous-menu",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    search: "Rechercher",
    logo: "accueil",
  },
};

export type Dictionary = typeof fr;

const en: Dictionary = {
  htmlLang: "en",
  ogLocale: "en_GB",
  home: "Home",
  homePath: "/en",
  guidesPath: "/en/guides",
  guides: "Guides",
  breadcrumb: "Breadcrumb",
  by: "By",
  published: "Published",
  updated: "Updated",
  readingTime: (minutes: number) => `${minutes} min read`,
  contents: "Contents",
  keyTakeaways: "Key takeaways",
  faq: "Frequently asked questions",
  share: "Share this guide",
  shareNative: "Share…",
  copyLink: "Copy link",
  copied: "Link copied to the clipboard.",
  copyFailed: "Copy failed: select the address in your browser's address bar.",
  email: "Email",
  newTab: " (opens in a new tab)",
  readNext: "Read next",
  reportError: "Is any information inaccurate or out of date?",
  reportErrorLink: "Let us know",
  contactPath: "/en/contact",
  aboutPath: "/en/about",
  tip: "Tip",
  warning: "Good to know",
  photo: "Photo:",
  via: "via",
  otherLanguage: { lang: "fr", label: "Français", short: "FR", readIn: "Lire ce guide en français" },
  switchTo: "Version française",
  nav: {
    label: "Main navigation",
    openSubmenu: "Open the submenu",
    closeSubmenu: "Close the submenu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    search: "Search",
    logo: "home",
  },
};

const dictionaries: Record<Lang, Dictionary> = { fr, en };

export function getDictionary(lang: Lang): Dictionary {
  return dictionaries[lang];
}

/** Adresse d'un guide selon sa langue. */
export const guidePath = (slug: string, lang: Lang) => (lang === "en" ? `/en/guides/${slug}` : `/guides/${slug}`);
