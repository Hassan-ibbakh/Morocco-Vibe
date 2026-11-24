"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center sm:py-28">
      <p className="text-sm font-semibold tracking-[0.2em] text-terracotta-dark uppercase">Erreur</p>
      <h1 className="mt-3 font-display text-4xl font-semibold text-ink">Un imprévu est survenu.</h1>
      <p className="mt-5 text-lg text-ink-soft">
        La page n&apos;a pas pu s&apos;afficher. Vous pouvez réessayer ou revenir à l&apos;accueil.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex h-12 items-center rounded-full bg-terracotta px-6 font-semibold text-white hover:bg-terracotta-dark"
        >
          Réessayer
        </button>
        <Link href="/" className="inline-flex h-12 items-center rounded-full border border-sand-deep px-6 font-semibold text-ink hover:bg-sand">
          Accueil
        </Link>
      </div>
    </div>
  );
}
