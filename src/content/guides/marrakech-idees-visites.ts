import type { Guide } from "@/lib/types";
import { photo } from "@/content/photos";

const guide: Guide = {
  slug: "marrakech-idees-visites",
  title: "Que faire à Marrakech : idées de visites selon vos envies",
  description:
    "Souks, jardins, palais, excursions vers l'Atlas : des idées de visites à Marrakech pour composer un séjour équilibré selon vos centres d'intérêt.",
  intro:
    "Marrakech offre des expériences très variées. Plutôt qu'une liste exhaustive, voici des pistes classées par envie pour composer votre propre programme.",
  category: "que-faire",
  destination: "marrakech",
  publishedAt: "2026-10-15",
  cover: {
    ...photo("marrakech-idees-visites"),
    alt: "Bassin, plantes et pots colorés du jardin Majorelle à Marrakech",
  },
  sections: [
    {
      id: "patrimoine",
      title: "Pour le patrimoine",
      blocks: [
        {
          type: "p",
          text: "Palais, médersas et monuments témoignent de l'histoire de la ville. Vérifiez les conditions de visite de chaque site, certains lieux religieux n'étant pas ouverts aux non-musulmans.",
        },
      ],
    },
    {
      id: "nature",
      title: "Pour respirer",
      blocks: [
        {
          type: "p",
          text: "Les jardins de la ville sont de vraies parenthèses de calme. Visitez-les de préférence aux heures les plus fraîches de la journée.",
        },
      ],
    },
    {
      id: "excursions",
      title: "Pour sortir de la ville",
      blocks: [
        {
          type: "p",
          text: "Les montagnes de l'Atlas sont accessibles en excursion. Choisissez un prestataire déclaré, renseignez-vous sur la durée réelle des trajets et sur les conditions météo en altitude.",
        },
        {
          type: "warning",
          text: "En montagne, les conditions peuvent changer rapidement. Emportez une couche chaude, même si la ville est ensoleillée.",
        },
      ],
    },
    {
      id: "pratique",
      title: "Avant de vous lancer",
      blocks: [
        {
          type: "p",
          text: "Pour circuler sereinement dans les ruelles, lisez notre guide [se repérer dans la médina](/guides/marrakech-se-reperer-medina).",
        },
      ],
    },
  ],
  demo: true,
};

export default guide;
