"use server";

import { newsletterConfig } from "@/config/newsletter";
import { siteConfig } from "@/config/site";
import { isValidEmail, newsletterTexts, readNewsletterForm, type NewsletterState } from "@/lib/newsletter";

/**
 * Inscrit une adresse à la newsletter via l'API Brevo, avec double
 * confirmation. Le message de réussite est le même que l'adresse soit déjà
 * inscrite ou non : on ne révèle pas qui est abonné.
 */
export async function subscribeNewsletter(_prev: NewsletterState, formData: FormData): Promise<NewsletterState> {
  const { email, lang, isBot } = readNewsletterForm(formData);
  const t = newsletterTexts[lang];

  if (isBot) return { status: "success", message: t.success, email: "" };
  if (!isValidEmail(email)) return { status: "error", message: t.invalid, email };
  if (!newsletterConfig.enabled) return { status: "error", message: t.disabled, email };

  try {
    const res = await fetch("https://api.brevo.com/v3/contacts/doubleOptinConfirmation", {
      method: "POST",
      headers: {
        "api-key": newsletterConfig.apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        includeListIds: [newsletterConfig.listId],
        templateId: newsletterConfig.templateId,
        redirectionUrl: `${siteConfig.url}${lang === "en" ? "/en/newsletter/thanks" : "/newsletter/merci"}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      const body = (await res.json().catch(() => ({}))) as { code?: string };
      // Adresse déjà connue de Brevo : même réponse qu'une nouvelle inscription.
      if (body.code !== "duplicate_parameter") throw new Error(`Brevo a répondu ${res.status} (${body.code ?? "?"})`);
    }
  } catch (error) {
    console.error("Échec de l'inscription à la newsletter :", error);
    return { status: "error", message: t.failed, email };
  }

  return { status: "success", message: t.success, email: "" };
}
