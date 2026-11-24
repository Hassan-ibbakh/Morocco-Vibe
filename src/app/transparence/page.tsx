import type { Metadata } from "next";
import { TextPage } from "@/components/TextPage";
import { adsConfig, affiliatePartners } from "@/config/monetization";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Publicité et affiliation : notre politique de transparence",
  description: `Comment ${siteConfig.name} se finance : publicité, liens partenaires et contenus sponsorisés, et les règles que nous nous imposons.`,
  path: "/transparence",
});

export default function TransparencyPage() {
  const partners = Object.values(affiliatePartners);
  return (
    <TextPage
      title="Publicité et affiliation"
      path="/transparence"
      intro="Nous voulons que vous sachiez toujours qui finance ce que vous lisez."
    >
      <h2>Ce qui est actif aujourd&apos;hui</h2>
      <ul>
        <li>
          <strong>Publicité :</strong> {adsConfig.enabled ? "des emplacements publicitaires sont présents et signalés par la mention « Publicité »." : "aucune publicité n'est diffusée sur le site."}
        </li>
        <li>
          <strong>Liens partenaires :</strong>{" "}
          {partners.length
            ? `nous travaillons avec : ${partners.map((p) => p.name).join(", ")}.`
            : "aucun partenariat d'affiliation n'est actif."}
        </li>
      </ul>

      <h2>Nos règles</h2>
      <ul>
        <li>
          Les articles contenant des liens partenaires affichent une mention de transparence en tête de page,
          et chaque lien est signalé comme « lien partenaire ».
        </li>
        <li>
          Une commission éventuelle n&apos;entraîne aucun surcoût pour vous et n&apos;influence pas nos
          recommandations.
        </li>
        <li>Tout contenu sponsorisé est clairement identifié comme tel.</li>
        <li>Nous ne publions jamais de faux avis ni de témoignages inventés.</li>
        <li>
          Aucune publicité ni aucun traceur non essentiel ne sera activé sans votre consentement préalable
          lorsque celui-ci est requis.
        </li>
      </ul>
    </TextPage>
  );
}
