import type { Guide } from "@/lib/types";

const guide: Guide = {
  slug: "checklist-avant-depart",
  title: "Préparer un voyage au Maroc : la checklist avant le départ",
  description:
    "Documents, santé, argent, réservations : une checklist pratique pour préparer votre voyage au Maroc et vérifier les points clés avant de partir.",
  intro:
    "Un voyage réussi au Maroc se joue souvent dans les semaines qui précèdent le départ. Cette checklist rassemble les vérifications à faire pour partir l'esprit tranquille.",
  category: "preparer",
  publishedAt: "2026-11-12",
  cover: {
    alt: "Passeport, carnet et carte du Maroc posés sur une table",
  },
  sections: [
    {
      id: "documents",
      title: "Documents de voyage",
      blocks: [
        {
          type: "p",
          text: "Commencez par les documents : ce sont eux qui demandent le plus de délai en cas de renouvellement ou de démarche à effectuer.",
        },
        {
          type: "list",
          items: [
            "Vérifier la date de validité du passeport et la durée de validité exigée à l'entrée au Maroc pour votre nationalité.",
            "Consulter les conditions d'entrée (visa éventuel, durée de séjour autorisée) sur le site officiel de votre ministère des Affaires étrangères ou du consulat du Maroc.",
            "Enregistrer une copie numérique des documents dans un espace sécurisé accessible hors ligne.",
            "Vérifier la validité de votre permis de conduire si vous prévoyez de louer un véhicule.",
          ],
        },
        {
          type: "warning",
          title: "Sources officielles uniquement",
          text: "Les règles d'entrée évoluent. Fiez-vous aux sites gouvernementaux plutôt qu'aux forums ou aux articles anciens, y compris celui-ci.",
        },
      ],
    },
    {
      id: "sante-assurance",
      title: "Santé et assurance",
      blocks: [
        {
          type: "list",
          items: [
            "Consulter un professionnel de santé ou un centre de conseils aux voyageurs pour les recommandations sanitaires.",
            "Vérifier les garanties de votre assurance voyage ou de votre carte bancaire (rapatriement, frais médicaux, annulation).",
            "Préparer une petite trousse de base et emporter vos traitements habituels avec leur ordonnance.",
            "Prévoir une protection solaire adaptée, en particulier si vous allez dans le désert ou en montagne.",
          ],
        },
      ],
    },
    {
      id: "argent",
      title: "Argent et moyens de paiement",
      blocks: [
        {
          type: "p",
          text: "La monnaie du Maroc est le dirham marocain. Renseignez-vous auprès de votre banque sur les frais appliqués à l'étranger et sur les règles de change auprès de sources officielles. Emporter deux moyens de paiement distincts évite d'être bloqué en cas de perte. Pour estimer vos dépenses, voyez notre [méthode pour bâtir un budget de voyage](/guides/estimer-budget-voyage).",
        },
      ],
    },
    {
      id: "derniers-jours",
      title: "Les derniers jours",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "Télécharger les cartes hors ligne et les billets.",
            "Vérifier les règles de bagages de votre transporteur.",
            "Transmettre votre itinéraire à un proche.",
            "Relire nos conseils sur les [usages et le savoir-vivre au Maroc](/guides/usages-savoir-vivre-maroc).",
          ],
        },
        {
          type: "tip",
          title: "Astuce",
          text: "Gardez une liste type sur votre téléphone et améliorez-la après chaque voyage : elle deviendra vite votre meilleur outil.",
        },
      ],
    },
  ],
  keyTips: [
    "Commencez par les documents, qui demandent le plus de délai.",
    "Vérifiez les règles d'entrée sur des sites officiels.",
    "Emportez deux moyens de paiement distincts.",
  ],
  featured: true,
  demo: true,
};

export default guide;
