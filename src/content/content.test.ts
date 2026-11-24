/**
 * Vérifie l'intégrité du contenu éditorial avant chaque build :
 * slugs uniques et valides, références existantes, ancres uniques,
 * dates valides et liens internes qui mènent à une page réelle.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getPhotoBySrc, photos } from "@/content/photos";
import { legalNav, mainNav } from "@/config/site";
import {
  RESERVED_GUIDE_SLUGS,
  getAllCategories,
  getAllDestinations,
  getTotalGuidePages,
} from "@/lib/content";
import { loadGuides, markdocToSections } from "@/lib/content-source";
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH } from "@/lib/seo";
import type { Block } from "@/lib/types";

// Tous les guides (français et anglais), brouillons compris : la structure est vérifiée dès l'écriture.
const guidesFr = loadGuides("fr");
const guidesEn = loadGuides("en");
const allGuides = [...guidesFr, ...guidesEn];
const guides = allGuides;
// Guides publiés : seuls eux sont soumis aux règles SEO et peuvent être liés.
const published = allGuides.filter((g) => !g.draft);
const destinations = getAllDestinations();
const categories = getAllCategories();
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

const knownPaths = new Set<string>([
  "/",
  "/destinations",
  "/guides",
  "/recherche",
  ...mainNav.map((n) => n.href),
  ...legalNav.map((n) => n.href),
  ...destinations.map((d) => `/destinations/${d.slug}`),
  ...published.map((g) => (g.lang === "en" ? `/en/guides/${g.slug}` : `/guides/${g.slug}`)),
  "/en",
  "/en/guides",
  "/en/about",
  "/en/contact",
  "/en/legal-notice",
  "/en/privacy",
  "/en/credits",
  ...categories.map((c) => `/guides/categorie/${c.slug}`),
  ...Array.from({ length: getTotalGuidePages() - 1 }, (_, i) => `/guides/page/${i + 2}`),
]);

function texts(block: Block): string[] {
  switch (block.type) {
    case "p":
    case "h3":
    case "tip":
    case "warning":
      return [block.text];
    case "list":
      return block.items;
    default:
      return [];
  }
}

const unique = (values: string[]) => new Set(values).size === values.length;

describe("contenu", () => {
  it("les slugs sont uniques et au bon format", () => {
    for (const list of [guidesFr, guidesEn, destinations, categories]) {
      const slugs = list.map((x) => x.slug);
      expect(unique(slugs)).toBe(true);
      for (const s of slugs) expect(s).toMatch(SLUG);
    }
  });

  it("aucun guide n'utilise un segment réservé", () => {
    for (const g of guides) expect(RESERVED_GUIDE_SLUGS).not.toContain(g.slug);
  });

  it("chaque guide référence une catégorie et une destination existantes", () => {
    const cats = new Set(categories.map((c) => c.slug));
    const dests = new Set(destinations.map((d) => d.slug));
    for (const g of guides) {
      expect(cats.has(g.category), `${g.slug} → catégorie ${g.category}`).toBe(true);
      if (g.destination) expect(dests.has(g.destination), `${g.slug} → ${g.destination}`).toBe(true);
    }
  });

  it("les dates sont valides et les ancres de section uniques", () => {
    for (const g of guides) {
      for (const d of [g.publishedAt, g.updatedAt].filter(Boolean) as string[]) {
        expect(d, g.slug).toMatch(DATE);
        expect(Number.isNaN(Date.parse(d)), g.slug).toBe(false);
      }
      const ids = g.sections.map((s) => s.id);
      expect(unique(ids), g.slug).toBe(true);
      for (const id of ids) expect(id, g.slug).toMatch(SLUG);
    }
  });

  it("les métadonnées tiennent dans les limites affichées par Google", () => {
    for (const g of published) {
      // Au-delà de 60 caractères, le titre est tronqué dans les résultats.
      expect(g.title.length, `${g.slug} : titre trop long`).toBeLessThanOrEqual(MAX_TITLE_LENGTH);
      expect(g.description.length, `${g.slug} : description trop courte`).toBeGreaterThanOrEqual(110);
      expect(g.description.length, `${g.slug} : description trop longue`).toBeLessThanOrEqual(
        MAX_DESCRIPTION_LENGTH,
      );
    }
    for (const item of [...destinations, ...categories]) {
      if (item.seoDescription) {
        expect(item.seoDescription.length, item.slug).toBeGreaterThanOrEqual(110);
        expect(item.seoDescription.length, item.slug).toBeLessThanOrEqual(MAX_DESCRIPTION_LENGTH);
      }
    }
  });

  it("les titres de guides sont uniques", () => {
    for (const lang of ["fr", "en"]) {
      const list = published.filter((g) => g.lang === lang);
      expect(unique(list.map((g) => g.title.toLowerCase())), lang).toBe(true);
      expect(unique(list.map((g) => g.description.toLowerCase())), lang).toBe(true);
    }
  });

  it("chaque image a un texte alternatif", () => {
    for (const item of [...guides, ...destinations]) {
      expect(item.cover.alt.trim().length, item.slug).toBeGreaterThan(5);
    }
  });

  it("chaque photo existe sur le disque et les crédits enregistrés sont complets", () => {
    const images = [
      ...[...guides, ...destinations].map((item) => ({ slug: item.slug, src: item.cover.src })),
      ...guides.flatMap((g) =>
        g.sections.flatMap((s) => s.blocks).flatMap((b) => (b.type === "image" ? [{ slug: g.slug, src: b.image.src }] : [])),
      ),
    ];
    for (const { slug, src } of images) {
      if (!src) continue;
      expect(src, slug).toMatch(/^\/images\//);
      expect(existsSync(join(process.cwd(), "public", src)), `${slug} : ${src} introuvable`).toBe(true);
    }
    // Photos tierces (Wikimedia Commons) : auteur et licence obligatoires.
    for (const p of Object.values(photos)) {
      expect(existsSync(join(process.cwd(), "public", p.src)), p.src).toBe(true);
      expect(p.author.trim(), p.src).toBeTruthy();
      expect(p.licenseUrl, p.src).toMatch(/^https:\/\//);
      expect(getPhotoBySrc(p.src), p.src).toBe(p);
    }
  });

  it("les articles publiés ont un sommaire et un contenu suffisant", () => {
    for (const g of published) {
      const titled = g.sections.filter((s) => s.title);
      expect(titled.length, `${g.slug} : au moins deux parties (titres de niveau 2)`).toBeGreaterThanOrEqual(2);
      for (const s of g.sections) expect(s.blocks.length, `${g.slug} → ${s.title} est vide`).toBeGreaterThan(0);
    }
  });

  it("tous les liens internes pointent vers une page existante", () => {
    const broken: string[] = [];
    for (const g of guides) {
      for (const block of g.sections.flatMap((s) => s.blocks)) {
        for (const text of texts(block)) {
          for (const [, href] of text.matchAll(/\]\((\/[^)\s#]*)/g)) {
            if (!knownPaths.has(href)) broken.push(`${g.slug} → ${href}`);
          }
        }
      }
    }
    expect(broken).toEqual([]);
  });
});

describe("version anglaise", () => {
  it("chaque article anglais traduit un article français existant, une seule fois", () => {
    const frSlugs = new Set(guidesFr.map((g) => g.slug));
    for (const g of guidesEn) {
      expect(g.translationOf, `${g.slug} : champ translationOf manquant`).toBeTruthy();
      expect(frSlugs.has(g.translationOf!), `${g.slug} → ${g.translationOf} introuvable`).toBe(true);
    }
    expect(unique(guidesEn.map((g) => g.translationOf!))).toBe(true);
  });

  it("les articles anglais renvoient vers des pages anglaises", () => {
    const wrong: string[] = [];
    for (const g of guidesEn) {
      for (const block of g.sections.flatMap((sec) => sec.blocks)) {
        for (const text of texts(block)) {
          for (const [, href] of text.matchAll(/\]\((\/[^)\s#]*)/g)) {
            if (!href.startsWith("/en")) wrong.push(`${g.slug} → ${href}`);
          }
        }
      }
    }
    expect(wrong).toEqual([]);
  });

  it("les catégories utilisées en anglais ont un nom anglais", () => {
    for (const g of guidesEn) {
      expect(categories.find((c) => c.slug === g.category)?.nameEn, g.slug).toBeTruthy();
    }
  });
});

describe("conversion Markdoc", () => {
  it("transforme titres, listes, encadrés et liens en sections", () => {
    const sections = markdocToSections(
      [
        "Texte d'ouverture.",
        "## Première partie",
        "Un **mot** et un [lien](/guides).",
        "### Sous-titre",
        "1. un\n2. deux",
        '{% tip title="Astuce" %}\nConseil utile.\n{% /tip %}',
        "## Première partie",
        "![Une photo](/images/x.jpg)",
        '{% affiliate partner="p" url="https://exemple.com" label="Voir" /%}',
      ].join("\n\n"),
    );
    expect(sections.map((s) => [s.id, s.title])).toEqual([
      ["introduction", ""],
      ["premiere-partie", "Première partie"],
      ["premiere-partie-2", "Première partie"],
    ]);
    expect(sections[1].blocks).toEqual([
      { type: "p", text: "Un **mot** et un [lien](/guides)." },
      { type: "h3", text: "Sous-titre" },
      { type: "list", ordered: true, items: ["un", "deux"] },
      { type: "tip", title: "Astuce", text: "Conseil utile." },
    ]);
    expect(sections[2].blocks[0]).toMatchObject({ type: "image", image: { src: "/images/x.jpg", alt: "Une photo" } });
    expect(sections[2].blocks[1]).toMatchObject({ type: "affiliate", partner: "p", label: "Voir" });
  });

  it("refuse un composant inconnu", () => {
    expect(() => markdocToSections("{% inconnu %}\nx\n{% /inconnu %}", "test.mdoc")).toThrow(/inconnu/);
  });
});
