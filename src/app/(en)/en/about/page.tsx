import type { Metadata } from "next";
import Link from "next/link";
import { TextPage } from "@/components/TextPage";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  lang: "en",
  languages: { fr: "/a-propos", en: "/en/about" },
  title: "About us",
  description: `Who we are and how we work: the editorial approach behind ${siteConfig.name}, practical and honest travel guides to help you prepare your trip to Morocco.`,
  path: "/en/about",
  ogImagePath: "/en/share-image.png",
});

export default function AboutPage() {
  return (
    <TextPage
      lang="en"
      title="About us"
      path="/en/about"
      eyebrow={siteConfig.name}
      intro={`${siteConfig.name} helps travellers prepare their stay in Morocco with practical, clear and honest guides.`}
    >
      <h2>Our mission</h2>
      <p>
        To give you the keys to organise your trip: choose your stops, prepare your paperwork, understand local customs
        and make the most of every city, without unrealistic promises.
      </p>

      <h2>Our editorial approach</h2>
      <ul>
        <li>
          <strong>Information you can check.</strong> For anything that changes often (entry requirements, opening
          hours, prices) we point to official sources rather than give figures that would soon be out of date.
        </li>
        <li>
          <strong>Dated articles.</strong> Each guide shows its publication date and, where relevant, when it was last
          updated.
        </li>
        <li>
          <strong>Clear independence.</strong> If an article contains partner links, this is clearly indicated.
        </li>
        <li>
          <strong>No fake reviews.</strong> We never publish invented testimonials or fictitious ratings.
        </li>
      </ul>

      <h2>Languages</h2>
      <p>
        The site is written in French and many guides are also available in English. The{" "}
        <Link href="/" hrefLang="fr" lang="fr">
          French version
        </Link>{" "}
        includes additional guides and our destination pages.
      </p>

      <h2>Contact us</h2>
      <p>
        Found a mistake, have a suggestion or a partnership proposal? Get in touch via our{" "}
        <Link href="/en/contact">contact page</Link>.
      </p>
    </TextPage>
  );
}
