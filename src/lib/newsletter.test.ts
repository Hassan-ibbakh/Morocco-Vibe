import { describe, expect, it } from "vitest";
import { isValidEmail, newsletterTexts, readNewsletterForm } from "@/lib/newsletter";

const form = (entries: Record<string, string>) => {
  const data = new FormData();
  for (const [k, v] of Object.entries(entries)) data.set(k, v);
  return data;
};

describe("newsletter", () => {
  it("valide les adresses e-mail", () => {
    expect(isValidEmail("voyageur@exemple.com")).toBe(true);
    expect(isValidEmail("sans-arobase.com")).toBe(false);
    expect(isValidEmail("a@b")).toBe(false);
    expect(isValidEmail(`${"a".repeat(250)}@exemple.com`)).toBe(false);
  });

  it("normalise l'adresse et lit la langue", () => {
    expect(readNewsletterForm(form({ email: "  Voyageur@Exemple.COM ", lang: "en" }))).toEqual({
      email: "voyageur@exemple.com",
      lang: "en",
      isBot: false,
    });
    expect(readNewsletterForm(form({ email: "a@b.fr", lang: "xx" })).lang).toBe("fr");
  });

  it("repère les robots grâce au champ piège", () => {
    expect(readNewsletterForm(form({ email: "a@b.fr", website: "spam" })).isBot).toBe(true);
  });

  it("propose les mêmes messages en français et en anglais", () => {
    expect(Object.keys(newsletterTexts.en).sort()).toEqual(Object.keys(newsletterTexts.fr).sort());
  });
});
