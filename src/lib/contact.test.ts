import { describe, expect, it } from "vitest";
import { readContactForm, validateContact } from "@/lib/contact";

function form(fields: Record<string, string>) {
  const data = new FormData();
  for (const [k, v] of Object.entries(fields)) data.set(k, v);
  return data;
}

const valid = {
  name: "Amina",
  email: "amina@example.com",
  subject: "Signaler une erreur",
  message: "Bonjour, une information de la page Fès semble dépassée.",
};

describe("formulaire de contact", () => {
  it("accepte un message valide", () => {
    const { values, isBot } = readContactForm(form(valid));
    expect(isBot).toBe(false);
    expect(validateContact(values)).toEqual({});
  });

  it("signale chaque champ invalide", () => {
    const { values } = readContactForm(form({ name: "A", email: "pas-un-email", subject: "Inconnu", message: "Trop court" }));
    expect(Object.keys(validateContact(values)).sort()).toEqual(["email", "message", "name", "subject"]);
  });

  it("supprime les retours à la ligne des champs d'en-tête", () => {
    const { values } = readContactForm(form({ ...valid, name: "Amina\r\nBcc: spam@example.com" }));
    expect(values.name).not.toMatch(/[\r\n]/);
  });

  it("détecte le champ piège rempli par un robot", () => {
    expect(readContactForm(form({ ...valid, website: "https://spam.example" })).isBot).toBe(true);
  });
});
