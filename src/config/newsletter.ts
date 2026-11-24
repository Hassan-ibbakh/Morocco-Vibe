import "server-only";

/**
 * Newsletter via Brevo (https://www.brevo.com), avec double confirmation :
 * l'abonné reçoit un e-mail et doit cliquer sur un lien avant d'être ajouté
 * à la liste. Le formulaire n'apparaît que si les trois variables sont définies.
 *
 * - BREVO_API_KEY : clé API (Brevo → SMTP & API → Clés API).
 * - BREVO_LIST_ID : numéro de la liste de contacts.
 * - BREVO_DOI_TEMPLATE_ID : numéro du modèle d'e-mail de confirmation (double opt-in).
 */
const listId = Number(process.env.BREVO_LIST_ID);
const templateId = Number(process.env.BREVO_DOI_TEMPLATE_ID);

export const newsletterConfig = {
  enabled: Boolean(process.env.BREVO_API_KEY && listId > 0 && templateId > 0),
  apiKey: process.env.BREVO_API_KEY ?? "",
  listId,
  templateId,
};
