import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, Fragment } from "react";
import { photos } from "@/content/photos";
import { Carousel3D } from "@/components/Carousel3D";
import { GuideGrid } from "@/components/GuideCard";
import { JsonLd } from "@/components/JsonLd";
import { StarMark } from "@/components/Logo";
import { Container } from "@/components/PageHeader";
import { Parallax } from "@/components/Parallax";
import { siteConfig } from "@/config/site";
import {
  getAllCategories,
  getAllDestinations,
  getAllGuides,
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

/** Chaque mot du titre entre en 3D, l'un après l'autre. */
const titleStart = siteConfig.hero.title.split(/\s+/).filter(Boolean);
const titleEnd = siteConfig.hero.highlight.split(/\s+/).filter(Boolean);
const word = (i: number) => ({ "--i": i }) as CSSProperties;

export default function HomePage() {
  const destinations = getAllDestinations();
  const featuredGuides = getFeaturedGuides(3);
  const latest = getAllGuides()
    .filter((g) => !featuredGuides.includes(g))
    .slice(0, 3);
  const categories = getAllCategories();

  return (
    <>
      {/* ---------- Héros ---------- */}
      <Parallax labelledBy="hero-titre" className="relative isolate overflow-hidden bg-ink">
        {/* Photo de fond : élément LCP, préchargée et servie en AVIF/WebP.
            Elle déborde un peu pour que l'effet de profondeur ne montre pas ses bords. */}
        <div aria-hidden="true" className="parallax-layer absolute -inset-6 -z-10 [--depth:-12]">
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
        {/* Étoiles de zellige flottantes, en 3D (décoratives). */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 hidden sm:block">
          <span className="parallax-layer absolute top-[12%] right-[8%] [--depth:28]">
            <StarMark className="float-3d h-16 w-16 opacity-80" />
          </span>
          <span className="parallax-layer absolute top-[58%] right-[44%] [--depth:18]">
            <StarMark className="float-3d h-9 w-9 opacity-60 [animation-delay:-4s]" />
          </span>
          <span className="parallax-layer absolute bottom-[14%] left-[4%] [--depth:36]">
            <StarMark className="float-3d h-12 w-12 opacity-70 [animation-delay:-8s]" />
          </span>
        </div>
        <Container className="relative grid gap-10 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="hero-fade text-sm font-semibold tracking-[0.2em] text-sun uppercase">
              {siteConfig.hero.eyebrow}
            </p>
            <h1
              id="hero-titre"
              className="hero-3d mt-4 font-display text-[2.6rem] leading-[1.05] font-semibold text-balance text-white sm:text-6xl"
            >
              {titleStart.map((w, i) => (
                <Fragment key={i}>
                  <span className="hero-word" style={word(i)}>
                    {w}
                  </span>
                  {(i < titleStart.length - 1 || titleEnd.length > 0) && " "}
                </Fragment>
              ))}
              {titleEnd.map((w, i) => (
                <Fragment key={i}>
                  <span className="hero-word text-shimmer" style={word(titleStart.length + i)}>
                    {w}
                  </span>
                  {i < titleEnd.length - 1 && " "}
                </Fragment>
              ))}
            </h1>
            <p className="hero-fade mt-6 max-w-xl text-lg leading-relaxed text-paper/90 [animation-delay:150ms]">
              {siteConfig.hero.intro}
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
                className="btn-shine h-13 rounded-full bg-terracotta px-7 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-terracotta-dark motion-reduce:hover:translate-y-0"
              >
                Rechercher
              </button>
            </form>
          </div>

          <div className="parallax-layer [--depth:10]">
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
          </div>
        </Container>
        <p className="absolute right-3 bottom-2 text-[0.7rem] text-paper/80">
          Erg Chebbi — photo : {heroPhoto.author},{" "}
          <a href={heroPhoto.licenseUrl} rel="license noopener noreferrer" target="_blank" className="underline">
            {heroPhoto.license}
          </a>
        </p>
      </Parallax>

      {/* ---------- Bandeau défilant (décoratif) ---------- */}
      <div aria-hidden="true" className="marquee overflow-hidden bg-terracotta py-3 text-paper">
        <div className="marquee-track flex w-max font-display text-lg font-semibold whitespace-nowrap">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 gap-8 pr-8">
              {[...destinations.map((d) => d.name), ...categories.map((c) => c.name)].map((label) => (
                <span key={label} className="flex items-center gap-8">
                  {label}
                  <StarMark className="h-5 w-5" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Destinations ---------- */}
      <section aria-labelledby="destinations-titre" className="overflow-hidden py-16 sm:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="destinations-titre" className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                Explorez le Maroc
              </h2>
              <p className="mt-2 max-w-xl text-ink-soft">
                Des villes impériales aux dunes du Sahara, chaque fiche réunit l&apos;essentiel pour préparer votre étape.
              </p>
            </div>
            <Link href="/destinations" className="font-semibold text-sea underline underline-offset-4 hover:text-terracotta">
              Toutes les destinations
            </Link>
          </div>
          <div className="mt-10">
            <Carousel3D
              label="Destinations"
              slides={destinations.map((d) => ({
                href: `/destinations/${d.slug}`,
                title: d.name,
                subtitle: d.region,
                src: d.cover.src,
                alt: d.cover.alt,
              }))}
            />
          </div>
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
