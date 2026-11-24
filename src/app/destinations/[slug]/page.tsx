import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CoverImage } from "@/components/CoverImage";
import { DemoNotice } from "@/components/DemoNotice";
import { DestinationCard } from "@/components/DestinationCard";
import { GuideGrid } from "@/components/GuideCard";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/PageHeader";
import { getAllDestinations, getDestination, getGuidesByDestination } from "@/lib/content";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

/** Rendu entièrement statique : un slug inconnu renvoie un vrai code 404. */
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return getAllDestinations().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: PageProps<"/destinations/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) return { title: "Destination introuvable" };
  return pageMetadata({
    title: `${destination.name} : guide pratique et idées de visites`,
    description: destination.summary,
    path: `/destinations/${destination.slug}`,
    noindex: destination.demo,
  });
}

export default async function DestinationPage({ params }: PageProps<"/destinations/[slug]">) {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) notFound();

  const guides = getGuidesByDestination(destination.slug);
  const others = getAllDestinations()
    .filter((d) => d.slug !== destination.slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: destination.name,
    description: destination.summary,
    url: absoluteUrl(`/destinations/${destination.slug}`),
    containedInPlace: { "@type": "Country", name: destination.country },
    ...(destination.cover.src ? { image: absoluteUrl(destination.cover.src) } : {}),
  };

  return (
    <>
      <Container className="pt-10 sm:pt-14">
        <Breadcrumbs
          items={[
            { name: "Destinations", href: "/destinations" },
            { name: destination.name, href: `/destinations/${destination.slug}` },
          ]}
        />
      </Container>

      <Container className="mt-8 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <header>
          <p className="text-sm font-semibold tracking-[0.18em] text-terracotta uppercase">
            {destination.country} · {destination.region}
          </p>
          <h1 className="mt-3 font-display text-5xl leading-[1.05] font-semibold text-ink sm:text-6xl">
            {destination.name}
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-ink-soft">{destination.summary}</p>
          {destination.demo && (
            <div className="mt-6">
              <DemoNotice kind="fiche destination" />
            </div>
          )}
        </header>
        <figure>
          <CoverImage
            image={destination.cover}
            seed={destination.slug}
            palette={destination.palette}
            sizes="(min-width: 1024px) 600px, 100vw"
            preload
            className="aspect-[4/3] rounded-3xl"
          />
          {destination.cover.credit && (
            <figcaption className="mt-2 text-xs text-ink-soft">{destination.cover.credit}</figcaption>
          )}
        </figure>
      </Container>

      <Container className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="prose-travel max-w-2xl">
          <h2 className="mt-0">Découvrir {destination.name}</h2>
          {destination.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <h2>Les incontournables</h2>
          <ul>
            {destination.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>

        <aside aria-labelledby="pratique-titre" className="h-fit rounded-3xl bg-sand p-6 sm:p-8">
          <h2 id="pratique-titre" className="font-display text-2xl font-semibold text-ink">
            Conseils pratiques
          </h2>
          <dl className="mt-5 space-y-5">
            {destination.practical.map((item) => (
              <div key={item.label}>
                <dt className="text-sm font-semibold tracking-wider text-terracotta-dark uppercase">{item.label}</dt>
                <dd className="mt-1 leading-relaxed text-ink">{item.text}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 border-t border-sand-deep pt-4 text-sm text-ink-soft">
            Formalités, horaires et tarifs évoluent : vérifiez-les auprès des sources officielles avant le départ.
          </p>
        </aside>
      </Container>

      <section aria-labelledby="guides-destination" className="mt-20">
        <Container>
          <h2 id="guides-destination" className="font-display text-3xl font-semibold text-ink">
            Nos guides pour {destination.name}
          </h2>
          {guides.length ? (
            <div className="mt-8">
              <GuideGrid guides={guides} />
            </div>
          ) : (
            <p className="mt-6 rounded-2xl border border-dashed border-sand-deep p-8 text-ink-soft">
              Aucun guide n&apos;est encore publié pour cette destination.{" "}
              <Link href="/guides" className="text-sea underline underline-offset-4">
                Parcourir tous les guides
              </Link>
            </p>
          )}
        </Container>
      </section>

      {others.length > 0 && (
        <section aria-labelledby="autres-destinations" className="mt-20">
          <Container>
            <h2 id="autres-destinations" className="font-display text-3xl font-semibold text-ink">
              D&apos;autres destinations
            </h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((d) => (
                <li key={d.slug} className="flex">
                  <DestinationCard destination={d} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <JsonLd data={jsonLd} />
    </>
  );
}
