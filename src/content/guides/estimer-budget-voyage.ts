import type { Guide } from "@/lib/types";

const guide: Guide = {
  slug: "estimer-budget-voyage",
  title: "Estimer le budget d'un voyage au Maroc : une méthode en quatre postes",
  description:
    "Transport, hébergement, vie sur place, imprévus : une méthode simple pour estimer et suivre le budget de votre voyage au Maroc sans mauvaise surprise.",
  intro:
    "Plutôt que de chercher un chiffre « moyen » qui ne correspondra jamais à votre façon de voyager, mieux vaut construire votre propre estimation à partir de prix réels. Voici une méthode simple.",
  category: "budget",
  publishedAt: "2026-10-20",
  cover: {
    alt: "Carnet de comptes, pièces de monnaie et billets de train sur une table",
  },
  sections: [
    {
      id: "quatre-postes",
      title: "Découper le budget en quatre postes",
      blocks: [
        {
          type: "list",
          items: [
            "**Transport principal** : aller-retour jusqu'au Maroc.",
            "**Hébergement** : nombre de nuits multiplié par le tarif relevé pour vos dates (riad, hôtel, campement…).",
            "**Vie sur place** : repas, transports entre les villes, visites, guides, par jour.",
            "**Imprévus** : une réserve, à fixer selon votre tolérance au risque.",
          ],
        },
      ],
    },
    {
      id: "relever-prix",
      title: "Relever des prix réels",
      blocks: [
        {
          type: "p",
          text: "Pour chaque poste, relevez des tarifs réels pour vos dates sur plusieurs sources (sites des transporteurs, des hébergements, des monuments). Les prix varient selon la saison, les fêtes et le délai de réservation.",
        },
        {
          type: "tip",
          text: "Pour les excursions (désert, montagne), comparez précisément ce qui est inclus : transport, repas, nuit, guide. Deux offres au même prix peuvent être très différentes.",
        },
      ],
    },
    {
      id: "souks",
      title: "Prévoir les achats dans les souks",
      blocks: [
        {
          type: "p",
          text: "Dans les souks, les prix se négocient souvent. Fixez-vous à l'avance un montant maximal pour chaque achat important : cela évite les regrets et rend la discussion plus détendue.",
        },
      ],
    },
    {
      id: "suivre",
      title: "Suivre ses dépenses pendant le voyage",
      blocks: [
        {
          type: "p",
          text: "Un tableur ou une application de suivi suffit. Comparez chaque soir le réel à votre estimation journalière : vous ajusterez plus facilement vos choix pour la suite du séjour.",
        },
        {
          type: "p",
          text: "Avant de partir, pensez aussi à vérifier les frais bancaires à l'étranger, comme indiqué dans notre [checklist avant le départ](/guides/checklist-avant-depart).",
        },
      ],
    },
  ],
  keyTips: [
    "Construisez votre estimation à partir de prix réels, pas de moyennes.",
    "Comparez précisément le contenu des excursions.",
    "Suivez vos dépenses chaque jour pour ajuster rapidement.",
  ],
  demo: true,
};

export default guide;
