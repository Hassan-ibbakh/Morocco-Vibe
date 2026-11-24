import type { Guide } from "@/lib/types";

const guide: Guide = {
  slug: "essaouira-week-end",
  title: "Un week-end à Essaouira : exemple de programme sur deux jours",
  description:
    "Remparts, médina, port et plage : un exemple de programme de deux jours à Essaouira, à adapter selon votre rythme et la météo.",
  intro:
    "Essaouira se découvre facilement en deux jours. Ce programme est une trame à personnaliser, pensée pour alterner visites et moments de détente au bord de l'océan.",
  category: "itineraires",
  destination: "essaouira",
  publishedAt: "2026-11-05",
  cover: {
    alt: "Bateaux de pêche bleus amarrés dans le port d'Essaouira",
  },
  sections: [
    {
      id: "jour-1",
      title: "Jour 1 : médina et remparts",
      blocks: [
        {
          type: "p",
          text: "Consacrez la première journée à la médina, à ses ateliers d'artisans et à la promenade sur les remparts face à l'océan. Terminez par le coucher du soleil sur l'Atlantique.",
        },
      ],
    },
    {
      id: "jour-2",
      title: "Jour 2 : port et plage",
      blocks: [
        {
          type: "p",
          text: "Le matin, le port de pêche est au cœur de l'activité de la ville. L'après-midi, rejoignez la plage pour une promenade ou une initiation aux sports de glisse auprès d'une école déclarée.",
        },
        {
          type: "affiliate",
          partner: "hebergement",
          url: "https://exemple.invalid/essaouira",
          label: "Comparer les hébergements à Essaouira",
          description:
            "Exemple de lien partenaire : il ne s'affiche qu'une fois le partenaire configuré.",
        },
      ],
    },
    {
      id: "adapter",
      title: "Adapter le programme",
      blocks: [
        {
          type: "tip",
          text: "Le vent peut être soutenu : gardez une couche coupe-vent à portée de main et prévoyez une activité à l'abri en cas de journée très venteuse. Plus d'informations sur [notre fiche Essaouira](/destinations/essaouira).",
        },
      ],
    },
  ],
  demo: true,
};

export default guide;
