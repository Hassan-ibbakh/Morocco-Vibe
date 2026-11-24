import type { Metadata } from "next";
import { TextPage, ToFill } from "@/components/TextPage";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Mentions légales",
  description: `Mentions légales du site ${siteConfig.name} : éditeur, directeur de la publication et hébergeur.`,
  path: "/mentions-legales",
});

export default function LegalNoticePage() {
  return (
    <TextPage title="Mentions légales" path="/mentions-legales">
      <p role="note">
        <ToFill>
          les informations ci-dessous dépendent de votre statut (particulier, auto-entrepreneur, société) et
          du pays d&apos;établissement. Faites-les valider par un professionnel si nécessaire.
        </ToFill>
      </p>

      <h2>Éditeur du site</h2>
      <p>
        {siteConfig.name}
        <br />
        <ToFill>nom ou raison sociale, forme juridique, adresse, numéro d&apos;immatriculation</ToFill>
        <br />
        Contact : {siteConfig.contactEmail || <ToFill>adresse e-mail</ToFill>}
      </p>

      <h2>Directeur ou directrice de la publication</h2>
      <p>
        <ToFill>nom et prénom</ToFill>
      </p>

      <h2>Hébergement</h2>
      <p>
        Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis —{" "}
        <a href="https://vercel.com" rel="noopener noreferrer">
          vercel.com
        </a>
        . <ToFill>vérifiez ces coordonnées sur le site de Vercel au moment de la mise en ligne</ToFill>
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        Les textes et illustrations du site sont protégés. Toute reproduction sans autorisation est
        interdite, sauf mention contraire. Les crédits des photographies sont indiqués sous chaque image.
      </p>

      <h2>Responsabilité</h2>
      <p>
        Les informations publiées sont fournies à titre indicatif. Les formalités, horaires et tarifs
        pouvant évoluer, vérifiez-les auprès des sources officielles avant tout déplacement.
      </p>
    </TextPage>
  );
}
