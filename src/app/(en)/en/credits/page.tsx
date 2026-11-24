import type { Metadata } from "next";
import { PhotoCreditsList } from "@/components/PhotoCreditsList";
import { TextPage } from "@/components/TextPage";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  lang: "en",
  languages: { fr: "/credits", en: "/en/credits" },
  title: "Photo credits",
  description: `Authors, licences and sources of the photos used on ${siteConfig.name}. All are published under a free licence (Creative Commons or public domain).`,
  path: "/en/credits",
  ogImagePath: "/en/share-image.png",
});

export default function CreditsPage() {
  return (
    <TextPage
      lang="en"
      title="Photo credits"
      path="/en/credits"
      intro="Thanks to the photographers who publish their images under free licences. Each photo is used in accordance with its licence."
    >
      <p>
        Photos under a CC BY-SA licence remain under the same licence: you may reuse them by crediting their author and
        keeping the licence. Photos under CC0 are in the public domain.
      </p>
      <PhotoCreditsList lang="en" />
    </TextPage>
  );
}
