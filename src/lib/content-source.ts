/**
 * Lecture du contenu édité depuis le tableau de bord (Keystatic) :
 *   content/guides/*.mdoc        articles (en-tête YAML + texte Markdoc)
 *   content/destinations/*.yaml  fiches destinations
 *   content/categories/*.yaml    catégories
 *   content/settings.yaml        réglages du site
 *
 * Les fichiers sont lus une seule fois, au build. Le texte des articles est
 * converti dans le modèle Section/Block utilisé par les composants : la mise
 * en page, le sommaire et la recherche ne dépendent donc pas de l'éditeur.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import Markdoc, { type Node } from "@markdoc/markdoc";
import { parse as parseYaml } from "yaml";
import { slugify } from "@/lib/format";
import type { Block, Category, Destination, Guide, ImageRef, Section } from "@/lib/types";

const CONTENT_DIR = join(process.cwd(), "content");

type Data = Record<string, unknown>;

/* ---------- Lecture des fichiers ---------- */

function listSlugs(folder: string, extension: string): string[] {
  const dir = join(CONTENT_DIR, folder);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((file) => file.endsWith(extension))
    .map((file) => file.slice(0, -extension.length))
    .sort();
}

/** Lit un fichier texte en retirant l'éventuel BOM ajouté par certains éditeurs Windows. */
function readText(path: string): string {
  return readFileSync(path, "utf8").replace(/^﻿/, "");
}

function readYaml(path: string): Data {
  const data = parseYaml(readText(path)) as unknown;
  return data && typeof data === "object" ? (data as Data) : {};
}

function splitFrontmatter(source: string, file: string): { data: Data; body: string } {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error(`${file} : en-tête YAML (---) manquant.`);
  return { data: (parseYaml(match[1]) as Data) ?? {}, body: match[2] };
}

/** Empreinte du contenu (nombre de fichiers et dernière modification). */
export function contentVersion(): string {
  let count = 0;
  let latest = 0;
  for (const folder of ["guides", "en/guides", "destinations", "categories"]) {
    const dir = join(CONTENT_DIR, folder);
    if (!existsSync(dir)) continue;
    for (const file of readdirSync(dir)) {
      count++;
      latest = Math.max(latest, statSync(join(dir, file)).mtimeMs);
    }
  }
  return `${count}:${latest}`;
}

/* ---------- Conversion des valeurs ---------- */

function str(data: Data, key: string, file: string): string {
  const value = optStr(data, key);
  if (!value) throw new Error(`${file} : le champ « ${key} » est obligatoire.`);
  return value;
}

function optStr(data: Data, key: string): string | undefined {
  const value = data[key];
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "number") return String(value);
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

const bool = (data: Data, key: string) => data[key] === true;
const num = (data: Data, key: string, fallback: number) =>
  typeof data[key] === "number" ? (data[key] as number) : fallback;
const strings = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((v): v is string => typeof v === "string" && v.trim() !== "") : [];

function cover(data: Data, fallbackAlt: string): ImageRef {
  return {
    src: optStr(data, "cover"),
    alt: optStr(data, "coverAlt") ?? fallbackAlt,
    credit: optStr(data, "coverCredit"),
  };
}

/* ---------- Markdoc → sections et blocs ---------- */

/** Texte d'un nœud en ligne, avec la mise en forme **gras** et [lien](url). */
function inlineText(node: Node): string {
  switch (node.type) {
    case "text":
      return String(node.attributes.content ?? "");
    case "code":
      return String(node.attributes.content ?? "");
    case "softbreak":
    case "hardbreak":
      return " ";
    case "strong":
      return `**${node.children.map(inlineText).join("")}**`;
    case "link":
      return `[${node.children.map(inlineText).join("")}](${node.attributes.href})`;
    default:
      return node.children.map(inlineText).join("");
  }
}

/** Texte d'un bloc (paragraphes d'un encadré, élément de liste…). */
function blockText(node: Node): string {
  if (node.type === "paragraph" || node.type === "inline") return inlineText(node).trim();
  return node.children.map(blockText).filter(Boolean).join(" ");
}

function onlyImage(node: Node): Node | undefined {
  const inline = node.children[0];
  const images = inline?.children.filter((c) => c.type === "image") ?? [];
  const text = inline ? inlineText(inline).trim() : "";
  return images.length === 1 && text === "" ? images[0] : undefined;
}

function toBlock(node: Node, file: string): Block | undefined {
  switch (node.type) {
    case "paragraph": {
      const image = onlyImage(node);
      if (image) {
        const alt = String(image.attributes.alt ?? "");
        return {
          type: "image",
          image: { src: String(image.attributes.src), alt },
          caption: image.attributes.title ? String(image.attributes.title) : undefined,
        };
      }
      const text = inlineText(node).trim();
      return text ? { type: "p", text } : undefined;
    }
    case "heading":
      return { type: "h3", text: inlineText(node).trim() };
    case "list":
      return {
        type: "list",
        ordered: Boolean(node.attributes.ordered),
        items: node.children.map(blockText).filter(Boolean),
      };
    case "tag": {
      const title = node.attributes.title ? String(node.attributes.title) : undefined;
      if (node.tag === "tip" || node.tag === "warning") {
        return { type: node.tag, title, text: node.children.map(blockText).filter(Boolean).join(" ") };
      }
      if (node.tag === "affiliate") {
        return {
          type: "affiliate",
          partner: String(node.attributes.partner ?? ""),
          url: String(node.attributes.url ?? ""),
          label: String(node.attributes.label ?? ""),
          description: node.attributes.description ? String(node.attributes.description) : undefined,
        };
      }
      throw new Error(`${file} : composant inconnu « ${node.tag} ».`);
    }
    default:
      return undefined;
  }
}

