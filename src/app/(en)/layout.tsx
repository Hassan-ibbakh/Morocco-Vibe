import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { googleSiteVerification, isIndexable, siteConfig } from "@/config/site";
import { fontClasses } from "@/lib/fonts";
import "../globals.css";

const TAGLINE = "Practical guides for travelling in Morocco";

/** Layout racine des pages en anglais (adresses sous /en). */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${TAGLINE}`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Practical guides, sightseeing ideas and reliable tips to plan your trip to Morocco: imperial cities, the Atlantic coast, the mountains and the desert.",
  applicationName: siteConfig.name,
  openGraph: { type: "website", siteName: siteConfig.name, locale: "en_GB" },
  twitter: { card: "summary_large_image" },
  icons: { apple: "/logo.png" },
  ...(googleSiteVerification ? { verification: { google: googleSiteVerification } } : {}),
  robots: isIndexable
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } }
    : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#faf6ef",
};

export default function EnglishRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontClasses}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#content"
          className="sr-only z-50 rounded-full bg-ink px-5 py-3 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader lang="en" />
        <main id="content" className="flex-1">
          {children}
        </main>
        <SiteFooter lang="en" />
      </body>
    </html>
  );
}
