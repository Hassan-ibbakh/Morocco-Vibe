import type { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    slug: "preparer",
    name: "Préparer son voyage",
    description:
      "Formalités, saisons, réservations : les étapes à anticiper avant le départ.",
  },
  {
    slug: "itineraires",
    name: "Itinéraires",
    description: "Des idées de parcours jour par jour, à adapter à votre rythme.",
  },
  {
    slug: "que-faire",
    name: "Que faire",
    description: "Quartiers, visites et expériences pour organiser vos journées.",
  },
  {
    slug: "pratique",
    name: "Sur place",
    description: "Se déplacer, se repérer et voyager sereinement une fois arrivé.",
  },
  {
    slug: "budget",
    name: "Budget et astuces",
    description: "Méthodes pour estimer, suivre et maîtriser vos dépenses de voyage.",
  },
];
