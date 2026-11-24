import type { Metadata } from "next";
import { PhotoCreditsList } from "@/components/PhotoCreditsList";
import { TextPage } from "@/components/TextPage";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Crédits photos",
  description: `Auteurs, licences et sources des photos utilisées sur ${siteConfig.name}. Toutes sont publiées sous licence libre (Creative Commons ou domaine public).`,
  path: "/credits",
  languages: { fr: "/credits", en: "/en/credits" },
});

export default function CreditsPage() {
  return (
    <TextPage
      title="Crédits photos"
      path="/credits"
      intro="Merci aux photographes qui publient leurs images sous licence libre. Chaque photo est utilisée dans le respect de sa licence."
    >
      <p>
        Les photos sous licence CC BY-SA restent sous cette même licence : vous pouvez les réutiliser en citant leur
        auteur et en conservant la licence. Les photos sous CC0 sont dans le domaine public.
      </p>
      <PhotoCreditsList lang="fr" />
    </TextPage>
  );
}
