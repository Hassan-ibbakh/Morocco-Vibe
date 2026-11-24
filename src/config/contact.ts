import "server-only";

/**
 * Formulaire de contact — désactivé tant que ces variables (privées, côté
 * serveur uniquement) ne sont pas définies dans Vercel :
 *   RESEND_API_KEY      clé API Resend (https://resend.com, offre gratuite)
 *   CONTACT_TO_EMAIL    adresse qui reçoit les messages
 *   CONTACT_FROM_EMAIL  expéditeur sur un domaine vérifié chez Resend
 *                       (par défaut : l'adresse de test de Resend)
 * Sans configuration, la page Contact affiche l'adresse e-mail publique.
 */
export const contactFormConfig = {
  enabled: Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL),
  apiKey: process.env.RESEND_API_KEY ?? "",
  to: process.env.CONTACT_TO_EMAIL ?? "",
  from: process.env.CONTACT_FROM_EMAIL || "Formulaire de contact <onboarding@resend.dev>",
};
