import Image from "next/image";
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
  showPlaceholderLabel?: boolean;
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
  showPlaceholderLabel,
}: Props) {
  return (
    <div className={`relative overflow-hidden bg-sand ${className}`}>
      {image.src ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          preload={preload}
          className="object-cover"
        />
      ) : (
        <PlaceholderArt seed={seed} palette={palette} showLabel={showPlaceholderLabel} />
      )}
    </div>
  );
}
