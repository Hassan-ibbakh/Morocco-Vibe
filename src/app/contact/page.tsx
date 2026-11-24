import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { TextPage } from "@/components/TextPage";
import { contactFormConfig } from "@/config/contact";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Contactez l'équipe de ${siteConfig.name} pour signaler une erreur dans un guide, suggérer un sujet sur le Maroc ou proposer un partenariat.`,
  path: "/contact",
});

export default function ContactPage() {
  const email = siteConfig.contactEmail;
  return (
    <TextPage
      title="Contact"
      path="/contact"
      intro="Une question, une correction, une idée de guide ? Nous lisons tous les messages."
    >
      {contactFormConfig.enabled && <ContactForm />}

      {email ? (
        <div className="not-prose rounded-3xl bg-sand p-6 sm:p-8">
          <p className="text-sm font-semibold tracking-widest text-terracotta-dark uppercase">
            {contactFormConfig.enabled ? "Ou par e-mail" : "Par e-mail"}
          </p>
          <p className="mt-2">
            <a
              href={`mailto:${email}`}
              className="font-display text-2xl font-semibold break-all text-sea underline underline-offset-4 hover:text-terracotta"
            >
              {email}
            </a>
          </p>
        </div>
      ) : (
        !contactFormConfig.enabled && (
          <p role="note" className="rounded-xl border border-dashed border-sand-deep p-5 text-ink-soft">
            Aucun moyen de contact n&apos;est encore configuré. Définissez
            <code className="mx-1 rounded bg-sand px-1.5 py-0.5 text-sm">NEXT_PUBLIC_CONTACT_EMAIL</code>
            et/ou les variables du formulaire (voir README).
          </p>
        )
      )}

      <h2>Pour une réponse rapide</h2>
      <ul>
        <li>
          <strong>Signaler une erreur :</strong> indiquez l&apos;adresse de la page concernée et, si possible,
          la source officielle de l&apos;information correcte.
        </li>
        <li>
          <strong>Partenariats :</strong> présentez votre structure et votre proposition. Tout contenu
          sponsorisé est signalé comme tel, voir notre{" "}
          <Link href="/transparence">politique de transparence</Link>.
        </li>
      </ul>
      <p>
        Nous ne pouvons pas organiser de voyage ni effectuer de réservation pour vous. Les données que vous
        nous transmettez sont traitées comme décrit dans notre{" "}
        <Link href="/confidentialite">politique de confidentialité</Link>.
      </p>
    </TextPage>
  );
}
