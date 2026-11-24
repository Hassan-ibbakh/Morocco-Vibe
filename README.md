# Morocco Vibe

Site de guides de voyage sur le Maroc, en français, construit avec **Next.js 16** (App Router, Cache Components), **TypeScript** et **Tailwind CSS 4**. Toutes les pages sont générées statiquement : le site est rapide, peu coûteux à héberger et prêt pour Vercel.

Le contenu se gère depuis un **tableau de bord d'administration** sur `/keystatic`, avec connexion GitHub en production (voir « Gérer le contenu »).

> ⚠️ Les 5 destinations et les 10 premiers guides sont des **exemples** (case « Exemple à vérifier »). Ils affichent un bandeau « Exemple », sont en `noindex` et sont exclus du sitemap. Relisez-les, puis décochez la case pour les publier. Les 12 autres guides sont publiés.

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
| `npm run nouveau-guide -- "Titre"` | Crée un brouillon d'article en ligne de commande       |

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
| `/plan-du-site`                | Toutes les pages du site, classées par rubrique             |
| `/rss.xml`                     | Flux RSS des guides publiés                                 |
| `/keystatic`                   | Tableau de bord d'administration (non indexé)               |

Chaque page a sa propre adresse, ses propres titre et description, et peut être partagée ou indexée séparément. Dans l'en-tête, les rubriques **Destinations** et **Guides** ouvrent un menu déroulant vers leurs sous-pages ; sur mobile, ces sous-pages sont listées dans le menu.

Une URL inconnue renvoie un vrai code **404**, et `/guides/page/1` redirige en **308** vers `/guides`.

## Gérer le contenu

Le contenu est stocké dans des fichiers du dépôt, modifiables depuis un **tableau de bord d'administration** (Keystatic) : pas de base de données, rien à payer.

```
content/
├── settings.yaml        # réglages du site (nom, slogan, textes de l'accueil…)
├── categories/*.yaml    # catégories de guides
├── destinations/*.yaml  # fiches destinations
└── guides/*.mdoc        # articles : en-tête (titre, description…) + texte
public/images/
├── guides/<slug>/       # photos des articles
└── destinations/<slug>/ # photos des destinations
```

### Tableau de bord d'administration (`/keystatic`)

Le tableau de bord permet de gérer, sans toucher au code :
- les **articles** : titre, description, chapeau, catégorie, destination, photo de couverture, texte avec titres, listes, liens, images et encadrés « Conseil », « Attention » et « Lien partenaire » ;
- les **destinations** et les **catégories** ;
- les **réglages du site** : nom, slogan, description, e-mail public, réseaux sociaux et textes de l'en-tête de l'accueil.

Les limites SEO (titre de 60 caractères maximum, description de 110 à 160 caractères) sont vérifiées directement dans les formulaires.

**En local** : lancez `npm run dev` et ouvrez `http://localhost:3000/keystatic`. Aucune connexion n'est demandée : les modifications sont écrites directement dans les fichiers du dossier `content/`, et le site les affiche aussitôt. Il suffit ensuite de commiter et de pousser. Seuls les changements de **réglages du site** demandent de relancer `npm run dev`.

**En ligne** : `https://votre-domaine/keystatic` demande une **connexion avec GitHub**. Seules les personnes qui ont un accès en écriture au dépôt peuvent se connecter. Chaque clic sur « Sauvegarder » crée un commit sur `main`, et Vercel republie le site en une à deux minutes.

#### Mise en service de la connexion GitHub (une seule fois)

1. En local, activez le mode GitHub : ajoutez `NEXT_PUBLIC_KEYSTATIC_STORAGE=github` dans `.env.local`, lancez `npm run dev` et ouvrez `http://localhost:3000/keystatic`.
2. Keystatic propose de **créer une application GitHub** : suivez l'assistant en étant connecté à votre compte GitHub. Il écrit dans le fichier `.env` (ignoré par Git) les variables `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET` et `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`.
3. Installez l'application GitHub sur le dépôt `Morocco-Vibe` si l'assistant le demande.
4. Copiez ces quatre variables dans **Vercel → Settings → Environment Variables** (environnement Production), puis redéployez.
5. Sur GitHub (**Settings → Developer settings → GitHub Apps →** votre application), ajoutez l'adresse de retour de production : `https://votre-domaine/api/keystatic/github/oauth/callback`.
6. Retirez `NEXT_PUBLIC_KEYSTATIC_STORAGE=github` de `.env.local` pour revenir au mode local.

Tant que ces variables ne sont pas définies en production, `/keystatic` s'affiche mais la connexion est refusée (l'API répond « non configuré ») ; le site lui-même fonctionne normalement. Ne commitez jamais `.env` ni `.env.local`.

### Écrire un article de blog

