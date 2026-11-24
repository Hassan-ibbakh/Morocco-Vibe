/**
 * Modèle de contenu. Le texte des paragraphes accepte une mise en forme
 * minimale : **gras** et [lien](/chemin-ou-url).
 */

export type ImageRef = {
  /**
   * Chemin d'une image placée dans /public (ex. "/images/lisbonne/tram.jpg").
   * Laisser vide pour afficher une illustration de remplacement.
   */
  src?: string;
  /** Texte alternatif décrivant l'image réelle (obligatoire). */
  alt: string;
  /** Crédit ou licence, affiché sous l'image (ex. "Photo : Nom — CC BY 4.0"). */
  credit?: string;
  width?: number;
  height?: number;
};

export type Block =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "tip"; title?: string; text: string }
  | { type: "warning"; title?: string; text: string }
  | { type: "image"; image: ImageRef; caption?: string }
  | {
      type: "affiliate";
      /** Clé d'un partenaire déclaré dans src/config/monetization.ts */
      partner: string;
      /** URL de la page de destination chez le partenaire. */
      url: string;
      label: string;
      description?: string;
    };

export type Section = {
  /** Ancre HTML stable (minuscules, tirets, sans accents). */
  id: string;
  title: string;
  blocks: Block[];
};

export type Category = {
  slug: string;
  name: string;
  description: string;
  /** Meta description dédiée (110–160 caractères). Sinon : description complétée. */
  seoDescription?: string;
};

export type Destination = {
  slug: string;
  name: string;
  country: string;
  region: string;
  /** Résumé court pour les cartes (et base de la meta description). */
  summary: string;
  /** Meta description dédiée (110–160 caractères). Sinon : résumé complété. */
  seoDescription?: string;
  /** Paragraphes d'introduction de la page destination. */
  intro: string[];
  /** Points d'intérêt pour la mise en avant (sans chiffres ni horaires). */
  highlights: string[];
  /** Conseils pratiques génériques. */
  practical: { label: string; text: string }[];
  cover: ImageRef;
  /** Couleurs de l'illustration de remplacement. */
  palette?: [string, string, string];
  featured?: boolean;
  /** Contenu d'exemple : bandeau visible, noindex, exclu du sitemap. */
  demo?: boolean;
};

export type Guide = {
  slug: string;
  title: string;
  /** Meta description (≈ 150 caractères). */
  description: string;
  /** Chapeau affiché en tête d'article. */
  intro: string;
  category: string;
  destination?: string;
  /** Format AAAA-MM-JJ */
  publishedAt: string;
  updatedAt?: string;
  /** Laisser vide pour signer « La rédaction ». */
  author?: string;
  cover: ImageRef;
  sections: Section[];
  /** Encadré « L'essentiel » en fin d'article. */
  keyTips?: string[];
  featured?: boolean;
  demo?: boolean;
  /**
   * Brouillon : visible en développement (`npm run dev`) et sur les
   * prévisualisations Vercel, mais absent du site de production.
   */
  draft?: boolean;
};
