import type { Guide } from "@/lib/types";
import { photo } from "@/content/photos";

const guide: Guide = {
  slug: "itineraire-une-semaine-maroc",
  title: "Une semaine au Maroc : deux exemples d'itinéraires",
  description:
    "Villes impériales ou ville rouge et océan : deux exemples d'itinéraires d'une semaine au Maroc, à adapter selon vos envies et vos moyens de transport.",
  intro:
    "En une semaine, mieux vaut choisir une région que vouloir tout voir. Voici deux trames d'itinéraires qui limitent les longs trajets, à adapter à votre rythme.",
  category: "itineraires",
  publishedAt: "2026-11-02",
  cover: {
    ...photo("itineraire-une-semaine-maroc"),
    alt: "Montagnes arides et vallée verdoyante au col du Tizi n'Tichka, dans le Haut Atlas",
  },
  sections: [
    {
      id: "principe",
      title: "Le principe : peu d'étapes, plus de temps",
      blocks: [
        {
          type: "p",
          text: "Les distances au Maroc sont importantes. Avant de fixer votre itinéraire, vérifiez les temps de trajet réels auprès des transporteurs ou sur un calculateur d'itinéraire, et gardez au moins deux nuits par étape.",
        },
      ],
    },
    {
      id: "nord",
      title: "Option 1 : Fès et Chefchaouen",
      blocks: [
        {
          type: "p",
          text: "Une semaine centrée sur le nord, avec la médina de Fès puis le calme de la ville bleue.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "**Fès** : plusieurs jours pour la médina, dont une première visite guidée. Voir [nos conseils pour Fès](/guides/fes-premiere-visite-medina).",
            "**Chefchaouen** : quelques jours pour flâner et randonner. Voir [que faire à Chefchaouen](/guides/chefchaouen-que-faire).",
          ],
        },
      ],
    },
    {
      id: "sud",
      title: "Option 2 : Marrakech et Essaouira",
      blocks: [
        {
          type: "p",
          text: "Une semaine qui combine l'énergie de la ville rouge et l'air de l'Atlantique.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "**Marrakech** : médina, jardins et souks. Voir [nos idées de visites](/guides/marrakech-idees-visites).",
            "**Essaouira** : remparts, port et plage. Voir [notre programme sur deux jours](/guides/essaouira-week-end).",
          ],
        },
        {
          type: "tip",
          title: "Et le désert ?",
          text: "Une excursion vers Merzouga depuis Marrakech implique de longs trajets. Sur une seule semaine, elle se fait au détriment d'autres étapes : lisez [nos conseils pour une nuit dans le désert](/guides/merzouga-nuit-desert) avant de décider.",
        },
      ],
    },
  ],
  featured: true,
  demo: true,
};

export default guide;