1. **Créer** : dans le tableau de bord, ouvrez **Articles (guides) → Ajouter**. Vous pouvez aussi créer un brouillon en ligne de commande :
   ```bash
   npm run nouveau-guide -- "Visiter Meknès en une journée" --categorie que-faire --destination fes
   ```
2. **Écrire** : chaque titre de niveau 2 devient une partie du sommaire. Ajoutez une photo de couverture et décrivez-la (texte alternatif). Si la photo n'est pas la vôtre, indiquez son crédit.
3. **Relire** : cochez « Brouillon » pendant l'écriture. Un brouillon est visible en local et sur les prévisualisations Vercel, mais **jamais sur le site en ligne**.
4. **Publier** : décochez « Brouillon » et sauvegardez. L'article apparaît sur le site, dans le sitemap et dans le flux RSS.

La case « Exemple à vérifier » (`demo`) affiche un bandeau « Exemple » et exclut la page de Google : elle sert aux contenus à relire avant publication.

**Règles vérifiées par `npm test`** (et par l'intégration continue à chaque push) : titre de guide de 60 caractères maximum, description de 110 à 160 caractères, titres et descriptions uniques, catégories et destinations existantes, liens internes valides, photos présentes. Une catégorie n'est indexée qu'à partir de son premier article publié.

**Photos :** les photos actuelles proviennent de Wikimedia Commons, sous licence libre (CC0, CC BY, CC BY-SA). Leur auteur, leur licence et leur source sont enregistrés dans `src/content/photos.ts`, et le crédit s'affiche sous chaque photo et sur la page `/credits`, comme l'exigent ces licences. Pour une photo ajoutée depuis le tableau de bord, le champ « Crédit photo » joue ce rôle. Sans photo, une illustration de remplacement s'affiche. `next/image` sert automatiquement les formats AVIF/WebP aux bonnes dimensions.

**Animations et effets 3D :** ils sont écrits en CSS (`src/app/globals.css`) avec quelques petits composants, sans bibliothèque JavaScript :
- **accueil** : chaque mot du titre bascule en 3D, l'un après l'autre ; « ville après ville » est animé d'un reflet doré ; la photo zoome lentement ; les étoiles de zellige flottent en 3D ;
- **profondeur à la souris** (`Parallax.tsx`) : la photo, les étoiles et la carte « Par où commencer ? » se déplacent à des vitesses différentes ;
- **carrousel 3D des destinations** (`Carousel3D.tsx`) : rotation automatique, mise en pause au survol, au focus ou avec le bouton pause, flèches et points de navigation ;
- **cartes inclinables** (`Tilt.tsx`) : les cartes de guides et de destinations s'inclinent en suivant la souris, avec un reflet lumineux ;
- **bandeau défilant** des destinations et catégories sous l'en-tête de l'accueil ;
- **défilement** : apparition des cartes avec une bascule 3D, en décalé, barre de progression de lecture, ombre de l'en-tête ;
- **navigation** : menus déroulants qui s'ouvrent en 3D, soulignement animé, reflet sur les boutons, titres de page animés ;
- **transitions entre pages** : l'image d'une carte « glisse » vers la page de détail (`<ViewTransition>` de React).

Les effets à la souris ne s'activent pas sur écran tactile. Tout est désactivé si l'utilisateur a demandé à réduire les animations, et les navigateurs qui ne gèrent pas un effet affichent simplement le contenu.

> Si vous souhaitez plus tard publier sans toucher au code, un CMS « Git » gratuit (Decap CMS, Keystatic, TinaCMS…) peut éditer ces fichiers. Comparez leurs limites et leurs offres avant de choisir.

## Configuration

Le nom, le slogan, la description et les textes de l'accueil se modifient dans le tableau de bord (**Réglages du site**) ; la navigation se trouve dans `src/config/site.ts`. Les variables d'environnement sont listées dans [`.env.example`](.env.example) :

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
| `KEYSTATIC_GITHUB_CLIENT_ID` 🔒, `KEYSTATIC_GITHUB_CLIENT_SECRET` 🔒, `KEYSTATIC_SECRET` 🔒, `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | Connexion au tableau de bord en production (voir « Mise en service de la connexion GitHub ») |

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

- [ ] Relire les contenus d'exemple et décocher « Exemple à vérifier » dans le tableau de bord.
- [ ] Mettre en service la connexion GitHub du tableau de bord.
- [ ] Compléter les photos, idéalement avec les vôtres : des photos originales renforcent la crédibilité du site.
- [ ] Compléter les champs `[À compléter]` des pages légales.
- [ ] Définir `NEXT_PUBLIC_SITE_URL` et `NEXT_PUBLIC_CONTACT_EMAIL`.
- [ ] Vérifier que le plan Vercel choisi correspond à l'usage, commercial ou non.
