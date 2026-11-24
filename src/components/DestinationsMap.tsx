import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { MAP_HEIGHT, MAP_WIDTH, MOROCCO_PATH, NEIGHBORS_PATH, projectPoint } from "@/components/map-data";
import { getGuidesByDestination } from "@/lib/content";
import type { Destination } from "@/lib/types";

/**
 * Carte interactive des destinations, sans service externe : contours SVG
 * (Natural Earth, domaine public) et repères en HTML. Chaque repère est un
 * lien accessible au clavier ; au survol ou au focus, une fiche apparaît
 * (photo, région, résumé). Sur mobile, un appui ouvre directement la page.
 */
export function DestinationsMap({ destinations }: { destinations: Destination[] }) {
  const places = destinations
    .filter((d) => d.coordinates)
    .map((d) => {
      const { x, y } = projectPoint(d.coordinates!.lon, d.coordinates!.lat);
      return { d, left: (x / MAP_WIDTH) * 100, top: (y / MAP_HEIGHT) * 100 };
    })
    .filter((p) => p.left >= 0 && p.left <= 100 && p.top >= 0 && p.top <= 100);

  return (
    <figure className="mx-auto max-w-4xl">
      <div className="relative overflow-hidden rounded-3xl border border-sand-deep shadow-[0_30px_60px_-35px_rgba(27,42,47,0.55)]">
        <svg
          viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
          className="block h-auto w-full"
          role="img"
          aria-label="Carte du nord et du centre du Maroc avec les destinations du site"
        >
          <defs>
            <linearGradient id="carte-mer" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#e3f0f1" />
              <stop offset="1" stopColor="#c9e0e4" />
            </linearGradient>
            <linearGradient id="carte-terre" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fbf3e6" />
              <stop offset="1" stopColor="#f3dfc2" />
            </linearGradient>
            <pattern id="carte-vagues" width="28" height="14" patternUnits="userSpaceOnUse">
              <path d="M0 7 Q7 2 14 7 T28 7" fill="none" stroke="#1f5c66" strokeOpacity="0.08" strokeWidth="1.2" />
            </pattern>
            <linearGradient id="carte-fondu" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#faf6ef" stopOpacity="0" />
              <stop offset="1" stopColor="#faf6ef" />
            </linearGradient>
          </defs>
          <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#carte-mer)" />
          <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="url(#carte-vagues)" />
          <g>
            <path d={NEIGHBORS_PATH} fill="#ece3d4" stroke="#d6c7ae" strokeWidth="1" />
            <path
              d={MOROCCO_PATH}
              pathLength={1}
              className="map-land"
              fill="url(#carte-terre)"
              stroke="#b4441f"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </g>
          <g fill="#16444c" fillOpacity="0.55" fontStyle="italic" fontSize="22" fontFamily="var(--font-display)">
            <text x="70" y="300" transform="rotate(-62 70 300)">
              Océan Atlantique
            </text>
            <text x="700" y="40">
              Mer Méditerranée
            </text>
          </g>
          <text x="880" y="600" fill="#4a5a5f" fillOpacity="0.6" fontSize="20" letterSpacing="4">
            ALGÉRIE
          </text>
          {/* Fondu en bas de carte : le cadrage s'arrête au sud de Merzouga. */}
          <rect y={MAP_HEIGHT * 0.84} width={MAP_WIDTH} height={MAP_HEIGHT * 0.16} fill="url(#carte-fondu)" />
        </svg>

        <ul>
          {places.map(({ d, left, top }, i) => {
            const count = getGuidesByDestination(d.slug).length;
            const below = top < 35; // fiche sous le repère près du haut de la carte
            // Nom à gauche côté océan, sous le repère près du bord droit : pas de chevauchement.
            const labelPosition =
              left < 40
                ? "right-full mr-1 top-1/2 -translate-y-1/2"
                : left > 70
                  ? "top-full mt-1 left-1/2 -translate-x-1/2"
                  : "left-full ml-1 top-1/2 -translate-y-1/2";
            return (
              <li
                key={d.slug}
                className="map-pin absolute focus-within:z-20 hover:z-20"
                style={{ left: `${left}%`, top: `${top}%`, "--i": i } as CSSProperties}
              >
                <Link
                  href={`/destinations/${d.slug}`}
                  aria-label={`${d.name} — ${d.region}`}
                  className="group/pin relative -mt-2.5 -ml-2.5 block h-5 w-5 focus-visible:outline-none"
                >
                  <span className="relative grid h-5 w-5 place-items-center">
                    <span className="map-pulse absolute inset-0 rounded-full bg-terracotta/40" />
                    <span className="relative h-3.5 w-3.5 rounded-full border-2 border-white bg-terracotta shadow-md transition-transform group-hover/pin:scale-125 group-focus-visible/pin:scale-125 group-focus-visible/pin:ring-4 group-focus-visible/pin:ring-sea/50" />
                  </span>
                  <span
                    className={`absolute rounded-full bg-white/90 px-1.5 py-0.5 font-display text-xs font-semibold whitespace-nowrap text-ink shadow-sm sm:px-2 sm:text-base ${labelPosition}`}
                  >
                    {d.name}
                  </span>

                  {/* Fiche au survol / focus (ordinateur). */}
                  <span
                    className={`pointer-events-none absolute left-1/2 z-10 hidden w-64 -translate-x-1/2 overflow-hidden rounded-2xl bg-white text-left opacity-0 shadow-[0_20px_45px_-20px_rgba(27,42,47,0.6)] transition duration-300 group-hover/pin:opacity-100 group-focus-visible/pin:opacity-100 sm:block ${
                      below
                        ? "top-full mt-3 translate-y-2 group-hover/pin:translate-y-0 group-focus-visible/pin:translate-y-0"
                        : "bottom-full mb-3 -translate-y-2 group-hover/pin:translate-y-0 group-focus-visible/pin:translate-y-0"
                    } motion-reduce:transition-none`}
                  >
                    {d.cover.src && (
                      <span className="relative block aspect-video bg-sand">
                        <Image src={d.cover.src} alt="" fill sizes="256px" className="object-cover" />
                      </span>
                    )}
                    <span className="block p-4">
                      <span className="block text-xs font-semibold tracking-widest text-sea uppercase">{d.region}</span>
                      <span className="mt-1 block font-display text-lg font-semibold text-ink">{d.name}</span>
                      <span className="mt-1 line-clamp-3 block text-sm leading-relaxed text-ink-soft">{d.summary}</span>
                      <span className="mt-2 block text-sm font-semibold text-terracotta">
                        {count > 0 ? `${count} guide${count > 1 ? "s" : ""} →` : "Découvrir →"}
                      </span>
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <figcaption className="mt-3 text-center text-xs text-ink-soft">
        Survolez ou sélectionnez une ville pour en savoir plus. Contours : Natural Earth (domaine public).
      </figcaption>
    </figure>
  );
}
