import type { Metadata } from "next";
import Link from "next/link";
import { DestinationCard } from "@/components/DestinationCard";
import { GuideGrid } from "@/components/GuideCard";
import { Container } from "@/components/PageHeader";
import { siteConfig } from "@/config/site";
import {
  getAllCategories,
  getAllGuides,
  getFeaturedDestinations,
  getFeaturedGuides,
  getGuidesByCategory,
} from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  absoluteTitle: true,
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  const featuredDestinations = getFeaturedDestinations(4);
  const featuredGuides = getFeaturedGuides(3);
  const latest = getAllGuides()
    .filter((g) => !featuredGuides.includes(g))
    .slice(0, 3);
  const categories = getAllCategories();

  return (
    <>
      {/* ---------- Héros ---------- */}
      <section className="relative overflow-hidden border-b border-sand-deep/70 bg-sand">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.10] bg-[url('/pattern-zellige.svg')] bg-size-[72px_72px]"
        />
        <Container className="relative grid gap-10 py-16 sm:py-24 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-terracotta-dark uppercase">
              Carnets de voyage au Maroc
            </p>
            <h1 className="mt-4 font-display text-[2.6rem] leading-[1.05] font-semibold text-balance text-ink sm:text-6xl">
              Préparez votre voyage au Maroc, ville après ville.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              Des guides pratiques, des idées de visites et des conseils clairs pour organiser votre
              séjour : médinas, côte atlantique, montagnes et désert.
            </p>
            <form action="/recherche" role="search" className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
              <label htmlFor="hero-search" className="sr-only">
                Rechercher une destination ou un guide
              </label>
              <input
                id="hero-search"
                name="q"
                type="search"
                placeholder="Où rêvez-vous d'aller ?"
                className="h-13 w-full min-w-0 rounded-full sm:flex-1 border-2 border-ink/15 bg-white px-5 text-lg text-ink placeholder:text-ink-soft/80 focus:border-sea focus:outline-none"
              />
              <button
                type="submit"
                className="h-13 rounded-full bg-terracotta px-7 font-semibold text-white transition-colors hover:bg-terracotta-dark"
              >
                Rechercher
              </button>
            </form>
          </div>

          <div className="rounded-3xl bg-paper p-6 shadow-[0_20px_50px_-25px_rgba(27,42,47,0.4)]">
            <p className="text-sm font-semibold tracking-widest text-sea uppercase">Par où commencer ?</p>
            <ul className="mt-4 divide-y divide-sand-deep">
              {categories.slice(0, 4).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/guides/categorie/${c.slug}`}
                    className="group flex items-center justify-between gap-4 py-3.5"
                  >
                    <span>
                      <span className="block font-display text-lg font-semibold text-ink group-hover:text-terracotta">
                        {c.name}
                      </span>
                      <span className="block text-sm text-ink-soft">
                        {getGuidesByCategory(c.slug).length} guide(s)
                      </span>
                    </span>
                    <span aria-hidden="true" className="text-xl text-terracotta transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ---------- Destinations ---------- */}
      <section aria-labelledby="destinations-titre" className="py-16 sm:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="destinations-titre" className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                Destinations à la une
              </h2>
              <p className="mt-2 max-w-xl text-ink-soft">
                Des villes impériales aux dunes du Sahara, chaque fiche réunit l&apos;essentiel pour préparer votre étape.
              </p>
            </div>
            <Link href="/destinations" className="font-semibold text-sea underline underline-offset-4 hover:text-terracotta">
              Toutes les destinations
            </Link>
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredDestinations.map((d) => (
              <li key={d.slug} className="flex">
                <DestinationCard destination={d} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ---------- Meilleurs guides ---------- */}
      <section aria-labelledby="guides-titre" className="bg-white/60 py-16 sm:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="guides-titre" className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Nos guides essentiels
            </h2>
            <Link href="/guides" className="font-semibold text-sea underline underline-offset-4 hover:text-terracotta">
              Tous les guides
            </Link>
          </div>
          <div className="mt-10">
            <GuideGrid guides={featuredGuides} />
          </div>
        </Container>
      </section>

      {/* ---------- Derniers guides ---------- */}
      {latest.length > 0 && (
        <section aria-labelledby="recents-titre" className="py-16 sm:py-20">
          <Container>
            <h2 id="recents-titre" className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Derniers articles
            </h2>
            <div className="mt-10">
              <GuideGrid guides={latest} />
            </div>
          </Container>
        </section>
      )}

      {/* ---------- Engagement éditorial ---------- */}
      <section aria-labelledby="engagement-titre">
        <Container>
          <div className="grid gap-8 rounded-3xl bg-ink px-6 py-12 text-paper sm:px-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <h2 id="engagement-titre" className="font-display text-3xl font-semibold text-balance">
              Des conseils utiles, sans promesses irréalistes.
            </h2>
            <div className="space-y-4 text-paper/90">
              <p>
                Nous privilégions les informations vérifiables et renvoyons vers les sources officielles pour
                tout ce qui change souvent : formalités, horaires, tarifs.
              </p>
              <p>
                <Link href="/a-propos" className="font-semibold text-sun underline underline-offset-4">
                  Découvrir notre démarche éditoriale
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
