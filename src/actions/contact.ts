"use server";

import { contactFormConfig } from "@/config/contact";
import { siteConfig } from "@/config/site";
import { readContactForm, validateContact, type ContactState } from "@/lib/contact";

/**
 * Envoie le message du formulaire de contact par e-mail via l'API REST de
 * Resend (offre gratuite suffisante pour un site éditorial). Le message n'est
 * jamais stocké par le site : il est seulement transmis par e-mail.
 */
export async function sendContactMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const { values, isBot } = readContactForm(formData);

  // Robot détecté : on simule un succès sans rien envoyer.
  if (isBot) {
    return { status: "success", message: "Merci, votre message a bien été envoyé.", errors: {}, values };
  }

  const errors = validateContact(values);
  if (Object.keys(errors).length) {
    return { status: "error", message: "Corrigez les champs signalés, puis réessayez.", errors, values };
  }

  if (!contactFormConfig.enabled) {
    return {
      status: "error",
      message: "L'envoi de messages n'est pas encore activé. Écrivez-nous directement par e-mail.",
      errors: {},
      values,
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${contactFormConfig.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: contactFormConfig.from,
        to: [contactFormConfig.to],
        reply_to: values.email,
        subject: `[${siteConfig.name}] ${values.subject} — ${values.name}`,
        text: `De : ${values.name} <${values.email}>\nSujet : ${values.subject}\n\n${values.message}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Resend a répondu ${res.status}`);
  } catch (error) {
    console.error("Échec de l'envoi du formulaire de contact :", error);
    return {
      status: "error",
      message: "Le message n'a pas pu être envoyé. Réessayez plus tard ou écrivez-nous par e-mail.",
      errors: {},
      values,
    };
  }

  return {
    status: "success",
    message: "Merci, votre message a bien été envoyé. Nous vous répondrons dès que possible.",
    errors: {},
    values: { name: "", email: "", subject: values.subject, message: "" },
  };
}
