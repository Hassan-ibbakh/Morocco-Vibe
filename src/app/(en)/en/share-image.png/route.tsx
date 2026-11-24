import { renderOgImage } from "@/lib/og";

/**
 * Visuel de partage de la version anglaise (1200×630), à une adresse fixe :
 * dans un groupe de routes, un fichier `opengraph-image` recevrait un suffixe.
 */
export function GET() {
  return renderOgImage({
    title: "Plan your trip to Morocco, one city at a time.",
    tagline: "Practical guides for travelling in Morocco",
  });
}
