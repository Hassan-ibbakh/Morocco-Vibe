"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, type ReactNode, useEffect, useState, useSyncExternalStore } from "react";

export type Slide = { href: string; title: string; subtitle: string; src?: string; alt: string };

const REDUCED = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/**
 * Carrousel 3D : les cartes sont disposées en anneau et tournent autour d'un
 * axe vertical.
 * Accessibilité (WCAG 2.2.2) : rotation automatique en pause au survol, au
 * focus et via un bouton ; aucune rotation automatique si l'utilisateur a
 * demandé à réduire les animations. Le focus clavier amène la carte devant.
 */
export function Carousel3D({ slides, label }: { slides: Slide[]; label: string }) {
  const count = slides.length;
  const step = 360 / count;
  // Distance des cartes au centre de l'anneau, en largeurs de carte.
  const radiusFactor = 1 / (2 * Math.tan(Math.PI / count));

  const [position, setPosition] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const reduced = useSyncExternalStore(subscribe, () => window.matchMedia(REDUCED).matches, () => true);
  const autoplay = !paused && !interacting && !reduced;
  const active = ((position % count) + count) % count;

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => setPosition((p) => p + 1), 3800);
    return () => clearInterval(timer);
  }, [autoplay]);

  /** Tourne par le chemin le plus court jusqu'à la carte `i`. */
  const goTo = (i: number) => {
    let delta = (i - active) % count;
    if (delta > count / 2) delta -= count;
    if (delta < -count / 2) delta += count;
    setPosition((p) => p + delta);
  };

  return (
    <div
      role="region"
      aria-roledescription="carrousel"
      aria-label={label}
      onPointerEnter={() => setInteracting(true)}
      onPointerLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setInteracting(false);
      }}
    >
      <div className="carousel-scene">
        <ul
          className="carousel-ring"
          style={
            {
              "--radius": `calc(var(--card-w) * ${radiusFactor.toFixed(4)} + 1.5rem)`,
              transform: `translateZ(calc(var(--radius) * -1)) rotateY(${-position * step}deg)`,
            } as CSSProperties
          }
        >
          {slides.map((slide, i) => (
            <li
              key={slide.href}
              aria-roledescription="diapositive"
              aria-label={`${i + 1} sur ${count} : ${slide.title}`}
              data-active={i === active || undefined}
              className="carousel-card"
              style={{ transform: `rotateY(${i * step}deg) translateZ(var(--radius))` }}
            >
              <Link
                href={slide.href}
                onFocus={() => goTo(i)}
                className="group relative block h-full overflow-hidden rounded-2xl bg-ink shadow-[0_30px_60px_-25px_rgba(27,42,47,0.7)]"
              >
                {slide.src && (
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(min-width: 640px) 272px, 208px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <span className="absolute inset-0 bg-linear-to-t from-ink/90 via-ink/20 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <span className="block text-xs font-semibold tracking-widest text-sun uppercase">
                    {slide.subtitle}
                  </span>
                  <span className="mt-1 block font-display text-2xl font-semibold">{slide.title}</span>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm text-paper/90">
                    Découvrir
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <CarouselButton label="Destination précédente" onClick={() => setPosition((p) => p - 1)}>
          <path d="M12.5 4l-6 6 6 6" />
        </CarouselButton>
        <CarouselButton
          label={paused ? "Reprendre la rotation automatique" : "Mettre en pause la rotation automatique"}
          onClick={() => setPaused((v) => !v)}
          hidden={reduced}
        >
          {paused ? <path d="M7 4.5v11l9-5.5z" /> : <path d="M7 4.5v11M13 4.5v11" />}
        </CarouselButton>
        <CarouselButton label="Destination suivante" onClick={() => setPosition((p) => p + 1)}>
          <path d="M7.5 4l6 6-6 6" />
        </CarouselButton>
      </div>
      <ol className="mt-4 flex justify-center gap-2" aria-label="Choisir une destination">
        {slides.map((slide, i) => (
          <li key={slide.href}>
            <button
              type="button"
              onClick={() => goTo(i)}
              aria-current={i === active || undefined}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                i === active ? "w-8 bg-terracotta" : "w-2.5 bg-sand-deep hover:bg-ink-soft"
              }`}
            >
              <span className="sr-only">{slide.title}</span>
            </button>
          </li>
        ))}
      </ol>
      <p className="sr-only" aria-live={autoplay ? "off" : "polite"}>
        {slides[active].title}
      </p>
    </div>
  );
}

function CarouselButton({
  label,
  onClick,
  hidden,
  children,
}: {
  label: string;
  onClick: () => void;
  hidden?: boolean;
  children: ReactNode;
}) {
  if (hidden) return null;
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-sand-deep bg-white text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-terracotta hover:text-terracotta motion-reduce:hover:translate-y-0"
    >
      <span className="sr-only">{label}</span>
      <svg
        viewBox="0 0 20 20"
        aria-hidden="true"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
    </button>
  );
}
