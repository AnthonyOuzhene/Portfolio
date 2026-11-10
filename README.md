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
| `npm run build` | build du front dans `front/dist`                                             |
| `npm start`     | serveur de production : l'API sert aussi `front/dist` (un seul process Node) |

## Modifier le contenu

Tout le contenu se trouve dans `back/src/data/` :

- `profile.json` : présentation, liens, réseaux sociaux
- `skills.json` : groupes de compétences
- `projects.json` : projets (un `slug` par projet, qui donne l'URL `/projets/<slug>`)
- `writing.json` : références en rédaction web

Les images vont dans `front/public/images/…` et se référencent en `/images/…`.

## Formulaire de contact

Copier `back/.env.example` vers `back/.env` et renseigner les variables `SMTP_*`.
Sans configuration SMTP, les messages sont simplement affichés dans la console du serveur.
Protections : validation (zod), honeypot anti-bot, limite de 5 envois / 15 min / IP.
