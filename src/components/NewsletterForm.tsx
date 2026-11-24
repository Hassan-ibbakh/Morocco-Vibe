"use client";

import Link from "next/link";
import { useActionState, useId } from "react";
import { subscribeNewsletter } from "@/actions/newsletter";
import type { Lang } from "@/i18n";
import { emptyNewsletterState, newsletterTexts } from "@/lib/newsletter";

/** Formulaire d'inscription à la newsletter (une adresse e-mail, double confirmation). */
export function NewsletterForm({ lang = "fr" }: { lang?: Lang }) {
  const [state, formAction, pending] = useActionState(subscribeNewsletter, emptyNewsletterState);
  const t = newsletterTexts[lang];
  const id = useId();
  const inputId = `${id}-email`;
  const statusId = `${id}-statut`;

  return (
    <form action={formAction} noValidate className="w-full max-w-xl">
      <input type="hidden" name="lang" value={lang} />
      {/* Champ piège pour les robots, invisible et ignoré par les lecteurs d'écran. */}
      <div aria-hidden="true" className="hidden">
        <label>
          Site web
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label htmlFor={inputId} className="sr-only">
        {t.label}
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id={inputId}
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder={t.placeholder}
          defaultValue={state.email}
          aria-invalid={state.status === "error" ? true : undefined}
          aria-describedby={statusId}
          className="h-12 w-full min-w-0 rounded-full border-2 border-transparent bg-white px-5 text-ink placeholder:text-ink-soft/80 focus:border-sun focus:outline-none sm:flex-1"
        />
        <button
          type="submit"
          disabled={pending}
          className="btn-shine h-12 rounded-full bg-terracotta px-6 font-semibold text-white transition hover:bg-terracotta-dark disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? t.pending : t.submit}
        </button>
      </div>
      <p
        id={statusId}
        role="status"
        aria-live="polite"
        className={`mt-2 min-h-5 text-sm font-medium ${state.status === "error" ? "text-sun" : "text-paper"}`}
      >
        {state.message}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-paper/75">
        {t.consent}{" "}
        <Link href={t.privacyPath} className="underline underline-offset-2 hover:text-sun">
          {t.privacy}
        </Link>
        .
      </p>
    </form>
  );
}
