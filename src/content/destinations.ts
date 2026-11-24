import type { Destination } from "@/lib/types";

/**
 * CONTENU D'EXEMPLE — à relire, compléter et vérifier avant publication.
 * Les textes restent volontairement généraux : aucun prix, horaire ou
 * chiffre n'est donné, car ces informations changent et doivent être
 * vérifiées auprès de sources officielles.
 * Une fois une fiche réécrite et vérifiée, retirez `demo: true`.
 */
export const destinations: Destination[] = [
  {
    slug: "marrakech",
    name: "Marrakech",
    country: "Maroc",
    region: "Marrakech-Safi",
    summary:
      "La ville rouge, où la médina historique côtoie jardins et quartiers modernes, au pied de l'Atlas.",
    intro: [
      "Marrakech mêle une médina ancienne, dense et animée, à des quartiers plus récents aux larges avenues. Les jardins offrent des pauses au calme entre deux visites.",
      "Prendre le temps de se repérer, accepter de se perdre un peu dans les ruelles et prévoir des moments de repos aident à profiter pleinement du séjour.",
    ],
    highlights: [
      "La médina, ses souks et ses ruelles",
      "Les jardins et palais ouverts à la visite",
      "La grande place animée au cœur de la médina",
      "Les excursions vers les montagnes de l'Atlas",
    ],
    practical: [
      {
        label: "Se repérer",
        text: "Téléchargez une carte hors ligne avant de partir : la médina est un dédale où les repères changent vite.",
      },
      {
        label: "Rythme",
        text: "Alternez les moments dans les souks avec des pauses au calme, surtout aux heures les plus chaudes.",
      },
      {
        label: "Formalités",
        text: "Les conditions d'entrée au Maroc dépendent de votre nationalité : consultez la page officielle « Conseils aux voyageurs » de votre pays.",
      },
    ],
    cover: {
      alt: "Ruelle ombragée d'un souk de la médina de Marrakech",
    },
    palette: ["#F4A259", "#BC4B51", "#5B8E7D"],
    featured: true,
    demo: true,
  },
  {
    slug: "fes",
    name: "Fès",
    country: "Maroc",
    region: "Fès-Meknès",
    summary:
      "Une ville impériale à la médina ancienne et très étendue, réputée pour son artisanat et son patrimoine.",
    intro: [
      "Fès abrite l'une des médinas les plus anciennes et les plus vastes du Maroc, inscrite au patrimoine mondial de l'UNESCO. Ses ruelles étroites, ses portes monumentales et ses ateliers d'artisans en font une étape marquante.",
      "La médina se visite à pied. Sa taille et la densité de ses ruelles rendent utile une première découverte accompagnée d'un guide officiel.",
    ],
    highlights: [
      "La médina historique et ses portes monumentales",
      "Les quartiers d'artisans et les tanneries",
      "Les médersas et leur décor de zellige et de bois sculpté",
      "Les points de vue sur la ville depuis les collines",
    ],
    practical: [
      {
        label: "Guide",
        text: "Pour une première visite, faites appel à un guide officiel, reconnaissable à son badge, par l'intermédiaire de votre hébergement ou d'un office de tourisme.",
      },
      {
        label: "Chaussures",
        text: "Les ruelles sont pavées, pentues par endroits et parfois glissantes : privilégiez des chaussures fermées et confortables.",
      },
      {
        label: "Usages",
        text: "Certains lieux religieux ne sont pas ouverts aux non-musulmans : respectez la signalétique à l'entrée.",
      },
    ],
    cover: {
      alt: "Porte monumentale ornée de zellige bleu à l'entrée de la médina de Fès",
    },
    palette: ["#E9C46A", "#2A6F97", "#1D3557"],
    featured: true,
    demo: true,
  },
  {
    slug: "chefchaouen",
    name: "Chefchaouen",
    country: "Maroc",
    region: "Tanger-Tétouan-Al Hoceïma",
    summary:
      "Une petite ville du Rif connue pour ses ruelles aux murs peints en bleu, nichée au pied des montagnes.",
    intro: [
      "Chefchaouen est une petite ville des montagnes du Rif, célèbre pour sa médina aux murs blanchis et peints de nuances de bleu.",
      "Son rythme plus calme et la proximité des sentiers de montagne en font une étape appréciée pour ralentir entre deux grandes villes.",
    ],
    highlights: [
      "La médina et ses ruelles bleues",
      "La place centrale et sa kasbah",
      "Les sentiers de randonnée dans les montagnes alentour",
      "Les points de vue sur la ville au coucher du soleil",
    ],
    practical: [
      {
        label: "Photos",
        text: "Les habitants vivent dans ces ruelles : demandez toujours l'autorisation avant de photographier une personne ou l'entrée d'une maison.",
      },
      {
        label: "Randonnée",
        text: "Pour les randonnées, renseignez-vous sur l'itinéraire et la météo, et faites appel à un guide local si vous ne connaissez pas le terrain.",
      },
      {
        label: "Relief",
        text: "La ville est construite à flanc de montagne : prévoyez des montées et des escaliers.",
      },
    ],
    cover: {
      alt: "Ruelle aux murs bleus et aux marches peintes dans la médina de Chefchaouen",
    },
    palette: ["#A8DADC", "#457B9D", "#1D3557"],
    featured: true,
    demo: true,
  },
  {
    slug: "essaouira",
    name: "Essaouira",
    country: "Maroc",
    region: "Marrakech-Safi",
    summary:
      "Une ville portuaire de la côte atlantique, avec ses remparts, sa médina et son ambiance détendue.",
    intro: [
      "Essaouira est une ville côtière de l'Atlantique, entourée de remparts face à l'océan. Sa médina est inscrite au patrimoine mondial de l'UNESCO.",
      "Le vent y souffle souvent, ce qui attire les amateurs de sports de glisse et rend l'atmosphère plus fraîche que dans l'intérieur du pays.",
    ],
    highlights: [
      "Les remparts face à l'océan",
      "La médina et ses ateliers d'artisans",
      "Le port de pêche et son activité",
      "La plage et les sports de glisse",
    ],
    practical: [
      {
        label: "Vent",
        text: "Emportez une couche coupe-vent, même en été : le vent de l'Atlantique rafraîchit nettement l'air.",
      },
      {
        label: "Baignade",
        text: "Renseignez-vous sur les conditions de baignade et respectez les consignes affichées sur la plage.",
      },
      {
        label: "Accès",
        text: "La ville est souvent combinée avec Marrakech : vérifiez les liaisons et leurs horaires auprès des transporteurs.",
      },
    ],
    cover: {
      alt: "Remparts d'Essaouira face à l'océan Atlantique, avec des bateaux de pêche bleus",
    },
    palette: ["#F2C14E", "#2C6E7A", "#16444C"],
    demo: true,
  },
  {
    slug: "merzouga",
    name: "Merzouga",
    country: "Maroc",
    region: "Drâa-Tafilalet",
    summary:
      "Un village aux portes du Sahara, point de départ vers les grandes dunes de l'erg Chebbi.",
    intro: [
      "Merzouga est un village situé au bord de l'erg Chebbi, un vaste ensemble de dunes de sable dans le sud-est du Maroc.",
      "C'est le point de départ de nombreuses excursions dans le désert, à pied, à dos de dromadaire ou en véhicule, souvent avec une nuit en campement.",
    ],
    highlights: [
      "Les dunes de l'erg Chebbi",
      "Les levers et couchers de soleil sur le sable",
      "Les nuits étoilées en campement",
      "Les villages et oasis des environs",
    ],
    practical: [
      {
        label: "Températures",
        text: "Les écarts sont importants entre le jour et la nuit : prévoyez une couche chaude pour le soir, même quand la journée est très chaude.",
      },
      {
        label: "Soleil",
        text: "Chapeau, lunettes de soleil, crème solaire et eau en quantité suffisante sont indispensables.",
      },
      {
        label: "Prestataires",
        text: "Choisissez un prestataire déclaré, lisez attentivement ce qui est inclus et vérifiez les conditions de transport.",
      },
    ],
    cover: {
      alt: "Dunes de sable orangé de l'erg Chebbi au coucher du soleil",
    },
    palette: ["#F4A259", "#E07A3A", "#8E3416"],
    featured: true,
    demo: true,
  },
];
