import type { Guide } from "@/lib/types";

const guide: Guide = {
  slug: "usages-savoir-vivre-maroc",
  title: "Usages et savoir-vivre au Maroc : les bons réflexes",
  description:
    "Tenue, photos, négociation, ramadan : les usages à connaître pour voyager au Maroc avec respect et vivre de meilleures rencontres.",
  intro:
    "Connaître quelques usages simples facilite les échanges et montre du respect envers vos hôtes. Voici les réflexes les plus utiles pour un premier voyage au Maroc.",
  category: "pratique",
  publishedAt: "2026-09-30",
  cover: {
    alt: "Service de thé à la menthe sur un plateau ciselé",
  },
  sections: [
    {
      id: "tenue",
      title: "Adapter sa tenue",
      blocks: [
        {
          type: "p",
          text: "Des vêtements couvrant les épaules et les genoux sont appréciés, en particulier hors des quartiers touristiques, dans les villages et pour visiter des lieux religieux lorsque c'est autorisé.",
        },
      ],
    },
    {
      id: "photos",
      title: "Photographier avec respect",
      blocks: [
        {
          type: "p",
          text: "Demandez toujours l'autorisation avant de photographier une personne et acceptez un refus. Certaines personnes demandent une contrepartie : à vous de décider avant de prendre la photo.",
        },
      ],
    },
    {
      id: "negocier",
      title: "Négocier dans les souks",
      blocks: [
        {
          type: "list",
          items: [
            "La négociation fait partie de l'échange : restez courtois et souriant.",
            "Ne commencez à négocier que si l'objet vous intéresse vraiment.",
            "Fixez-vous un prix maximal à l'avance et n'hésitez pas à remercier et à partir.",
          ],
        },
      ],
    },
    {
      id: "ramadan",
      title: "Voyager pendant le ramadan",
      blocks: [
        {
          type: "p",
          text: "Pendant le mois de ramadan, de nombreux Marocains jeûnent du lever au coucher du soleil. Évitez de manger, boire ou fumer ostensiblement dans la rue en journée, et attendez-vous à des horaires adaptés dans certains commerces et services. Les dates changent chaque année : vérifiez-les avant de partir.",
        },
        {
          type: "tip",
          text: "Pour le reste de vos préparatifs, consultez [notre checklist avant le départ](/guides/checklist-avant-depart).",
        },
      ],
    },
  ],
  keyTips: [
    "Adoptez une tenue couvrante hors des zones touristiques.",
    "Demandez avant de photographier quelqu'un.",
    "Négociez avec le sourire et un prix maximal en tête.",
  ],
  demo: true,
};

export default guide;