export function markdocToSections(source: string, file = "contenu"): Section[] {
  const ast = Markdoc.parse(source);
  const sections: Section[] = [];
  const used = new Set<string>();
  let current: Section | undefined;

  for (const node of ast.children) {
    if (node.type === "heading" && node.attributes.level === 2) {
      const title = inlineText(node).trim();
      let id = slugify(title) || "partie";
      for (let n = 2; used.has(id); n++) id = `${slugify(title)}-${n}`;
      used.add(id);
      current = { id, title, blocks: [] };
      sections.push(current);
      continue;
    }
    const block = toBlock(node, file);
    if (!block) continue;
    if (!current) {
      // Texte placé avant le premier titre : partie sans titre (hors sommaire).
      current = { id: "introduction", title: "", blocks: [] };
      used.add(current.id);
      sections.push(current);
    }
    current.blocks.push(block);
  }
  return sections;
}

/* ---------- Collections ---------- */

export function loadCategories(): Category[] {
  return listSlugs("categories", ".yaml")
    .map((slug) => {
      const file = `content/categories/${slug}.yaml`;
      const data = readYaml(join(CONTENT_DIR, "categories", `${slug}.yaml`));
      return {
        category: {
          slug,
          name: str(data, "name", file),
          description: str(data, "description", file),
          seoDescription: optStr(data, "seoDescription"),
          nameEn: optStr(data, "nameEn"),
          descriptionEn: optStr(data, "descriptionEn"),
        },
        order: num(data, "order", 100),
      };
    })
    .sort((a, b) => a.order - b.order || a.category.name.localeCompare(b.category.name, "fr"))
    .map(({ category }) => category);
}

export function loadDestinations(): Destination[] {
  return listSlugs("destinations", ".yaml")
    .map((slug) => {
      const file = `content/destinations/${slug}.yaml`;
      const data = readYaml(join(CONTENT_DIR, "destinations", `${slug}.yaml`));
      const name = str(data, "name", file);
      const practical = Array.isArray(data.practical) ? (data.practical as Data[]) : [];
      return {
        destination: {
          slug,
          name,
          nameEn: optStr(data, "nameEn"),
          country: optStr(data, "country") ?? "Maroc",
          region: str(data, "region", file),
          summary: str(data, "summary", file),
          seoDescription: optStr(data, "seoDescription"),
          intro: strings(data.intro),
          highlights: strings(data.highlights),
          practical: practical
            .map((p) => ({ label: optStr(p, "label") ?? "", text: optStr(p, "text") ?? "" }))
            .filter((p) => p.label && p.text),
          cover: cover(data, name),
          coordinates:
            typeof data.lat === "number" && typeof data.lon === "number"
              ? { lat: data.lat, lon: data.lon }
              : undefined,
          featured: bool(data, "featured"),
          demo: bool(data, "demo"),
        } satisfies Destination,
        order: num(data, "order", 100),
      };
    })
    .sort((a, b) => a.order - b.order || a.destination.name.localeCompare(b.destination.name, "fr"))
    .map(({ destination }) => destination);
}

/** Articles d'une langue : content/guides (français) ou content/en/guides (anglais). */
export function loadGuides(lang: "fr" | "en" = "fr"): Guide[] {
  const folder = lang === "en" ? "en/guides" : "guides";
  return listSlugs(folder, ".mdoc").map((slug) => {
    const file = `content/${folder}/${slug}.mdoc`;
    const { data, body } = splitFrontmatter(readText(join(CONTENT_DIR, folder, `${slug}.mdoc`)), file);
    const faq = Array.isArray(data.faq) ? (data.faq as Data[]) : [];
    const title = str(data, "title", file);
    return {
      slug,
      title,
      description: str(data, "description", file),
      intro: str(data, "intro", file),
      category: str(data, "category", file),
      destination: optStr(data, "destination"),
      publishedAt: str(data, "publishedAt", file),
      updatedAt: optStr(data, "updatedAt"),
      author: optStr(data, "author"),
      cover: cover(data, title),
      sections: markdocToSections(body, file),
      keyTips: strings(data.keyTips),
      faq: faq
        .map((f) => ({ question: optStr(f, "question") ?? "", answer: optStr(f, "answer") ?? "" }))
        .filter((f) => f.question && f.answer),
      featured: bool(data, "featured"),
      demo: bool(data, "demo"),
      draft: bool(data, "draft"),
      lang,
      translationOf: lang === "en" ? optStr(data, "translationOf") : undefined,
    } satisfies Guide;
  });
}

/* ---------- Réglages du site ---------- */

export type SiteSettings = {
  name?: string;
  tagline?: string;
  description?: string;
  editorialTeam?: string;
  contactEmail?: string;
  social: { label: string; href: string }[];
  heroEyebrow?: string;
  heroTitle?: string;
  heroHighlight?: string;
  heroIntro?: string;
};

export function loadSettings(): SiteSettings {
  const path = join(CONTENT_DIR, "settings.yaml");
  const data = existsSync(path) ? readYaml(path) : {};
  const social = Array.isArray(data.social) ? (data.social as Data[]) : [];
  return {
    name: optStr(data, "name"),
    tagline: optStr(data, "tagline"),
    description: optStr(data, "description"),
    editorialTeam: optStr(data, "editorialTeam"),
    contactEmail: optStr(data, "contactEmail"),
    social: social
      .map((s) => ({ label: optStr(s, "label") ?? "", href: optStr(s, "href") ?? "" }))
      .filter((s) => s.label && /^https:\/\//.test(s.href)),
    heroEyebrow: optStr(data, "heroEyebrow"),
    heroTitle: optStr(data, "heroTitle"),
    heroHighlight: optStr(data, "heroHighlight"),
    heroIntro: optStr(data, "heroIntro"),
  };
}
