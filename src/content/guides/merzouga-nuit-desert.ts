import type { Guide } from "@/lib/types";
import { photo } from "@/content/photos";

const guide: Guide = {
  slug: "merzouga-nuit-desert",
  title: "Merzouga : préparer une nuit dans le désert",
  description:
    "Choisir son prestataire, s'équiper pour le chaud et le froid, respecter le désert : l'essentiel pour préparer une nuit en campement près de Merzouga.",
  intro:
    "Passer une nuit dans les dunes de l'erg Chebbi est souvent un temps fort d'un voyage au Maroc. Une bonne préparation fait la différence entre une expérience magique et une nuit inconfortable.",
  category: "preparer",
  destination: "merzouga",
  publishedAt: "2026-11-10",
  cover: {
    ...photo("merzouga-nuit-desert"),
    alt: "Tentes blanches d'un campement au pied des dunes près de Merzouga",
  },
  sections: [
    {
      id: "prestataire",
      title: "Choisir son prestataire",
      blocks: [
        {
          type: "list",
          items: [
            "Privilégier un prestataire déclaré, recommandé par votre hébergement ou bien évalué sur plusieurs sources.",
            "Demander par écrit ce qui est inclus : transport, repas, type de tente, sanitaires, activités.",
            "Vérifier les conditions d'annulation et ce qui est prévu en cas de météo défavorable.",
          ],
        },
      ],
    },
    {
      id: "equipement",
      title: "S'équiper pour le chaud et le froid",
      blocks: [
        {
          type: "p",
          text: "Les écarts de température entre le jour et la nuit peuvent être importants. Le jour, protégez-vous du soleil ; le soir, prévoyez une couche chaude.",
        },
        {
          type: "list",
          items: [
            "Chapeau ou foulard, lunettes de soleil et crème solaire.",
            "Eau en quantité suffisante.",
            "Une polaire ou une veste chaude pour la nuit.",
            "Une lampe frontale.",
            "Un petit sac pour protéger le téléphone et l'appareil photo du sable.",
          ],
        },
      ],
    },
    {
      id: "respecter",
      title: "Respecter le désert",
      blocks: [
        {
          type: "warning",
          title: "Ne rien laisser derrière soi",
          text: "Rapportez vos déchets et restez sur les pistes indiquées par votre guide, pour votre sécurité comme pour la préservation des dunes.",
        },
      ],
    },
    {
      id: "integrer",
      title: "L'intégrer à un circuit",
      blocks: [
        {
          type: "p",
          text: "Merzouga est éloigné des grandes villes : comptez de longs trajets et ne les sous-estimez pas dans votre planning. Retrouvez d'autres repères sur [notre fiche Merzouga](/destinations/merzouga).",
        },
      ],
    },
  ],
  keyTips: [
    "Demandez par écrit ce qui est inclus dans l'excursion.",
    "Prévoyez protection solaire le jour et couche chaude la nuit.",
    "Ne laissez aucun déchet dans les dunes.",
  ],
  featured: true,
  demo: true,
};

export default guide;
