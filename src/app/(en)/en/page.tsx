import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, Fragment } from "react";
import { GuideGrid } from "@/components/GuideCard";
import { StarMark } from "@/components/Logo";
import { Container } from "@/components/PageHeader";
import { Parallax } from "@/components/Parallax";
import { siteConfig } from "@/config/site";
import { photos } from "@/content/photos";
import { getAllCategories, getAllGuides, getFeaturedGuides } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  lang: "en",
  languages: { fr: "/", en: "/en" },
  title: `${siteConfig.name} — Practical guides for travelling in Morocco`,
  absoluteTitle: true,
  description:
    "Practical guides, sightseeing ideas and reliable tips to plan your trip to Morocco: imperial cities, the Atlantic coast, the mountains and the desert.",
  path: "/en",
  ogImagePath: "/en/share-image.png",
});

const heroPhoto = photos["hero-erg-chebbi"];
const titleStart = "Plan your trip to Morocco,".split(" ");
const titleEnd = "one city at a time.".split(" ");
const word = (i: number) => ({ "--i": i }) as CSSProperties;

export default function EnglishHomePage() {
  const featured = getFeaturedGuides(3, "en");
  const latest = getAllGuides("en")
    .filter((g) => !featured.includes(g))
    .slice(0, 6);
  const categories = getAllCategories().filter((c) => getAllGuides("en").some((g) => g.category === c.slug));

  return (
    <>
      <Parallax labelledBy="hero-title" className="relative isolate overflow-hidden bg-ink">
        <div aria-hidden="true" className="parallax-layer absolute -inset-6 -z-10 [--depth:-12]">
          <Image
            src={heroPhoto.src}
            alt=""
            fill
            preload
            sizes="100vw"
            className="hero-image object-cover object-[50%_70%]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink/95 via-ink/70 to-ink/50 lg:bg-linear-to-r lg:from-ink/90 lg:via-ink/70 lg:to-ink/25" />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 hidden sm:block">
          <span className="parallax-layer absolute top-[14%] right-[10%] [--depth:28]">
            <StarMark className="float-3d h-16 w-16 opacity-80" />
          </span>
          <span className="parallax-layer absolute bottom-[16%] left-[5%] [--depth:36]">
            <StarMark className="float-3d h-12 w-12 opacity-70 [animation-delay:-8s]" />
          </span>
        </div>
        <Container className="relative grid gap-10 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="hero-fade text-sm font-semibold tracking-[0.2em] text-sun uppercase">Morocco travel notebooks</p>
            <h1
              id="hero-title"
              className="hero-3d mt-4 font-display text-[2.6rem] leading-[1.05] font-semibold text-balance text-white sm:text-6xl"
            >
              {titleStart.map((w, i) => (
                <Fragment key={i}>
                  <span className="hero-word" style={word(i)}>
                    {w}
                  </span>{" "}
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
              Practical guides, sightseeing ideas and clear advice to organise your stay: medinas, the Atlantic
              coast, the mountains and the desert.
            </p>
            <p className="hero-fade mt-8 flex flex-wrap gap-3 [animation-delay:300ms]">
              <Link
                href="/en/guides"
                className="btn-shine inline-flex h-13 items-center rounded-full bg-terracotta px-7 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-terracotta-dark motion-reduce:hover:translate-y-0"
              >
                Browse the guides
              </Link>
              <Link
                href="/en/guides/two-week-morocco-itinerary"
                className="inline-flex h-13 items-center rounded-full border-2 border-paper/60 px-7 font-semibold text-white transition hover:border-sun hover:text-sun"
              >
                Two-week itinerary
              </Link>
            </p>
          </div>

          <div className="parallax-layer [--depth:10]">
            <div className="hero-fade rounded-3xl bg-paper/95 p-6 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.6)] backdrop-blur [animation-delay:450ms]">
              <p className="text-sm font-semibold tracking-widest text-sea uppercase">Where to start?</p>
              <ul className="mt-4 divide-y divide-sand-deep">
                {categories.slice(0, 4).map((c) => (
                  <li key={c.slug}>
                    <Link href={`/en/guides#${c.slug}`} className="group flex items-center justify-between gap-4 py-3.5">
                      <span>
                        <span className="block font-display text-lg font-semibold text-ink group-hover:text-terracotta">
                          {c.nameEn ?? c.name}
                        </span>
                        <span className="block text-sm text-ink-soft">
                          {getAllGuides("en").filter((g) => g.category === c.slug).length} guide(s)
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
          Erg Chebbi — photo: {heroPhoto.author},{" "}
          <a href={heroPhoto.licenseUrl} rel="license noopener noreferrer" target="_blank" className="underline">
            {heroPhoto.license}
          </a>
        </p>
      </Parallax>

      <section aria-labelledby="featured-title" className="py-16 sm:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="featured-title" className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Essential guides
            </h2>
            <Link href="/en/guides" className="font-semibold text-sea underline underline-offset-4 hover:text-terracotta">
              All guides
            </Link>
          </div>
          <div className="mt-10">
            <GuideGrid guides={featured} />
          </div>
        </Container>
      </section>

      {latest.length > 0 && (
        <section aria-labelledby="latest-title" className="bg-white/60 py-16 sm:py-20">
          <Container>
            <h2 id="latest-title" className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Latest articles
            </h2>
            <div className="mt-10">
              <GuideGrid guides={latest} />
            </div>
          </Container>
        </section>
      )}

      <section aria-labelledby="approach-title" className="mt-16">
        <Container>
          <div className="grid gap-8 rounded-3xl bg-ink px-6 py-12 text-paper sm:px-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <h2 id="approach-title" className="font-display text-3xl font-semibold text-balance">
              Useful advice, without unrealistic promises.
            </h2>
            <div className="space-y-4 text-paper/90">
              <p>
                We favour information that can be checked and point to official sources for anything that changes
                often: entry requirements, opening hours, prices.
              </p>
              <p>
                <Link href="/en/about" className="font-semibold text-sun underline underline-offset-4">
                  About our editorial approach
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
