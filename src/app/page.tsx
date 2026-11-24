import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { photos } from "@/content/photos";
import { DestinationCard } from "@/components/DestinationCard";
import { GuideGrid } from "@/components/GuideCard";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/PageHeader";
import { siteConfig } from "@/config/site";
import {
  getAllCategories,
  getAllGuides,
  getFeaturedDestinations,
  getFeaturedGuides,
  getGuidesByCategory,
} from "@/lib/content";
import { organizationJsonLd, pageMetadata, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  absoluteTitle: true,
  description: siteConfig.description,
  path: "/",
});

const heroPhoto = photos["hero-erg-chebbi"];

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
      <section className="relative isolate overflow-hidden bg-ink">
        {/* Photo de fond : élément LCP, préchargée et servie en AVIF/WebP. */}
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <Image
            src={heroPhoto.src}
            alt=""
            fill
            preload
            sizes="100vw"
            className="hero-image object-cover object-[50%_70%]"
          />
          {/* Voile sombre : garantit un contraste AA du texte blanc sur la photo. */}
          <div className="absolute inset-0 bg-linear-to-t from-ink/95 via-ink/70 to-ink/50 lg:bg-linear-to-r lg:from-ink/90 lg:via-ink/70 lg:to-ink/25" />
        </div>
        <Container className="relative grid gap-10 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="hero-fade text-sm font-semibold tracking-[0.2em] text-sun uppercase">
              Carnets de voyage au Maroc
            </p>
            <h1 className="hero-title mt-4 font-display text-[2.6rem] leading-[1.05] font-semibold text-balance text-white sm:text-6xl">
              Préparez votre voyage au Maroc, ville après ville.
            </h1>
            <p className="hero-fade mt-6 max-w-xl text-lg leading-relaxed text-paper/90 [animation-delay:150ms]">
              Des guides pratiques, des idées de visites et des conseils clairs pour organiser votre
              séjour : médinas, côte atlantique, montagnes et désert.
            </p>
            <form
              action="/recherche"
              role="search"
              className="hero-fade mt-8 flex max-w-xl flex-col gap-3 sm:flex-row [animation-delay:300ms]"
            >
              <label htmlFor="hero-search" className="sr-only">
                Rechercher une destination ou un guide
              </label>
              <input
                id="hero-search"
                name="q"
                type="search"
                placeholder="Où rêvez-vous d'aller ?"
                className="h-13 w-full min-w-0 rounded-full border-2 border-transparent bg-white px-5 text-lg text-ink placeholder:text-ink-soft/80 focus:border-sun focus:outline-none sm:flex-1"
              />
              <button
                type="submit"
                className="h-13 rounded-full bg-terracotta px-7 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-terracotta-dark motion-reduce:hover:translate-y-0"
              >
                Rechercher
              </button>
            </form>
          </div>

          <div className="hero-fade rounded-3xl bg-paper/95 p-6 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.6)] backdrop-blur [animation-delay:450ms]">
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
        <p className="absolute right-3 bottom-2 text-[0.7rem] text-paper/80">
          Erg Chebbi — photo : {heroPhoto.author},{" "}
          <a href={heroPhoto.licenseUrl} rel="license noopener noreferrer" target="_blank" className="underline">
            {heroPhoto.license}
          </a>
        </p>
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
              <li key={d.slug} className="reveal flex">
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

      {/* Google recommande WebSite (nom du site) et Organization sur la page d'accueil. */}
      <JsonLd data={[websiteJsonLd(), organizationJsonLd()]} />
    </>
  );
}
