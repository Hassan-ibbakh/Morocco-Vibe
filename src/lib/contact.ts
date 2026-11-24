/**
 * Validation du formulaire de contact (sans dépendance, testable).
 * Utilisée côté serveur : la validation navigateur n'est qu'un confort.
 */

export type ContactField = "name" | "email" | "subject" | "message";

export type ContactValues = Record<ContactField, string>;

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: Partial<Record<ContactField, string>>;
  values: ContactValues;
};

export const CONTACT_SUBJECTS = [
  "Question sur un guide",
  "Signaler une erreur",
  "Proposer un sujet",
  "Partenariat",
  "Autre",
] as const;

export const emptyContactState: ContactState = {
  status: "idle",
  message: "",
  errors: {},
  values: { name: "", email: "", subject: CONTACT_SUBJECTS[0], message: "" },
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITS = { name: 80, email: 254, message: 4000 };

/** Supprime les retours à la ligne (évite toute injection dans les en-têtes). */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export function readContactForm(data: FormData): { values: ContactValues; isBot: boolean } {
  const get = (k: string) => {
    const v = data.get(k);
    return typeof v === "string" ? v : "";
  };
  return {
    values: {
      name: oneLine(get("name")),
      email: oneLine(get("email")),
      subject: oneLine(get("subject")),
      message: get("message").trim(),
    },
    // Champ piège invisible : un humain ne le remplit jamais.
    isBot: get("website").trim() !== "",
  };
}

export function validateContact(values: ContactValues): ContactState["errors"] {
  const errors: ContactState["errors"] = {};
  if (values.name.length < 2) errors.name = "Indiquez votre nom (2 caractères minimum).";
  else if (values.name.length > LIMITS.name) errors.name = `${LIMITS.name} caractères maximum.`;

  if (!EMAIL.test(values.email) || values.email.length > LIMITS.email)
    errors.email = "Indiquez une adresse e-mail valide, par exemple nom@exemple.com.";

  if (!(CONTACT_SUBJECTS as readonly string[]).includes(values.subject))
    errors.subject = "Choisissez un sujet dans la liste.";

  if (values.message.length < 20) errors.message = "Votre message doit contenir au moins 20 caractères.";
  else if (values.message.length > LIMITS.message)
    errors.message = `Votre message ne doit pas dépasser ${LIMITS.message} caractères.`;

  return errors;
}
