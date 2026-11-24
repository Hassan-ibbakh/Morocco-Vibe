import Link from "next/link";
import { CoverImage } from "@/components/CoverImage";
import { Tilt } from "@/components/Tilt";
import { getCategory, getDestination, getReadingTime } from "@/lib/content";
import { formatDate } from "@/lib/format";
import type { Guide } from "@/lib/types";

/**
 * Carte d'un guide. Toute la carte est cliquable via un lien étiré sur le
 * titre (un seul lien par carte, plus simple au clavier et au lecteur d'écran).
 */
export function GuideCard({
  guide,
  headingLevel = "h3",
}: {
  guide: Guide;
  headingLevel?: "h2" | "h3";
}) {
  const category = getCategory(guide.category);
  const destination = guide.destination ? getDestination(guide.destination) : undefined;
  const Heading = headingLevel;

  return (
    <Tilt className="flex w-full rounded-2xl">
      <article className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_0_rgba(27,42,47,0.06),0_8px_24px_-12px_rgba(27,42,47,0.18)] transition-shadow focus-within:shadow-lg hover:shadow-lg">
        <CoverImage
          image={guide.cover}
          seed={guide.slug}
          palette={destination?.palette}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="aspect-16/10"
          imgClassName="transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          showPlaceholderLabel={false}
          transitionName={`guide-cover-${guide.slug}`}
        />
        <div className="flex flex-1 flex-col gap-3 p-5">
          <p className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider text-terracotta uppercase">
            <span>{category?.name}</span>
            {destination && (
              <>
                <span aria-hidden="true" className="text-sand-deep">
                  •
                </span>
                <span className="text-sea">{destination.name}</span>
              </>
            )}
          </p>
          <Heading className="font-display text-xl leading-snug font-semibold text-ink">
            <Link
              href={`/guides/${guide.slug}`}
              className="after:absolute after:inset-0 after:content-[''] group-hover:text-sea focus-visible:outline-none"
            >
              {guide.title}
            </Link>
          </Heading>
          <p className="line-clamp-3 text-[0.95rem] leading-relaxed text-ink-soft">
            {guide.description}
          </p>
          <p className="mt-auto pt-2 text-sm text-ink-soft">
            <time dateTime={guide.updatedAt ?? guide.publishedAt}>
              {formatDate(guide.updatedAt ?? guide.publishedAt)}
            </time>
            <span aria-hidden="true"> · </span>
            {getReadingTime(guide)} min de lecture
          </p>
        </div>
      </article>
    </Tilt>
  );
}

export function GuideGrid({
  guides,
  headingLevel,
}: {
  guides: Guide[];
  headingLevel?: "h2" | "h3";
}) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {guides.map((g) => (
        <li key={g.slug} className="reveal flex">
          <div className="flex w-full">
            <GuideCard guide={g} headingLevel={headingLevel} />
          </div>
        </li>
      ))}
    </ul>
  );
}
