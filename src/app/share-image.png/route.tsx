import { renderOgImage } from "@/lib/og";

/** Visuel de partage par défaut du site (1200×630), généré au build. */
export function GET() {
  return renderOgImage({ title: "Préparez votre voyage au Maroc, ville après ville." });
}
