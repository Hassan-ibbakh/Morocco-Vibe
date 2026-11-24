import type { Metadata } from "next";
import Link from "next/link";
import { TextPage, ToFill } from "@/components/TextPage";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  lang: "en",
  languages: { fr: "/mentions-legales", en: "/en/legal-notice" },
  title: "Legal notice",
  description: `Legal notice for ${siteConfig.name}: publisher, director of publication, hosting provider, intellectual property and limitation of liability.`,
  path: "/en/legal-notice",
  ogImagePath: "/en/share-image.png",
});

export default function LegalNoticePage() {
  return (
    <TextPage lang="en" title="Legal notice" path="/en/legal-notice">
      <p>
        This is a translation provided for information. The reference version is the{" "}
        <Link href="/mentions-legales" hrefLang="fr" lang="fr">
          French legal notice
        </Link>
        .
      </p>

      <h2>Publisher</h2>
      <p>
        {siteConfig.name}
        <br />
        <ToFill lang="en">name or company name, legal form, address, registration number</ToFill>
        <br />
        Contact: {siteConfig.contactEmail || <ToFill lang="en">email address</ToFill>}
      </p>

      <h2>Director of publication</h2>
      <p>
        <ToFill lang="en">first name and surname</ToFill>
      </p>

      <h2>Hosting</h2>
      <p>
        Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, United States —{" "}
        <a href="https://vercel.com" rel="noopener noreferrer">
          vercel.com
        </a>
        .
      </p>

      <h2>Intellectual property</h2>
      <p>
        The texts and illustrations on this site are protected. Any reproduction without permission is prohibited,
        unless otherwise stated. Photo credits are shown below each image and on the{" "}
        <Link href="/en/credits">photo credits</Link> page.
      </p>

      <h2>Liability</h2>
      <p>
        The information published is provided for guidance only. As entry requirements, opening hours and prices may
        change, check them with official sources before you travel.
      </p>
    </TextPage>
  );
}
