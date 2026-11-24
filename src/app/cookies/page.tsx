import type { Metadata } from "next";
import Link from "next/link";
import { TextPage, ToFill } from "@/components/TextPage";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Cookies",
  description: `Politique relative aux cookies de ${siteConfig.name} : le site ne dépose actuellement aucun cookie publicitaire ni de mesure d'audience.`,
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <TextPage
      title="Cookies"
      path="/cookies"
      intro="Le site ne dépose actuellement aucun cookie publicitaire ni de mesure d'audience. C'est pourquoi aucun bandeau de consentement n'est affiché."
    >
      <h2>Situation actuelle</h2>
      <p>
        {siteConfig.name} ne dépose aucun cookie de suivi, de mesure d&apos;audience ou de publicité. Seuls
        des mécanismes strictement nécessaires au fonctionnement technique du site peuvent être utilisés
        par notre hébergeur ; ils ne nécessitent pas votre consentement.
      </p>

      <h2>Si cela change</h2>
      <p>
        Si nous ajoutons un jour un outil de mesure d&apos;audience, de la publicité ou des contenus tiers
        déposant des cookies non essentiels, nous vous demanderons votre accord au préalable, via un outil
        de gestion du consentement, et cette page sera mise à jour.
      </p>
      <p>
        <ToFill>liste des cookies, finalités et durées le jour où des cookies non essentiels seront ajoutés</ToFill>
      </p>

      <h2>Liens partenaires</h2>
      <p>
        Lorsque vous cliquez sur un lien partenaire, le site du partenaire peut déposer ses propres cookies,
        selon sa propre politique. Voir notre <Link href="/transparence">politique d&apos;affiliation</Link>.
      </p>
    </TextPage>
  );
}
