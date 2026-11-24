import Image from "next/image";
import { ViewTransition } from "react";
import { PlaceholderArt } from "@/components/PlaceholderArt";
import type { ImageRef } from "@/lib/types";

type Props = {
  image: ImageRef;
  seed: string;
  palette?: [string, string, string];
  /** Attribut `sizes` de next/image, pour servir la bonne résolution. */
  sizes: string;
  /** À activer uniquement pour l'image principale visible au chargement (LCP). */
  preload?: boolean;
  className?: string;
  /** Classes de l'image elle-même (ex. zoom au survol d'une carte). */
  imgClassName?: string;
  showPlaceholderLabel?: boolean;
  /**
   * Nom de transition partagé : la même image « se déplace » de la carte vers
   * la page de détail (View Transitions API, ignoré si non supporté).
   * Doit être unique sur la page.
   */
  transitionName?: string;
};

/**
 * Image de couverture dans un cadre au ratio fixe (pas de décalage de mise
 * en page). Avec `image.src`, l'image est optimisée par next/image (AVIF/WebP,
 * tailles adaptées) ; sans, une illustration de remplacement est affichée.
 */
export function CoverImage({
  image,
  seed,
  palette,
  sizes,
  preload,
  className = "aspect-[4/3]",
  imgClassName = "",
  showPlaceholderLabel,
  transitionName,
}: Props) {
  const frame = (
    <div className={`relative overflow-hidden bg-sand ${className}`}>
      {image.src ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          preload={preload}
          className={`object-cover ${imgClassName}`}
        />
      ) : (
        <PlaceholderArt seed={seed} palette={palette} showLabel={showPlaceholderLabel} />
      )}
    </div>
  );
  return transitionName ? <ViewTransition name={transitionName}>{frame}</ViewTransition> : frame;
}
