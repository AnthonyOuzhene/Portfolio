# Portfolio — Anthony Ouzhene

Portfolio personnel : un front **Vue 3 + Vite** et une API **Node.js + Express**.

```
.
├── front/   Vue 3 (Composition API), Vite, CSS natif
│   ├── public/images   visuels des projets et de la rédaction
│   └── src/            composants, vues, composables
└── back/    API Express 5
    ├── src/data/       contenu du site (JSON) ← c'est ici qu'on modifie les textes
    ├── src/routes/     /api/home, /api/projects/:slug, /api/contact…
    └── test/           tests Vitest + Supertest
```

## Prérequis

Node.js ≥ 20.19 (`nvm use` lit le `.nvmrc`).

## Démarrer

```bash
npm install
npm run dev      # API sur :3000 + front sur http://localhost:5173 (proxy /api)
```

## Commandes

| Commande        | Rôle                                                                         |
| --------------- | ---------------------------------------------------------------------------- |
| `npm run dev`   | front + API en mode développement                                            |
| `npm test`      | tests de l'API                                                               |
| `npm run build` | build du front + pré-rendu des pages dans `front/dist` (voir ci-dessous)     |
| `npm start`     | serveur de production : l'API sert aussi `front/dist` (un seul process Node) |

## Modifier le contenu

Tout le contenu se trouve dans `back/src/data/` :

- `profile.json` : présentation, liens, réseaux sociaux
- `skills.json` : groupes de compétences
- `projects.json` : projets (un `slug` par projet, qui donne l'URL `/projets/<slug>`)
- `writing.json` : références en rédaction web
- `journey.json` : page Parcours (expériences, formations, langues)

Les images vont dans `front/public/images/…` et se référencent en `/images/…`.

> En production, **relancer `npm run build` après chaque modification du contenu** : les pages sont générées à partir de ces fichiers au moment du build.

## Référencement (SEO / GEO)

`npm run build` génère chaque page en HTML complet (`front/scripts/prerender.js`), pour que Google
et les robots des IA lisent le contenu sans exécuter de JavaScript :

- une page par URL : `/`, `/parcours`, `/projets/<slug>`, plus `404.html` (servie avec un vrai code 404) ;
- pour chaque page : titre, description, URL canonique, aperçu de partage (Open Graph / Twitter) et données structurées JSON-LD ;
- `sitemap.xml` et `robots.txt`.

L'adresse du site vaut `https://www.anthonyouzhene.com` par défaut ; pour une autre adresse :
`SITE_URL=https://exemple.fr npm run build`.

En développement (`npm run dev`), rien ne change : les pages sont rendues dans le navigateur.

## Formulaire de contact

Copier `back/.env.example` vers `back/.env` et renseigner les variables `SMTP_*`.
Sans configuration SMTP, les messages sont simplement affichés dans la console du serveur.
Protections : validation (zod), honeypot anti-bot, limite de 5 envois / 15 min / IP.
