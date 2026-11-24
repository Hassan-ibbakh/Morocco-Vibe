import type { Metadata } from "next";
import Link from "next/link";
import { TextPage, ToFill } from "@/components/TextPage";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Politique de confidentialité",
  description: `Quelles données personnelles ${siteConfig.name} collecte-t-il, pourquoi et quels sont vos droits ?`,
  path: "/confidentialite",
});

export default function PrivacyPage() {
  return (
    <TextPage
      title="Politique de confidentialité"
      path="/confidentialite"
      intro="Nous collectons le moins de données possible. Cette page décrit la situation actuelle du site."
    >
      <p role="note">
        <ToFill>
          mettez cette page à jour avant d&apos;ajouter un outil de mesure d&apos;audience, une newsletter, un
          formulaire ou de la publicité. Faites-la relire si nécessaire.
        </ToFill>
      </p>

      <h2>Responsable du traitement</h2>
      <p>
        <ToFill>nom de l&apos;éditeur et coordonnées</ToFill> — voir les{" "}
        <Link href="/mentions-legales">mentions légales</Link>.
      </p>

      <h2>Données collectées aujourd&apos;hui</h2>
      <ul>
        <li>
          <strong>Aucun compte, aucun formulaire, aucun outil d&apos;analyse ni de publicité</strong> n&apos;est
          actif sur le site à ce jour.
        </li>
        <li>
          <strong>Journaux techniques de l&apos;hébergeur :</strong> comme tout site web, notre hébergeur
          (Vercel) traite des données techniques (adresse IP, navigateur, pages demandées) pour assurer le
          fonctionnement et la sécurité du service.
        </li>
        <li>
          <strong>E-mails :</strong> si vous nous écrivez, nous utilisons votre adresse et votre message
          uniquement pour vous répondre.
        </li>
      </ul>

      <h2>Durée de conservation</h2>
      <p>
        <ToFill>durée de conservation des e-mails et des journaux</ToFill>
      </p>

      <h2>Vos droits</h2>
      <p>
        Selon la réglementation applicable (notamment le RGPD pour les personnes situées dans l&apos;Union
        européenne, et la loi marocaine n° 09-08 au Maroc), vous pouvez demander l&apos;accès, la rectification ou
        la suppression de vos données en nous écrivant via la <Link href="/contact">page contact</Link>.
        Vous pouvez également saisir l&apos;autorité de protection des données compétente.
      </p>

      <h2>Cookies</h2>
      <p>
        Voir notre <Link href="/cookies">politique relative aux cookies</Link>.
      </p>
    </TextPage>
  );
}
