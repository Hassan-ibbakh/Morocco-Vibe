/**
 * Tableau de bord d'administration (Keystatic), accessible sur /keystatic.
 *
 * - En développement (`npm run dev`) : les modifications sont écrites
 *   directement dans les fichiers du dossier content/ (aucune connexion).
 * - En production : connexion avec GitHub. Chaque enregistrement crée un
 *   commit dans le dépôt, puis Vercel republie le site automatiquement.
 *   Seules les personnes ayant un accès en écriture au dépôt peuvent se connecter.
 *
 * Voir la section « Tableau de bord » du README pour la mise en service.
 */
import { collection, config, fields, singleton } from "@keystatic/core";
import { block, wrapper } from "@keystatic/core/content-components";

const [owner = "Hassan-ibbakh", name = "Morocco-Vibe"] = (
  process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO ?? ""
)
  .split("/")
  .filter(Boolean);

const useGithub =
  process.env.NODE_ENV !== "development" || process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github";

const coverFields = (directory: string, hint?: string) => ({
  cover: fields.image({
    label: "Photo de couverture",
    description:
      hint ?? "Format paysage, environ 1600 px de large. Sans photo, une illustration s'affiche.",
    directory: `public/images/${directory}`,
    publicPath: `/images/${directory}/`,
  }),
  coverAlt: fields.text({
    label: "Description de la photo (texte alternatif)",
    description: "Décrivez ce que montre la photo, pour les personnes malvoyantes et pour Google.",
  }),
  coverCredit: fields.text({
    label: "Crédit photo",
    description: "Obligatoire si la photo n'est pas la vôtre (ex. « Photo : Nom — CC BY-SA 4.0 »).",
  }),
});

/** Articles : la même structure en français (content/guides) et en anglais (content/en/guides). */
function guideCollection(lang: "fr" | "en") {
  const en = lang === "en";
  return collection({
    label: en ? "Articles (anglais)" : "Articles (guides)",
    path: en ? "content/en/guides/*" : "content/guides/*",
    slugField: "title",
    format: { contentField: "body" },
    entryLayout: "content",
    columns: ["title", "publishedAt"],
    schema: {
      title: fields.slug({
        name: {
          label: "Titre",
          description: "60 caractères maximum, sinon Google le coupe.",
          validation: { length: { min: 10, max: 60 } },
        },
        slug: {
          label: "Adresse de la page (URL)",
          description: "Générée à partir du titre. Évitez de la changer après publication.",
        },
      }),
      ...(en
        ? {
            translationOf: fields.relationship({
              label: "Traduction de l'article français",
              description: "Relie les deux versions (sélecteur de langue et balises hreflang pour Google).",
              collection: "guides",
              validation: { isRequired: true },
            }),
          }
        : {}),
      description: fields.text({
        label: "Description (Google et réseaux sociaux)",
        description: "Entre 110 et 160 caractères.",
        multiline: true,
        validation: { length: { min: 110, max: 160 } },
      }),
      intro: fields.text({
        label: "Chapeau",
        description: "Deux ou trois phrases affichées en tête de l'article.",
        multiline: true,
        validation: { length: { min: 1 } },
      }),
      category: fields.relationship({
        label: "Catégorie",
        collection: "categories",
        validation: { isRequired: true },
      }),
      destination: fields.relationship({
        label: "Destination (facultatif)",
        collection: "destinations",
      }),
      publishedAt: fields.date({
        label: "Date de publication",
        defaultValue: { kind: "today" },
        validation: { isRequired: true },
      }),
      updatedAt: fields.date({ label: "Date de mise à jour (facultatif)" }),
      author: fields.text({ label: "Auteur", description: "Vide = « La rédaction »." }),
      ...coverFields(
        "guides",
        en ? "Laissez vide pour reprendre la photo de l'article français." : undefined,
      ),
      keyTips: fields.array(fields.text({ label: "Conseil" }), {
        label: "L'essentiel à retenir",
        itemLabel: (props) => props.value,
      }),
      faq: fields.array(
        fields.object({
          question: fields.text({ label: "Question" }),
          answer: fields.text({ label: "Réponse", multiline: true }),
        }),
        { label: "Questions fréquentes", itemLabel: (props) => props.fields.question.value },
      ),
      featured: fields.checkbox({ label: "Mettre en avant sur l'accueil" }),
      draft: fields.checkbox({
        label: "Brouillon",
        description: "Invisible sur le site en ligne tant que cette case est cochée.",
      }),
      demo: fields.checkbox({
        label: "Exemple à vérifier",
        description: "Affiche un bandeau « Exemple » et exclut la page de Google.",
      }),
      body: fields.markdoc({
        label: "Contenu",
        description: "Chaque titre de niveau 2 devient une partie du sommaire.",
        options: {
          heading: [2, 3],
          italic: false,
          strikethrough: false,
          code: false,
          codeBlock: false,
          blockquote: false,
          table: false,
          divider: false,
          image: { directory: "public/images/guides", publicPath: "/images/guides/" },
        },
        components: {
          tip: wrapper({
            label: "Encadré « Conseil »",
            schema: { title: fields.text({ label: "Titre (facultatif)" }) },
          }),
          warning: wrapper({
            label: "Encadré « Attention »",
            schema: { title: fields.text({ label: "Titre (facultatif)" }) },
          }),
          affiliate: block({
            label: "Lien partenaire",
            schema: {
              partner: fields.text({
                label: "Partenaire",
                description: "Clé déclarée dans src/config/monetization.ts.",
              }),
              url: fields.url({ label: "Adresse de la page partenaire" }),
              label: fields.text({ label: "Texte du lien" }),
              description: fields.text({ label: "Description (facultatif)" }),
            },
          }),
        },
      }),
    },
  });
}

