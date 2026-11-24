import type { Guide } from "@/lib/types";

const guide: Guide = {
  slug: "chefchaouen-que-faire",
  title: "Que faire à Chefchaouen : la ville bleue au rythme lent",
  description:
    "Médina bleue, points de vue, randonnées dans le Rif : des idées pour profiter de Chefchaouen en respectant le quotidien de ses habitants.",
  intro:
    "Chefchaouen invite à ralentir. Plutôt qu'une liste de sites, voici des idées pour organiser un séjour paisible dans la ville bleue et ses montagnes.",
  category: "que-faire",
  destination: "chefchaouen",
  publishedAt: "2026-10-25",
  cover: {
    alt: "Escaliers peints en bleu et pots de fleurs dans une ruelle de Chefchaouen",
  },
  sections: [
    {
      id: "medina",
      title: "Flâner dans la médina",
      blocks: [
        {
          type: "p",
          text: "La médina se découvre à pied, sans itinéraire précis. Les ruelles sont particulièrement agréables tôt le matin, avant l'arrivée des visiteurs venus pour la journée.",
        },
        {
          type: "warning",
          title: "Respecter les habitants",
          text: "Les ruelles bleues sont des lieux de vie. Ne vous installez pas sur les marches des maisons et demandez l'autorisation avant de photographier quelqu'un.",
        },
      ],
    },
    {
      id: "points-de-vue",
      title: "Profiter des points de vue",
      blocks: [
        {
          type: "p",
          text: "Plusieurs sentiers mènent à des hauteurs dominant la ville. La fin de journée offre une belle lumière ; emportez une lampe pour le retour.",
        },
      ],
    },
    {
      id: "randonnee",
      title: "Randonner dans le Rif",
      blocks: [
        {
          type: "p",
          text: "Les montagnes alentour se prêtent à la randonnée. Renseignez-vous sur l'itinéraire, la météo et la difficulté, et faites appel à un guide local si vous ne connaissez pas le terrain.",
        },
      ],
    },
    {
      id: "integrer",
      title: "L'intégrer à un circuit",
      blocks: [
        {
          type: "p",
          text: "Chefchaouen se combine souvent avec Fès. Découvrez un exemple dans notre [itinéraire d'une semaine au Maroc](/guides/itineraire-une-semaine-maroc).",
        },
      ],
    },
  ],
  demo: true,
};

export default guide;
