"use client";

import { type PointerEvent, type ReactNode, useRef } from "react";

/**
 * Inclinaison 3D qui suit la souris, avec un reflet lumineux.
 * - Uniquement à la souris (pas au toucher) et si l'utilisateur n'a pas
 *   demandé à réduire les animations.
 * - Aucun rendu React pendant le mouvement : seules des variables CSS sont
 *   mises à jour, une fois par image (requestAnimationFrame).
 */
export function Tilt({
  children,
  className = "",
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  /** Inclinaison maximale en degrés. */
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--tilt-x", `${((0.5 - y) * max * 2).toFixed(2)}deg`);
      el.style.setProperty("--tilt-y", `${((x - 0.5) * max * 2).toFixed(2)}deg`);
      el.style.setProperty("--glare-x", `${(x * 100).toFixed(1)}%`);
      el.style.setProperty("--glare-y", `${(y * 100).toFixed(1)}%`);
      el.dataset.tilting = "";
    });
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    el.style.removeProperty("--tilt-x");
    el.style.removeProperty("--tilt-y");
    delete el.dataset.tilting;
  }

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={`tilt ${className}`}>
      {children}
      <span aria-hidden="true" className="tilt-glare" />
    </div>
  );
}
