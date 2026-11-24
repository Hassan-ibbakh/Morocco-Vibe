"use client";

import Link from "next/link";
import { useActionState } from "react";
import { sendContactMessage } from "@/actions/contact";
import { CONTACT_SUBJECTS, emptyContactState, type ContactField } from "@/lib/contact";

const input =
  "mt-2 block w-full rounded-xl border-2 border-sand-deep bg-white px-4 py-3 text-ink placeholder:text-ink-soft/70 focus:border-sea focus:outline-none aria-invalid:border-terracotta";

/** Formulaire de contact accessible : libellés, erreurs reliées aux champs, annonce du résultat. */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContactMessage, emptyContactState);

  const fieldProps = (name: ContactField) => ({
    id: `contact-${name}`,
    name,
    "aria-invalid": state.errors[name] ? true : undefined,
    "aria-describedby": state.errors[name] ? `contact-${name}-erreur` : undefined,
  });
  const error = (name: ContactField) =>
    state.errors[name] ? (
      <p id={`contact-${name}-erreur`} className="mt-1.5 text-sm font-medium text-terracotta-dark">
        {state.errors[name]}
      </p>
    ) : null;

  return (
    <form action={formAction} noValidate className="not-prose space-y-5 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="font-semibold text-ink">
            Nom
          </label>
          <input {...fieldProps("name")} type="text" autoComplete="name" required maxLength={80} defaultValue={state.values.name} className={input} />
          {error("name")}
        </div>
        <div>
          <label htmlFor="contact-email" className="font-semibold text-ink">
            E-mail
          </label>
          <input {...fieldProps("email")} type="email" autoComplete="email" required maxLength={254} defaultValue={state.values.email} className={input} />
          {error("email")}
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="font-semibold text-ink">
          Sujet
        </label>
        <select {...fieldProps("subject")} defaultValue={state.values.subject} className={input}>
          {CONTACT_SUBJECTS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        {error("subject")}
      </div>

      <div>
        <label htmlFor="contact-message" className="font-semibold text-ink">
          Message
        </label>
        <textarea {...fieldProps("message")} required minLength={20} maxLength={4000} rows={6} defaultValue={state.values.message} className={input} />
        {error("message")}
      </div>

      {/* Champ piège pour les robots, masqué aux humains et aux lecteurs d'écran. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Ne pas remplir</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="text-sm text-ink-soft">
        Vos données servent uniquement à vous répondre. Voir notre{" "}
        <Link href="/confidentialite" className="text-sea underline underline-offset-4">
          politique de confidentialité
        </Link>
        .
      </p>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="btn-shine inline-flex h-12 items-center rounded-full bg-terracotta px-7 font-semibold text-white transition hover:bg-terracotta-dark disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? "Envoi en cours…" : "Envoyer le message"}
        </button>
        <p
          role="status"
          aria-live="polite"
          className={`text-sm font-medium ${state.status === "success" ? "text-sea" : "text-terracotta-dark"}`}
        >
          {state.message}
        </p>
      </div>
    </form>
  );
}
