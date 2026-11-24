import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DestinationCard } from "@/components/DestinationCard";
import { DestinationsMap } from "@/components/DestinationsMap";
import { Container, PageHeader } from "@/components/PageHeader";
import { getAllDestinations } from "@/lib/content";
import { slugify } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Destinations au Maroc : villes, côte et désert",
  description:
    "Toutes nos fiches destinations au Maroc : Marrakech, Fès, Chefchaouen, Essaouira, Merzouga… L'essentiel pour préparer chaque étape de votre voyage.",
  path: "/destinations",
});

export default function DestinationsPage() {
  const destinations = getAllDestinations();
  const regions = [...new Set(destinations.map((d) => d.region))];

  return (
    <Container className="py-10 sm:py-14">
      <Breadcrumbs items={[{ name: "Destinations", href: "/destinations" }]} />
      <div className="mt-8">
        <PageHeader
          eyebrow="Destinations"
          title="Où partir au Maroc ?"
          intro="Chaque fiche présente une ville ou une région, ses incontournables et des conseils pratiques, avec des liens vers nos guides détaillés."
        />
      </div>

      {destinations.length === 0 ? (
        <p className="mt-12 rounded-2xl border border-dashed border-sand-deep p-8 text-ink-soft">
          Aucune destination n&apos;est encore publiée. Revenez bientôt !
        </p>
      ) : (
        <>
          <section aria-label="Carte des destinations" className="mt-10">
            <DestinationsMap destinations={destinations} />
          </section>
          {regions.length > 1 && (
            <nav aria-label="Aller à une région" className="mt-10">
              <ul className="flex flex-wrap gap-2">
                {regions.map((r) => (
                  <li key={r}>
                    <a
                      href={`#region-${slugify(r)}`}
                      className="inline-flex min-h-11 items-center rounded-full border border-sand-deep px-4 text-sm font-medium text-ink hover:bg-sand"
                    >
                      {r}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
          {regions.map((region) => {
            const id = `region-${slugify(region)}`;
            return (
              <section key={region} id={id} aria-labelledby={`${id}-titre`} className="mt-14">
                <h2 id={`${id}-titre`} className="font-display text-2xl font-semibold text-ink">
                  Région {region}
                </h2>
                <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {destinations
                    .filter((d) => d.region === region)
                    .map((d) => (
                      <li key={d.slug} className="reveal flex">
                        <DestinationCard destination={d} />
                      </li>
                    ))}
                </ul>
              </section>
            );
          })}
        </>
      )}
    </Container>
  );
}
