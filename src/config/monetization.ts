/**
 * Monétisation — tout est désactivé par défaut.
 *
 * PUBLICITÉ
 * Les emplacements <AdSlot /> ne rendent rien tant que les deux variables
 * suivantes ne sont pas définies :
 *   NEXT_PUBLIC_ADS_ENABLED=true
 *   NEXT_PUBLIC_ADS_CLIENT_ID=<identifiant fourni par la régie>
 * Même activés, ils n'affichent qu'un conteneur réservé : aucun script
 * publicitaire n'est chargé par ce projet. Avant de brancher une régie, il
 * faut mettre en place une plateforme de gestion du consentement (CMP)
 * conforme au RGPD et aux règles de la régie (voir README).
 *
 * AFFILIATION
 * Déclarez ici les partenaires réellement signés. Un bloc « affiliate » dans
 * un article dont le partenaire n'est pas listé ici n'est pas affiché en
 * production. Dès qu'un lien affilié actif est présent dans un article, la
 * mention de transparence s'affiche automatiquement en tête d'article.
 */

export const adsConfig = {
  enabled:
    process.env.NEXT_PUBLIC_ADS_ENABLED === "true" &&
    Boolean(process.env.NEXT_PUBLIC_ADS_CLIENT_ID),
  clientId: process.env.NEXT_PUBLIC_ADS_CLIENT_ID ?? "",
} as const;

export type AffiliatePartner = {
  /** Nom affiché dans la mention de transparence. */
  name: string;
  /**
   * Construit l'URL de suivi à partir de l'URL de destination.
   * Exemple : (url) => `https://partenaire.example/?aid=123&url=${encodeURIComponent(url)}`
   */
  buildUrl: (targetUrl: string) => string;
};

/**
 * Partenaires affiliés actifs. Laisser vide tant qu'aucun contrat n'existe.
 * Exemple :
 *   hebergement: {
 *     name: "Partenaire Hébergement",
 *     buildUrl: (url) => `https://partenaire.example/?aid=VOTRE_ID&u=${encodeURIComponent(url)}`,
 *   },
 */
export const affiliatePartners: Record<string, AffiliatePartner> = {};
