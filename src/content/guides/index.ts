import type { Guide } from "@/lib/types";

import checklistAvantDepart from "./checklist-avant-depart";
import chefchaouenQueFaire from "./chefchaouen-que-faire";
import essaouiraWeekEnd from "./essaouira-week-end";
import estimerBudgetVoyage from "./estimer-budget-voyage";
import fesPremiereVisiteMedina from "./fes-premiere-visite-medina";
import itineraireUneSemaineMaroc from "./itineraire-une-semaine-maroc";
import marrakechIdeesVisites from "./marrakech-idees-visites";
import marrakechSeRepererMedina from "./marrakech-se-reperer-medina";
import merzougaNuitDesert from "./merzouga-nuit-desert";
import usagesSavoirVivreMaroc from "./usages-savoir-vivre-maroc";

/**
 * Pour publier un nouveau guide :
 * 1. dupliquez un fichier de ce dossier et renommez-le avec le slug ;
 * 2. importez-le ci-dessous et ajoutez-le au tableau ;
 * 3. lancez `npm test` pour vérifier les références et les liens internes.
 */
export const guides: Guide[] = [
  checklistAvantDepart,
  chefchaouenQueFaire,
  essaouiraWeekEnd,
  estimerBudgetVoyage,
  fesPremiereVisiteMedina,
  itineraireUneSemaineMaroc,
  marrakechIdeesVisites,
  marrakechSeRepererMedina,
  merzougaNuitDesert,
  usagesSavoirVivreMaroc,
];
