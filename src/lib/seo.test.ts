import { describe, expect, it } from "vitest";
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH, fitDescription, seoTitle } from "@/lib/seo";

describe("seoTitle", () => {
  it("ajoute le nom du site quand le titre complet tient dans la limite", () => {
    expect(seoTitle("Contact")).toMatch(/^Contact \| /);
  });

  it("n'ajoute pas le suffixe s'il ferait dépasser la limite", () => {
    const long = "Un titre de guide déjà assez long pour remplir la ligne";
    expect(seoTitle(long)).toBe(long);
    expect(seoTitle(long).length).toBeLessThanOrEqual(MAX_TITLE_LENGTH);
  });
});

describe("fitDescription", () => {
  it("complète une description courte sans dépasser la limite", () => {
    const d = fitDescription("Une courte description.", ["Une phrase d'appoint utile pour atteindre une longueur suffisante dans Google."]);
    expect(d.length).toBeGreaterThan(70);
    expect(d.length).toBeLessThanOrEqual(MAX_DESCRIPTION_LENGTH);
  });

  it("ne modifie pas une description déjà assez longue", () => {
    const base = "x".repeat(120);
    expect(fitDescription(base, ["ajout"])).toBe(base);
  });
});
