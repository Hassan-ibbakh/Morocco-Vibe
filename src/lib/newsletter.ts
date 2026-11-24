/**
 * Inscription à la newsletter : lecture et validation du formulaire
 * (sans dépendance, testable). L'envoi à Brevo se fait dans l'action serveur.
 */
import type { Lang } from "@/i18n";

export type NewsletterState = {
  status: "idle" | "success" | "error";
  message: string;
  email: string;
};

export const emptyNewsletterState: NewsletterState = { status: "idle", message: "", email: "" };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(email: string): boolean {
  return email.length <= 254 && EMAIL.test(email);
}

export function readNewsletterForm(data: FormData): { email: string; lang: Lang; isBot: boolean } {
  const get = (key: string) => {
    const value = data.get(key);
    return typeof value === "string" ? value.trim() : "";
  };
  return {
    email: get("email").toLowerCase(),
    lang: get("lang") === "en" ? "en" : "fr",
    // Champ piège invisible pour les humains : rempli = robot.
    isBot: get("website") !== "",
  };
}

export const newsletterTexts = {
  fr: {
    title: "Recevez nos nouveaux guides",
    intro: "Un e-mail de temps en temps avec nos derniers articles sur le Maroc. Pas de publicité, désinscription en un clic.",
    label: "Votre adresse e-mail",
    placeholder: "vous@exemple.com",
    submit: "S'inscrire",
    pending: "Inscription…",
    consent: "En vous inscrivant, vous acceptez de recevoir notre newsletter. Vos données sont traitées comme indiqué dans notre",
    privacy: "politique de confidentialité",
    privacyPath: "/confidentialite",
    success: "Merci ! Vérifiez votre boîte de réception : un e-mail vous demande de confirmer votre inscription.",
    invalid: "Indiquez une adresse e-mail valide.",
    failed: "L'inscription n'a pas pu aboutir. Réessayez dans quelques minutes.",
    disabled: "Les inscriptions ne sont pas encore ouvertes.",
  },
  en: {
    title: "Get our new guides by email",
    intro: "An occasional email with our latest articles about Morocco. No advertising, unsubscribe in one click.",
    label: "Your email address",
    placeholder: "you@example.com",
    submit: "Subscribe",
    pending: "Subscribing…",
    consent: "By subscribing, you agree to receive our newsletter. Your data is handled as described in our",
    privacy: "privacy policy",
    privacyPath: "/en/privacy",
    success: "Thank you! Check your inbox: an email asks you to confirm your subscription.",
    invalid: "Please enter a valid email address.",
    failed: "Your subscription could not be completed. Please try again in a few minutes.",
    disabled: "Subscriptions are not open yet.",
  },
} as const;
