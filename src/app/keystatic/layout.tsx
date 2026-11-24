import type { Metadata } from "next";
import KeystaticApp from "./keystatic";

/** Page d'administration rendue à la demande (jamais pré-générée). */
export const instant = false;

export const metadata: Metadata = {
  title: { absolute: "Administration — Morocco Vibe" },
  robots: { index: false, follow: false },
};

/**
 * Tableau de bord d'administration (/keystatic). L'en-tête et le pied de page
 * du site sont masqués par CSS dès que `.admin-root` est présent (globals.css).
 */
export default function KeystaticLayout() {
  return (
    <div className="admin-root min-h-dvh">
      <KeystaticApp />
    </div>
  );
}
