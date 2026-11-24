"use client";

import { type PointerEvent, type ReactNode, useRef } from "react";

/**
 * Effet de profondeur : les éléments `.parallax-layer` se déplacent plus ou
 * moins selon leur `--depth` quand la souris bouge. Désactivé au toucher et
 * si l'utilisateur a demandé à réduire les animations.
 */
export function Parallax({
  children,
  className = "",
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const frame = useRef(0);

  function onMove(e: PointerEvent<HTMLElement>) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    // De -1 à 1 depuis le centre de la zone.
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--px", x.toFixed(3));
      el.style.setProperty("--py", y.toFixed(3));
    });
  }

  function onLeave() {
    cancelAnimationFrame(frame.current);
    ref.current?.style.setProperty("--px", "0");
    ref.current?.style.setProperty("--py", "0");
  }

  return (
    <section
      ref={ref}
      aria-labelledby={labelledBy}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`parallax ${className}`}
    >
      {children}
    </section>
  );
}
