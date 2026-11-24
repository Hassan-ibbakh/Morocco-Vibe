# Morocco Vibe

Site de guides de voyage sur le Maroc, en français, construit avec **Next.js 16** (App Router, Cache Components), **TypeScript** et **Tailwind CSS 4**. Toutes les pages sont générées statiquement : le site est rapide, peu coûteux à héberger et prêt pour Vercel.

> ⚠️ Les destinations et les guides livrés sont des **exemples** (`demo: true`). Ils affichent un bandeau « Exemple », sont en `noindex` et sont exclus du sitemap. Réécrivez-les et vérifiez-les, puis retirez `demo: true` pour les publier.

## Démarrer

Prérequis : Node.js 20.9 ou plus récent (testé avec Node 22).

```bash
npm install
npm run dev        # http://localhost:3000
```

| Commande            | Rôle                                                                  |
| ------------------- | --------------------------------------------------------------------- |
| `npm run dev`       | Serveur de développement                                              |
| `npm run build`     | Build de production (inclut la vérification TypeScript)               |
| `npm start`         | Sert le build de production                                           |
| `npm run lint`      | ESLint (règles Next.js et Core Web Vitals)                            |
| `npm test`          | Tests d'intégrité du contenu (slugs, références, liens internes…)     |
| `npm run typecheck` | Vérification TypeScript seule (après un premier `dev` ou `build`)     |

## Pages

| URL                            | Contenu                                                     |
| ------------------------------ | ----------------------------------------------------------- |
| `/`                            | Accueil : recherche, catégories, destinations, guides       |
| `/destinations`                | Toutes les destinations, groupées par région                |
| `/destinations/[slug]`         | Fiche destination, conseils pratiques, guides liés          |
| `/guides`, `/guides/page/[n]`  | Liste des guides avec pagination (la page 1 est `/guides`)  |
| `/guides/categorie/[slug]`     | Guides d'une catégorie                                      |
| `/guides/[slug]`               | Article : sommaire, sections, encadrés, articles liés       |
| `/recherche`                   | Recherche instantanée (côté navigateur, `noindex`)          |
| `/a-propos`, `/contact`        | Présentation et contact                                     |
| `/mentions-legales`, `/confidentialite`, `/cookies`, `/transparence` | Pages légales, avec des champs `[À compléter]` |
| `/credits`                     | Auteurs et licences des photos                              |
| `/rss.xml`                     | Flux RSS des guides publiés                                 |

Une URL inconnue renvoie un vrai code **404**, et `/guides/page/1` redirige en **308** vers `/guides`.

## Gérer le contenu

Le contenu est stocké dans des fichiers TypeScript : il n'y a ni base de données ni CMS, donc rien à payer. Les erreurs de structure sont détectées par l'éditeur et au build.

```
src/content/
├── categories.ts        # catégories de guides
├── destinations.ts      # fiches destinations
└── guides/
    ├── index.ts         # liste des guides publiés
    └── *.ts             # un fichier par guide
```

**Ajouter un guide :** dupliquez un fichier de `src/content/guides/`, modifiez-le, puis ajoutez-le dans `guides/index.ts`. Lancez ensuite `npm test` pour vérifier les liens internes et les références.

**Règles SEO vérifiées par `npm test` :** titre de guide ≤ 60 caractères (au-delà, Google le tronque), description entre 110 et 160 caractères, titres et descriptions uniques. Les destinations et catégories acceptent un champ `seoDescription` facultatif. Sans lui, leur résumé est complété automatiquement. Une catégorie n'est indexée qu'à partir de son premier guide publié (sans `demo: true`).

Dans les textes, deux mises en forme sont disponibles : `**gras**` et `[lien](/guides/slug)`. Les types de blocs (`p`, `h3`, `list`, `tip`, `warning`, `image`, `affiliate`) sont décrits dans `src/lib/types.ts`.

**Photos :** les 16 photos actuelles proviennent de Wikimedia Commons, sous licence libre (CC0, CC BY, CC BY-SA). Leur auteur, leur licence et leur source sont enregistrés dans `src/content/photos.ts`. Le crédit s'affiche sous chaque photo et sur la page `/credits`, comme l'exigent ces licences. Pour ajouter une photo :

