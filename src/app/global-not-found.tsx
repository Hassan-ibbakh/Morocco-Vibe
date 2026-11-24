import type { Metadata } from "next";
import Link from "next/link";
import { StarMark } from "@/components/Logo";
import { siteConfig } from "@/config/site";
import { fontClasses } from "@/lib/fonts";
import "./globals.css";

/**
 * Page 404 des adresses qui ne correspondent à aucune page (le site a
 * plusieurs layouts racine : français, anglais, administration). Elle est
 * bilingue, car on ne connaît pas la langue du visiteur.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Page introuvable — Page not found | Morocco Vibe",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="fr" className={fontClasses}>
      <body className="grid min-h-dvh place-items-center bg-paper px-4 py-16 text-ink">
        <main className="max-w-xl text-center">
          <StarMark className="spin-slow mx-auto h-16 w-16" />
          <p className="mt-6 font-display text-6xl font-semibold text-terracotta">404</p>
          <h1 className="mt-4 font-display text-3xl font-semibold text-balance">
            Cette page n&apos;existe pas ou a été déplacée.
          </h1>
          <p lang="en" className="mt-2 text-lg text-ink-soft">
            This page doesn&apos;t exist or has moved.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="rounded-full bg-terracotta px-6 py-3 font-semibold text-white hover:bg-terracotta-dark">
              Retour à l&apos;accueil
            </Link>
            <Link
              href="/en"
              lang="en"
              className="rounded-full border border-sand-deep bg-white px-6 py-3 font-semibold text-ink hover:border-sea"
            >
              English homepage
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
