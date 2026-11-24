import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/PageHeader";
import { StarMark } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container className="py-20 sm:py-28">
      <div className="mx-auto max-w-xl text-center">
        <StarMark className="spin-slow mx-auto h-14 w-14" />
        <p className="mt-6 text-sm font-semibold tracking-[0.2em] text-terracotta-dark uppercase">Erreur 404</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
          Cette page s&apos;est perdue dans la médina.
        </h1>
        <p className="mt-5 text-lg text-ink-soft">
          Le lien est peut-être ancien ou l&apos;adresse contient une faute de frappe. Voici quelques
          chemins pour retrouver votre route.
        </p>
        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          <li>
            <Link href="/" className="inline-flex h-12 items-center rounded-full bg-terracotta px-6 font-semibold text-white hover:bg-terracotta-dark">
              Retour à l&apos;accueil
            </Link>
          </li>
          <li>
            <Link href="/destinations" className="inline-flex h-12 items-center rounded-full border border-sand-deep px-6 font-semibold text-ink hover:bg-sand">
              Destinations
            </Link>
          </li>
          <li>
            <Link href="/recherche" className="inline-flex h-12 items-center rounded-full border border-sand-deep px-6 font-semibold text-ink hover:bg-sand">
              Rechercher
            </Link>
          </li>
        </ul>
      </div>
    </Container>
  );
}