1. placez le fichier dans `public/images/` (environ 1280 px de large suffit) ;
2. ajoutez une entrée dans `src/content/photos.ts` (auteur, licence, lien vers la licence, page source) ;
3. utilisez `cover: { ...photo("mon-id"), alt: "Description précise de la photo" }`.

`npm test` vérifie que chaque photo existe et possède un crédit complet. Sans `src`, une illustration de remplacement s'affiche. `next/image` sert automatiquement les formats AVIF/WebP aux bonnes dimensions (par exemple 433 Ko → 36 Ko en AVIF à 640 px).

**Animations :** elles sont écrites en CSS (`src/app/globals.css`), sans bibliothèque JavaScript :
- entrée de l'en-tête de l'accueil et zoom lent sur la photo ;
- apparition des cartes au défilement ;
- barre de progression de lecture et ombre de l'en-tête au défilement ;
- zoom des photos au survol ;
- transitions entre pages, où l'image d'une carte « glisse » vers la page de détail (`<ViewTransition>` de React).

Toutes sont désactivées si l'utilisateur a demandé à réduire les animations, et les navigateurs qui ne les gèrent pas affichent simplement le contenu.

> Si vous souhaitez plus tard publier sans toucher au code, un CMS « Git » gratuit (Decap CMS, Keystatic, TinaCMS…) peut éditer ces fichiers. Comparez leurs limites et leurs offres avant de choisir.

## Configuration

L'identité du site (nom, slogan, description, navigation) se trouve dans `src/config/site.ts`. Les variables d'environnement sont listées dans [`.env.example`](.env.example) :

| Variable                     | Utilité                                                          |
| ---------------------------- | ---------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`       | Domaine définitif (URL canoniques, sitemap, Open Graph)          |
| `NEXT_PUBLIC_CONTACT_EMAIL`  | Adresse affichée sur la page Contact                             |
| `GOOGLE_SITE_VERIFICATION`   | Code de vérification Google Search Console (balise meta)         |
| `NEXT_PUBLIC_ADS_ENABLED`    | `true` pour activer les emplacements publicitaires               |
| `NEXT_PUBLIC_ADS_CLIENT_ID`  | Identifiant fourni par la régie                                  |
| `RESEND_API_KEY` 🔒          | Active le formulaire de contact (clé [Resend](https://resend.com), offre gratuite) |
| `CONTACT_TO_EMAIL` 🔒        | Adresse qui reçoit les messages du formulaire                    |
| `CONTACT_FROM_EMAIL` 🔒      | Expéditeur sur un domaine vérifié chez Resend (facultatif au début) |

🔒 = variable privée, à définir uniquement dans Vercel, jamais dans le code ni dans un fichier commité.

**Formulaire de contact :** il n'apparaît que si `RESEND_API_KEY` et `CONTACT_TO_EMAIL` sont définies. Sinon, la page Contact affiche l'adresse e-mail publique. Les messages sont validés côté serveur et protégés contre les robots par un champ piège ; ils sont envoyés par e-mail et jamais stockés par le site. La page étant générée au build, **redéployez après avoir ajouté ces variables**. Au-delà de quelques messages par jour, ajoutez une limitation de débit (par exemple le pare-feu de Vercel).

## Sécurité et qualité

- En-têtes HTTP : `Content-Security-Policy` (aucune ressource tierce autorisée), `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `nosniff`. Si vous ajoutez un service externe (mesure d'audience, publicité, vidéos), élargissez la CSP dans `next.config.ts`.
- Intégration continue : `.github/workflows/ci.yml` lance le lint, les tests et le build à chaque push sur `main` et à chaque pull request.
- Pages d'erreur : `not-found.tsx` (404), `error.tsx` (erreur d'une page) et `global-error.tsx` (erreur du layout racine).
- Partage d'article sans script tiers : partage natif du téléphone, WhatsApp, Facebook, X, e-mail et copie du lien.
- Flux RSS des guides publiés : `/rss.xml`.

