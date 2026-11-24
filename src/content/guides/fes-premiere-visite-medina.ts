import type { Guide } from "@/lib/types";

const guide: Guide = {
  slug: "fes-premiere-visite-medina",
  title: "Fès : réussir sa première visite de la médina",
  description:
    "Guide officiel, organisation des journées, artisanat : nos conseils pour découvrir sereinement la médina de Fès lors d'une première visite.",
  intro:
    "La médina de Fès est l'une des plus vastes et des plus anciennes du Maroc. Pour une première visite, un peu d'organisation permet de profiter de sa richesse sans s'y épuiser.",
  category: "que-faire",
  destination: "fes",
  publishedAt: "2026-11-08",
  cover: {
    alt: "Vue plongeante sur les toits serrés de la médina de Fès",
  },
  sections: [
    {
      id: "guide-officiel",
      title: "Se faire accompagner la première fois",
      blocks: [
        {
          type: "p",
          text: "La densité des ruelles rend une première découverte accompagnée très utile. Passez par votre hébergement ou un office de tourisme pour trouver un guide officiel, et convenez à l'avance de la durée, du parcours et du tarif.",
        },
        {
          type: "tip",
          title: "Visites de boutiques",
          text: "Si vous ne souhaitez pas faire d'achats, dites-le clairement au début de la visite : un bon guide adaptera le parcours.",
        },
      ],
    },
    {
      id: "organiser",
      title: "Organiser ses journées",
      blocks: [
        {
          type: "list",
          items: [
            "Explorer la médina par secteur plutôt que de chercher à tout voir en une journée.",
            "Commencer tôt, quand les ruelles sont plus calmes.",
            "Garder un après-midi libre pour revenir seul dans les quartiers qui vous ont plu.",
          ],
        },
      ],
    },
    {
      id: "artisanat",
      title: "Découvrir l'artisanat",
      blocks: [
        {
          type: "p",
          text: "Fès est réputée pour ses artisans : tanneurs, dinandiers, tisserands, céramistes. Observer leur travail est l'un des temps forts de la visite. Demandez avant de photographier un atelier ou un artisan.",
        },
      ],
    },
    {
      id: "pour-aller-plus-loin",
      title: "Pour aller plus loin",
      blocks: [
        {
          type: "p",
          text: "Les réflexes pour circuler dans une médina sont les mêmes d'une ville à l'autre : retrouvez-les dans notre guide [se repérer dans la médina de Marrakech](/guides/marrakech-se-reperer-medina), et découvrez [notre fiche sur Fès](/destinations/fes).",
        },
      ],
    },
  ],
  keyTips: [
    "Faites appel à un guide officiel pour la première visite.",
    "Explorez par secteur et commencez tôt.",
    "Demandez avant de photographier les artisans.",
  ],
  featured: true,
  demo: true,
};

export default guide;
