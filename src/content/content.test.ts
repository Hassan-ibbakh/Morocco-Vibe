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
  getAllGuides,
  getTotalGuidePages,
} from "@/lib/content";
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH } from "@/lib/seo";
import type { Block } from "@/lib/types";

const guides = getAllGuides();
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
  ...guides.map((g) => `/guides/${g.slug}`),
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
    for (const list of [guides, destinations, categories]) {
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
    for (const g of guides) {
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
    expect(unique(guides.map((g) => g.title.toLowerCase()))).toBe(true);
    expect(unique(guides.map((g) => g.description.toLowerCase()))).toBe(true);
  });

  it("chaque image a un texte alternatif", () => {
    for (const item of [...guides, ...destinations]) {
      expect(item.cover.alt.trim().length, item.slug).toBeGreaterThan(5);
    }
  });

  it("chaque photo existe sur le disque et possède un crédit complet", () => {
    for (const item of [...guides, ...destinations]) {
      const src = item.cover.src;
      if (!src) continue;
      expect(existsSync(join(process.cwd(), "public", src)), `${item.slug} : ${src} introuvable`).toBe(true);
      const credit = getPhotoBySrc(src);
      expect(credit, `${item.slug} : crédit manquant dans photos.ts`).toBeDefined();
      expect(credit?.author.trim(), item.slug).toBeTruthy();
      expect(credit?.licenseUrl, item.slug).toMatch(/^https:\/\//);
    }
    for (const p of Object.values(photos)) {
      expect(existsSync(join(process.cwd(), "public", p.src)), p.src).toBe(true);
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