export default config({
  storage: useGithub ? { kind: "github", repo: { owner, name } } : { kind: "local" },
  locale: "fr-FR",
  ui: {
    brand: { name: "Morocco Vibe — Admin" },
    navigation: {
      Contenu: ["guides", "guidesEn", "destinations", "categories"],
      Site: ["settings"],
    },
  },

  collections: {
    guides: guideCollection("fr"),
    guidesEn: guideCollection("en"),

    destinations: collection({
      label: "Destinations",
      path: "content/destinations/*",
      slugField: "name",
      columns: ["name", "region"],
      schema: {
        name: fields.slug({ name: { label: "Nom", validation: { length: { min: 2 } } } }),
        nameEn: fields.text({ label: "Nom en anglais (s'il diffère, ex. « Fez »)" }),
        country: fields.text({ label: "Pays", defaultValue: "Maroc" }),
        region: fields.text({ label: "Région", validation: { length: { min: 2 } } }),
        summary: fields.text({
          label: "Résumé",
          description: "Une ou deux phrases pour les cartes et les listes.",
          multiline: true,
          validation: { length: { min: 20 } },
        }),
        seoDescription: fields.text({
          label: "Description pour Google (facultatif)",
          description: "Entre 110 et 160 caractères. Sinon, le résumé est complété automatiquement.",
          multiline: true,
        }),
        intro: fields.array(fields.text({ label: "Paragraphe", multiline: true }), {
          label: "Présentation",
          itemLabel: (props) => props.value.slice(0, 80),
        }),
        highlights: fields.array(fields.text({ label: "Point fort" }), {
          label: "À ne pas manquer",
          itemLabel: (props) => props.value,
        }),
        practical: fields.array(
          fields.object({
            label: fields.text({ label: "Sujet" }),
            text: fields.text({ label: "Conseil", multiline: true }),
          }),
          { label: "Conseils pratiques", itemLabel: (props) => props.fields.label.value },
        ),
        ...coverFields("destinations"),
        lat: fields.number({
          label: "Latitude (carte)",
          description: "Position sur la carte, ex. 31.63 pour Marrakech. Vide = absente de la carte.",
          step: 0.0001,
          validation: { min: 27, max: 36 },
        }),
        lon: fields.number({
          label: "Longitude (carte)",
          description: "Ex. -7.98 pour Marrakech (négative à l'ouest de Greenwich).",
          step: 0.0001,
          validation: { min: -14, max: 0 },
        }),
        order: fields.integer({ label: "Ordre d'affichage", defaultValue: 10 }),
        featured: fields.checkbox({ label: "Mettre en avant" }),
        demo: fields.checkbox({
          label: "Exemple à vérifier",
          description: "Affiche un bandeau « Exemple » et exclut la page de Google.",
        }),
      },
    }),

    categories: collection({
      label: "Catégories",
      path: "content/categories/*",
      slugField: "name",
      columns: ["name"],
      schema: {
        name: fields.slug({ name: { label: "Nom", validation: { length: { min: 2 } } } }),
        description: fields.text({ label: "Description", multiline: true, validation: { length: { min: 10 } } }),
        seoDescription: fields.text({
          label: "Description pour Google (facultatif)",
          description: "Entre 110 et 160 caractères.",
          multiline: true,
        }),
        nameEn: fields.text({ label: "Nom en anglais" }),
        descriptionEn: fields.text({ label: "Description en anglais", multiline: true }),
        order: fields.integer({ label: "Ordre d'affichage", defaultValue: 10 }),
      },
    }),
  },

  singletons: {
    settings: singleton({
      label: "Réglages du site",
      path: "content/settings",
      schema: {
        name: fields.text({ label: "Nom du site", validation: { length: { min: 2 } } }),
        tagline: fields.text({ label: "Slogan", validation: { length: { min: 5 } } }),
        description: fields.text({
          label: "Description du site (Google)",
          description: "Entre 110 et 160 caractères.",
          multiline: true,
          validation: { length: { min: 110, max: 160 } },
        }),
        editorialTeam: fields.text({ label: "Signature par défaut des articles", defaultValue: "La rédaction" }),
        contactEmail: fields.text({
          label: "Adresse e-mail publique",
          description: "Affichée sur la page Contact et dans les mentions légales.",
        }),
        social: fields.array(
          fields.object({
            label: fields.text({ label: "Réseau (ex. Instagram)" }),
            href: fields.url({ label: "Adresse du profil" }),
          }),
          { label: "Réseaux sociaux", itemLabel: (props) => props.fields.label.value },
        ),
        heroEyebrow: fields.text({ label: "Accueil — surtitre" }),
        heroTitle: fields.text({ label: "Accueil — titre" }),
        heroHighlight: fields.text({ label: "Accueil — fin du titre (en doré)" }),
        heroIntro: fields.text({ label: "Accueil — texte d'introduction", multiline: true }),
      },
    }),
  },
});
