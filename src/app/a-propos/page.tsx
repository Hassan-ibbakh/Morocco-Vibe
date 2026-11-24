import type { Metadata } from "next";
import Link from "next/link";
import { TextPage } from "@/components/TextPage";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "À propos : notre démarche éditoriale",
  description: `Qui sommes-nous et comment travaillons-nous ? La démarche éditoriale de ${siteConfig.name} pour des guides de voyage au Maroc fiables et utiles.`,
  path: "/a-propos",
});

export default function AboutPage() {
  return (
    <TextPage
      title="À propos"
      path="/a-propos"
      eyebrow={siteConfig.name}
      intro={`${siteConfig.name} aide les voyageurs à préparer leur séjour au Maroc avec des guides pratiques, clairs et honnêtes.`}
    >
      <h2>Notre mission</h2>
      <p>
        Vous donner les clés pour organiser votre voyage : choisir vos étapes, préparer vos formalités,
        comprendre les usages et profiter pleinement de chaque ville, sans promesses irréalistes.
      </p>

      <h2>Notre démarche éditoriale</h2>
      <ul>
        <li>
          <strong>Des informations vérifiables.</strong> Pour tout ce qui change souvent — formalités,
          horaires, tarifs — nous renvoyons vers les sources officielles plutôt que de donner des chiffres
          qui seraient vite dépassés.
        </li>
        <li>
          <strong>Des articles datés.</strong> Chaque guide indique sa date de publication et, le cas
          échéant, de mise à jour.
        </li>
        <li>
          <strong>Une indépendance affichée.</strong> Si un article contient des liens partenaires, une
          mention le signale clairement. Voir notre{" "}
          <Link href="/transparence">politique de publicité et d&apos;affiliation</Link>.
        </li>
        <li>
          <strong>Aucun faux avis.</strong> Nous ne publions ni témoignages inventés ni notes fictives.
        </li>
      </ul>

      <h2>L&apos;équipe</h2>
      <p>
        Les guides sont rédigés et relus par {siteConfig.editorialTeam.toLowerCase()} de {siteConfig.name}.
        {/* Présentez ici les auteurs : nom, parcours, lien avec le Maroc. */}
      </p>

      <h2>Nous contacter</h2>
      <p>
        Une erreur, une suggestion, une proposition de partenariat ? Écrivez-nous via la{" "}
        <Link href="/contact">page contact</Link>.
      </p>
    </TextPage>
  );
}
