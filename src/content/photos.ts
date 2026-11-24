/**
 * Registre des photos du site (licences libres, Wikimedia Commons).
 * Généré à partir des métadonnées officielles de chaque image : auteur,
 * licence et page source. Pour ajouter une photo : placez le fichier dans
 * public/images, ajoutez une entrée ici, puis utilisez photo("id").
 */

export type Photo = {
  src: string;
  width: number;
  height: number;
  /** Titre du fichier sur la plateforme source. */
  title: string;
  author: string;
  license: string;
  licenseUrl: string;
  sourceUrl: string;
};

export const photos = {
  "hero-erg-chebbi": {
    src: "/images/hero-erg-chebbi.jpg",
    width: 1920,
    height: 1281,
    title: "Erg Chebbi sunset.jpg",
    author: "Thomas Fuhrmann",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Erg_Chebbi_sunset.jpg",
  },
  "marrakech": {
    src: "/images/marrakech.jpg",
    width: 1280,
    height: 851,
    title: "Covered Souk Semmarine, Marrakech, 2008.jpg",
    author: "DimiTalen",
    license: "CC0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Covered_Souk_Semmarine,_Marrakech,_2008.jpg",
  },
  "fes": {
    src: "/images/fes.jpg",
    width: 1280,
    height: 1023,
    title: "Fes Bab Bou Jeloud 2011.jpg",
    author: "Bjørn Christian Tørrissen",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Fes_Bab_Bou_Jeloud_2011.jpg",
  },
  "chefchaouen": {
    src: "/images/chefchaouen.jpg",
    width: 1280,
    height: 850,
    title: "Chefchaouen Street B.jpg",
    author: "Mark Fischer",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Chefchaouen_Street_B.jpg",
  },
  "essaouira": {
    src: "/images/essaouira.jpg",
    width: 1280,
    height: 851,
    title: "Fishing boats in the port of Essaouira, 2008.jpg",
    author: "DimiTalen",
    license: "CC0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Fishing_boats_in_the_port_of_Essaouira,_2008.jpg",
  },
  "merzouga": {
    src: "/images/merzouga.jpg",
    width: 1280,
    height: 852,
    title: "Erg Chebbi in the evening light.jpg",
    author: "Thomas Fuhrmann",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Erg_Chebbi_in_the_evening_light.jpg",
  },
  "checklist-avant-depart": {
    src: "/images/checklist-avant-depart.jpg",
    width: 1280,
    height: 792,
    title: "Ksar Aït Benhaddou, Marocco (أيت بن حدو، المغرب, ⴰⵢⵜ ⵃⴰⴷⴷⵓ).jpg",
    author: "Petar Milošević",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Ksar_A%C3%AFt_Benhaddou,_Marocco_(%D8%A3%D9%8A%D8%AA_%D8%A8%D9%86_%D8%AD%D8%AF%D9%88%D8%8C_%D8%A7%D9%84%D9%85%D8%BA%D8%B1%D8%A8,_%E2%B4%B0%E2%B5%A2%E2%B5%9C_%E2%B5%83%E2%B4%B0%E2%B4%B7%E2%B4%B7%E2%B5%93).jpg",
  },
  "estimer-budget-voyage": {
    src: "/images/estimer-budget-voyage.jpg",
    width: 1280,
    height: 786,
    title: "Moroccan spices.jpg",
    author: "Kyle Simourd",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Moroccan_spices.jpg",
  },
  "fes-premiere-visite-medina": {
    src: "/images/fes-premiere-visite-medina.jpg",
    width: 1280,
    height: 857,
    title: "Chouara Tannery, Fes (8947682350).jpg",
    author: "just_a_cheeseburger",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Chouara_Tannery,_Fes_(8947682350).jpg",
  },
  "chefchaouen-que-faire": {
    src: "/images/chefchaouen-que-faire.jpg",
    width: 1280,
    height: 853,
    title: "2018 01 (Blue) - Chaouen.jpg",
    author: "Fbrandao.1963",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:2018_01_(Blue)_-_Chaouen.jpg",
  },
  "essaouira-week-end": {
    src: "/images/essaouira-week-end.jpg",
    width: 1280,
    height: 960,
    title: "Ramparts of Essaouira.JPG",
    author: "Kayaky",
    license: "CC BY 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Ramparts_of_Essaouira.JPG",
  },
  "merzouga-nuit-desert": {
    src: "/images/merzouga-nuit-desert.jpg",
    width: 1280,
    height: 720,
    title: "Merzouga desert camp.jpg",
    author: "Isabeldianamadrid",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Merzouga_desert_camp.jpg",
  },
  "itineraire-une-semaine-maroc": {
    src: "/images/itineraire-une-semaine-maroc.jpg",
    width: 1280,
    height: 677,
    title: "Tizi n'Tichka Pass - 1.jpg",
    author: "Ingo Mehling",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Tizi_n%27Tichka_Pass_-_1.jpg",
  },
  "marrakech-idees-visites": {
    src: "/images/marrakech-idees-visites.jpg",
    width: 1280,
    height: 958,
    title: "Jardin Majorelle in Marrakesch 05.jpg",
    author: "Alexander Leisser",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Jardin_Majorelle_in_Marrakesch_05.jpg",
  },
  "marrakech-se-reperer-medina": {
    src: "/images/marrakech-se-reperer-medina.jpg",
    width: 1280,
    height: 854,
    title: "Entering the souk of Marrakech.jpg",
    author: "Mustang Joe",
    license: "CC0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/deed.en",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Entering_the_souk_of_Marrakech.jpg",
  },
  "usages-savoir-vivre-maroc": {
    src: "/images/usages-savoir-vivre-maroc.jpg",
    width: 1280,
    height: 853,
    title: "Mint tea, Marrakesh.jpg",
    author: "Adam Harangozó",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:Mint_tea,_Marrakesh.jpg",
  },
} satisfies Record<string, Photo>;

export type PhotoId = keyof typeof photos;

/** Champs image (src et dimensions) à fusionner dans un ImageRef. */
export function photo(id: PhotoId) {
  const { src, width, height } = photos[id];
  return { src, width, height };
}

/** Retrouve le crédit d'une image à partir de son chemin. */
export function getPhotoBySrc(src: string | undefined): Photo | undefined {
  if (!src) return undefined;
  return Object.values(photos).find((p) => p.src === src);
}
