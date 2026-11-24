import type { Metadata, Viewport } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { googleSiteVerification, isIndexable, siteConfig } from "@/config/site";
import { fontClasses } from "@/lib/fonts";
import "../globals.css";

/** Layout racine des pages en français (adresses sans préfixe). */

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
  },
  twitter: { card: "summary_large_image" },
  icons: { apple: "/logo.png" },
  alternates: { types: { "application/rss+xml": [{ url: "/rss.xml", title: `${siteConfig.name} — guides` }] } },
  ...(googleSiteVerification ? { verification: { google: googleSiteVerification } } : {}),
  // Production : grandes vignettes autorisées (Google Discover, résultats enrichis).
  // Prévisualisations Vercel : jamais indexées.
  robots: isIndexable
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } }
    : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#faf6ef",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={fontClasses}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenu"
          className="sr-only z-50 rounded-full bg-ink px-5 py-3 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Aller au contenu
        </a>
        <SiteHeader lang="fr" />
        <main id="contenu" className="flex-1">
          {children}
        </main>
        <SiteFooter lang="fr" />
      </body>
    </html>
  );
}
