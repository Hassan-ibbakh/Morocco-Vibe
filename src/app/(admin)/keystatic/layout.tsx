import type { Metadata } from "next";
import KeystaticApp from "./keystatic";

/** Page d'administration rendue à la demande (jamais pré-générée). */
export const instant = false;

export const metadata: Metadata = {
  title: { absolute: "Administration — Morocco Vibe" },
  robots: { index: false, follow: false },
};

/** Tableau de bord d'administration (/keystatic), sans l'en-tête ni le pied de page du site. */
export default function KeystaticLayout() {
  return <KeystaticApp />;
}
