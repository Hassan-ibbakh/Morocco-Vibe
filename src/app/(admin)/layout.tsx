import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  robots: { index: false, follow: false },
};

/** Layout racine du tableau de bord : Keystatic gère sa propre interface. */
export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
