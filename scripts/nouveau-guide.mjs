#!/usr/bin/env node
/**
 * Crée un nouvel article (guide) en brouillon, sans passer par le tableau de bord.
 *
 *   npm run nouveau-guide -- "Titre de l'article" --categorie que-faire --destination fes
 *
 * Le fichier est créé dans content/guides/ au même format que le tableau de
 * bord (/keystatic) : vous pouvez ensuite le compléter dans l'un ou l'autre.
 * L'article reste un brouillon (`draft: true`) : visible avec `npm run dev`
 * et sur les prévisualisations Vercel, jamais en production.
 */
import { existsSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = join(root, "content");

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

const slugsIn = (folder, ext) =>
  readdirSync(join(contentDir, folder))
    .filter((f) => f.endsWith(ext))
    .map((f) => f.slice(0, -ext.length));

// ---------- Arguments ----------
const args = process.argv.slice(2);
const option = (name) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? undefined : args[i + 1];
};
const title = args.find((a, i) => !a.startsWith("--") && !args[i - 1]?.startsWith("--"));

const categories = slugsIn("categories", ".yaml");
const destinations = slugsIn("destinations", ".yaml");

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
const file = join(contentDir, "guides", `${slug}.mdoc`);
if (existsSync(file)) fail(`Le fichier content/guides/${slug}.mdoc existe déjà.`);

// ---------- Fichier de l'article ----------
const today = new Date().toISOString().slice(0, 10);
const q = (s) => JSON.stringify(s);

writeFileSync(
  file,
  `---
title: ${q(title)}
description: "À compléter : résumez l'article en une ou deux phrases, entre 110 et 160 caractères, avec les mots que vos lecteurs cherchent."
intro: "À compléter : le chapeau de l'article, deux ou trois phrases qui donnent envie de lire la suite."
category: ${category}${destination ? `\ndestination: ${destination}` : ""}
publishedAt: ${today}
coverAlt: "À compléter : description précise de la photo de couverture"
keyTips:
  - Le conseil à retenir n° 1
  - Le conseil à retenir n° 2
featured: false
draft: true
demo: false
---

## Titre de la première partie

Un paragraphe. Mettez un mot en **gras** ou ajoutez un [lien](/guides).

- Premier point
- Deuxième point

{% tip title="Bon à savoir" %}
Un conseil mis en avant dans un encadré.
{% /tip %}

## Titre de la deuxième partie

Chaque titre de niveau 2 (##) apparaît dans le sommaire de l'article.

{% warning title="Attention" %}
Un avertissement important.
{% /warning %}
`,
  "utf8",
);

console.log(`
✔ Brouillon créé : content/guides/${slug}.mdoc

Étapes suivantes :
  1. Complétez-le dans le tableau de bord (http://localhost:3000/keystatic après « npm run dev »)
     ou directement dans le fichier.
  2. Relisez-le sur http://localhost:3000/guides/${slug}
  3. Quand l'article est prêt, décochez « Brouillon » (ou supprimez « draft: true »).
  4. Lancez « npm test », puis commitez et poussez : Vercel publie l'article.
`);
