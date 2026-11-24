#!/usr/bin/env node
/**
 * Crée un nouvel article (guide) en brouillon et l'ajoute à la liste.
 *
 *   npm run nouveau-guide -- "Titre de l'article" --categorie que-faire --destination fes
 *
 * Le fichier créé dans src/content/guides/ contient un modèle à compléter.
 * L'article reste un brouillon (`draft: true`) : visible avec `npm run dev`
 * et sur les prévisualisations Vercel, jamais en production.
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const guidesDir = join(root, "src", "content", "guides");

function fail(message) {
  console.error(`\n✖ ${message}\n`);
  process.exit(1);
}

function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function slugsIn(file) {
  const source = readFileSync(join(root, file), "utf8");
  return [...source.matchAll(/^\s{2,4}slug: "([^"]+)"/gm)].map((m) => m[1]);
}

// ---------- Arguments ----------
const args = process.argv.slice(2);
const option = (name) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? undefined : args[i + 1];
};
const title = args.find((a, i) => !a.startsWith("--") && !args[i - 1]?.startsWith("--"));

const categories = slugsIn("src/content/categories.ts");
const destinations = slugsIn("src/content/destinations.ts");

if (!title) {
  fail(
    `Indiquez un titre. Exemple :\n  npm run nouveau-guide -- "Visiter Meknès en une journée" --categorie que-faire\n\n` +
      `Catégories : ${categories.join(", ")}\nDestinations : ${destinations.join(", ")}`,
  );
}
if (title.length > 60) fail(`Titre trop long (${title.length} caractères, 60 maximum).`);

const category = option("categorie") ?? "preparer";
if (!categories.includes(category)) fail(`Catégorie inconnue « ${category} ». Choix : ${categories.join(", ")}`);

const destination = option("destination");
if (destination && !destinations.includes(destination)) {
  fail(`Destination inconnue « ${destination} ». Choix : ${destinations.join(", ")}`);
}

const slug = option("slug") ?? slugify(title);
if (["page", "categorie"].includes(slug)) fail(`Le slug « ${slug} » est réservé.`);
const file = join(guidesDir, `${slug}.ts`);
if (existsSync(file)) fail(`Le fichier src/content/guides/${slug}.ts existe déjà.`);

// ---------- Fichier de l'article ----------
const today = new Date().toISOString().slice(0, 10);
const q = (s) => JSON.stringify(s);

writeFileSync(
  file,
  `import type { Guide } from "@/lib/types";

/**
 * Article en cours d'écriture.
 * - Remplacez chaque texte « À compléter ».
 * - Description : 110 à 160 caractères (elle s'affiche dans Google).
 * - Photo : voir « Photos » dans le README (sans photo, une illustration s'affiche).
 * - Quand l'article est prêt : supprimez la ligne \`draft: true\`.
 */
const guide: Guide = {
  slug: ${q(slug)},
  title: ${q(title)},
  description:
    "À compléter : résumez l'article en une ou deux phrases, entre 110 et 160 caractères, avec les mots que vos lecteurs cherchent.",
  intro: "À compléter : le chapeau de l'article, deux ou trois phrases qui donnent envie de lire la suite.",
  category: ${q(category)},${destination ? `\n  destination: ${q(destination)},` : ""}
  publishedAt: ${q(today)},
  cover: {
    alt: "À compléter : description précise de la photo de couverture",
  },
  sections: [
    {
      id: "premiere-partie",
      title: "Titre de la première partie",
      blocks: [
        { type: "p", text: "Un paragraphe. Mettez un mot en **gras** ou ajoutez un [lien](/guides)." },
        { type: "list", items: ["Premier point", "Deuxième point"] },
        { type: "tip", title: "Bon à savoir", text: "Un conseil mis en avant dans un encadré." },
      ],
    },
    {
      id: "deuxieme-partie",
      title: "Titre de la deuxième partie",
      blocks: [
        { type: "p", text: "Chaque partie apparaît dans le sommaire de l'article." },
        { type: "warning", title: "Attention", text: "Un avertissement important." },
      ],
    },
  ],
  keyTips: ["Le conseil à retenir n° 1", "Le conseil à retenir n° 2"],
  draft: true,
};

export default guide;
`,
  "utf8",
);

// ---------- Ajout dans guides/index.ts ----------
const indexFile = join(guidesDir, "index.ts");
const index = readFileSync(indexFile, "utf8");
const variable = slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase()).replace(/^(\d)/, "g$1");
const lastImport = [...index.matchAll(/^import .+ from "\.\/.+";$/gm)].at(-1);
if (!lastImport || !index.includes("export const guides: Guide[] = [")) {
  fail("Impossible de mettre à jour src/content/guides/index.ts : ajoutez l'article à la main.");
}
const at = lastImport.index + lastImport[0].length;
let updated = `${index.slice(0, at)}\nimport ${variable} from "./${slug}";${index.slice(at)}`;
updated = updated.replace(/\n\];\s*$/, `\n  ${variable},\n];\n`);
writeFileSync(indexFile, updated, "utf8");

console.log(`
✔ Brouillon créé : src/content/guides/${slug}.ts

Étapes suivantes :
  1. Ouvrez ce fichier et remplacez les textes « À compléter ».
  2. Lancez « npm run dev » et ouvrez http://localhost:3000/guides/${slug}
  3. Quand l'article est prêt, supprimez la ligne « draft: true ».
  4. Lancez « npm test », puis commitez et poussez : Vercel publie l'article.
`);
