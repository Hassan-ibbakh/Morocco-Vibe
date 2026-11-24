import Link from "next/link";
import { CoverImage } from "@/components/CoverImage";
import { getGuidesByDestination } from "@/lib/content";
import type { Destination } from "@/lib/types";

/** Carte « carte postale » d'une destination. */
export function DestinationCard({
  destination,
  headingLevel = "h3",
}: {
  destination: Destination;
  headingLevel?: "h2" | "h3";
}) {
  const count = getGuidesByDestination(destination.slug).length;
  const Heading = headingLevel;

  return (
    <article className="group relative flex w-full flex-col rounded-2xl bg-white p-3 shadow-[0_1px_0_rgba(27,42,47,0.06),0_8px_24px_-12px_rgba(27,42,47,0.18)] transition-transform focus-within:-translate-y-0.5 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <CoverImage
        image={destination.cover}
        seed={destination.slug}
        palette={destination.palette}
        sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
        className="aspect-[4/3] rounded-xl"
        showPlaceholderLabel={false}
      />
      <div className="flex flex-1 flex-col gap-2 px-2 pt-4 pb-2">
        <p className="text-xs font-semibold tracking-wider text-sea uppercase">
          {destination.country} · {destination.region}
        </p>
        <Heading className="font-display text-2xl font-semibold text-ink">
          <Link
            href={`/destinations/${destination.slug}`}
            className="after:absolute after:inset-0 after:content-[''] group-hover:text-terracotta focus-visible:outline-none"
          >
            {destination.name}
          </Link>
        </Heading>
        <p className="text-[0.95rem] leading-relaxed text-ink-soft">{destination.summary}</p>
        <p className="mt-auto pt-2 text-sm font-medium text-ink">
          {count === 0 ? "Guides à venir" : `${count} guide${count > 1 ? "s" : ""}`}
          <span aria-hidden="true" className="ml-1 inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </p>
      </div>
    </article>
  );
}