## SEO

- Titres, descriptions et URL canoniques propres à chaque page (`src/lib/seo.ts`).
- Images Open Graph générées au build (`opengraph-image.tsx`).
- `sitemap.xml` et `robots.txt` générés automatiquement. Les déploiements de prévisualisation Vercel sont exclus de l'indexation.
- Données structurées Schema.org : `Organization`, `WebSite`, `BreadcrumbList`, `Article`, `TouristDestination`, toutes cohérentes avec le contenu visible.
- Un seul H1 par page, un fil d'Ariane, des liens internes et des textes alternatifs obligatoires (vérifiés par les tests).

**Google Search Console :** ajoutez votre domaine, choisissez la vérification par balise HTML, copiez la valeur `content` dans `GOOGLE_SITE_VERIFICATION`, redéployez, puis soumettez `https://votre-domaine/sitemap.xml`.

**Mesure d'audience :** aucun outil n'est installé. Avant d'en ajouter un, choisissez de préférence une solution sans cookies. Mettez à jour les pages Confidentialité et Cookies et, si l'outil dépose des cookies non essentiels, installez un outil de consentement conforme.

## Monétisation

Rien n'est actif par défaut : pas de publicité, pas de traceur, pas de bandeau de consentement.

- **Publicité :** le composant `<AdSlot />` (déjà placé en fin d'article) ne rend rien tant que `NEXT_PUBLIC_ADS_ENABLED` et `NEXT_PUBLIC_ADS_CLIENT_ID` ne sont pas définis. Une fois activé, il réserve l'espace sans charger aucun script. Pour brancher une régie, il faut d'abord une **plateforme de gestion du consentement (CMP)** certifiée, exigée notamment par Google AdSense dans l'EEE et au Royaume-Uni.
- **Affiliation :** déclarez vos partenaires dans `src/config/monetization.ts`, puis utilisez un bloc `affiliate` dans un guide. Les liens portent `rel="sponsored"` et la mention « Lien partenaire ». Un encadré de transparence s'affiche automatiquement en tête de l'article. Un bloc dont le partenaire n'est pas configuré est masqué en production.

> **À vérifier avant toute utilisation commerciale :**
> - les règles des plateformes publicitaires et d'affiliation (contenus autorisés, mentions, consentement) ;
> - les conditions du plan Vercel : le plan **Hobby** (gratuit) est réservé à un usage **personnel et non commercial**. Un site qui diffuse de la publicité ou des liens affiliés relève en principe d'un plan payant (Pro) ;
> - les obligations légales de votre pays (mentions légales, protection des données : RGPD, loi marocaine 09-08…).

## Déployer sur Vercel

1. Poussez le dépôt sur GitHub.
2. Sur [vercel.com/new](https://vercel.com/new), importez le dépôt. Next.js est détecté automatiquement : gardez la commande `next build` et le dossier de sortie par défaut.
3. Dans **Settings → Environment Variables**, ajoutez au minimum `NEXT_PUBLIC_SITE_URL` (et `NEXT_PUBLIC_CONTACT_EMAIL`) pour l'environnement **Production**.
4. Déployez, puis ajoutez votre domaine dans **Settings → Domains**. Mettez `NEXT_PUBLIC_SITE_URL` à jour si le domaine change et redéployez.
5. Après la mise en ligne, vérifiez `/robots.txt` et `/sitemap.xml`, puis déclarez le site dans Google Search Console.

Les prévisualisations (branches, pull requests) reçoivent `robots: noindex` et un `robots.txt` qui bloque l'exploration.

## Avant la mise en ligne

- [ ] Remplacer les contenus d'exemple et retirer `demo: true`.
- [ ] Compléter les photos, idéalement avec les vôtres : des photos originales renforcent la crédibilité du site.
- [ ] Compléter les champs `[À compléter]` des pages légales.
- [ ] Définir `NEXT_PUBLIC_SITE_URL` et `NEXT_PUBLIC_CONTACT_EMAIL`.
- [ ] Vérifier que le plan Vercel choisi correspond à l'usage, commercial ou non.
