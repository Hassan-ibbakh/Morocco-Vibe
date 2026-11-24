import type { Guide } from "@/lib/types";

const guide: Guide = {
  slug: "marrakech-se-reperer-medina",
  title: "Marrakech : se repérer et circuler dans la médina",
  description:
    "Cartes hors ligne, points de repère, rythme de visite : des conseils concrets pour circuler sereinement dans la médina de Marrakech.",
  intro:
    "La médina de Marrakech est un réseau dense de ruelles où il est facile de perdre le nord. Quelques réflexes simples permettent d'en profiter sans stress.",
  category: "pratique",
  destination: "marrakech",
  publishedAt: "2026-10-28",
  cover: {
    alt: "Passage couvert d'un souk avec des étals de lanternes",
  },
  sections: [
    {
      id: "avant-partir",
      title: "Avant de partir",
      blocks: [
        {
          type: "list",
          items: [
            "Télécharger une carte hors ligne de la ville.",
            "Enregistrer l'adresse et la position de votre hébergement.",
            "Demander à votre hébergement comment le rejoindre depuis un point facile à trouver.",
          ],
        },
      ],
    },
    {
      id: "points-de-repere",
      title: "Prendre des points de repère",
      blocks: [
        {
          type: "p",
          text: "Repérez quelques lieux faciles à identifier — une grande place, une porte de la médina, un monument — et situez-vous par rapport à eux plutôt que de suivre la carte rue par rue.",
        },
        {
          type: "tip",
          title: "Si vous êtes perdu",
          text: "Demandez votre chemin dans un commerce ou à votre hébergement plutôt que d'accepter un guidage improvisé dans la rue.",
        },
      ],
    },
    {
      id: "rythme",
      title: "Trouver son rythme",
      blocks: [
        {
          type: "p",
          text: "L'animation de la médina peut être intense. Alternez les moments dans les souks avec des pauses dans un jardin ou sur une terrasse. Pour des idées de visites, consultez [notre fiche sur Marrakech](/destinations/marrakech).",
        },
      ],
    },
  ],
  keyTips: [
    "Une carte hors ligne est indispensable.",
    "Repérez-vous par rapport à quelques grands repères.",
    "Prévoyez des pauses au calme.",
  ],
  demo: true,
};

export default guide;
