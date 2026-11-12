# Mise en ligne sur o2switch

Guide pas à pas pour publier le portfolio sur **https://www.anthonyouzhene.com** avec l'hébergement o2switch.

Le site est une application Node.js : un seul serveur Express (`back/src/index.js`) sert à la fois l'API
(`/api/...`) et les pages pré-générées (`front/dist`). Chez o2switch, elle tourne grâce à l'outil cPanel
**« Setup Node.js App »** (Phusion Passenger), qui démarre l'application et la relie au domaine.

```
www.anthonyouzhene.com ──► o2switch (Apache + Passenger) ──► back/src/index.js (Express)
                                                              ├── /api/contact  formulaire de contact
                                                              └── front/dist    pages HTML, images, sitemap
```

> Documentation o2switch : [Déployer une application NodeJS](https://faq.o2switch.fr/cpanel/logiciels/hebergement-nodejs-multi-version/)
> et [Utiliser node / npm en SSH](https://faq.o2switch.fr/guides/nodejs/utiliser-binaire-nodejs-npm-yarn/).

---

## 1. Prérequis

- Une offre o2switch active et l'accès à **cPanel**.
- L'accès **SSH** au serveur (si o2switch demande d'autoriser ton adresse IP, le faire depuis cPanel).
- Le domaine `anthonyouzhene.com`.
- Le code à jour sur GitHub, sur la branche **`main`** : commiter le travail en cours, fusionner `develop`
  dans `main` (Pull Request sur GitHub ou `git merge`), puis `git push`. C'est `main` que le serveur récupère.

## 2. Domaine et HTTPS

1. **Rattacher le domaine à o2switch**
   - Domaine acheté chez o2switch : rien à faire.
   - Domaine acheté ailleurs : chez le registrar, faire pointer le domaine vers o2switch (serveurs DNS
     o2switch ou enregistrement A indiqués dans ton espace client), puis l'ajouter dans cPanel → **Domaines**.
2. **Certificat SSL** : cPanel → **Statut SSL/TLS** : vérifier que le certificat gratuit (AutoSSL / Let's Encrypt)
   couvre `anthonyouzhene.com` **et** `www.anthonyouzhene.com`. Le lancer si besoin.
3. **Forcer le HTTPS** : cPanel → **Domaines** → activer la redirection HTTPS pour le domaine.
4. **Une seule adresse** : le site vit sur `www`. Créer une redirection permanente (301) de
   `anthonyouzhene.com` vers `https://www.anthonyouzhene.com` (cPanel → **Redirections**).

> Si l'ancien site (WordPress) est hébergé ailleurs, il reste en ligne tant que le domaine pointe vers son
> ancien hébergeur : le basculement se fait au changement de DNS (étape 1).

> ⚠️ **Sous-domaines** : le serveur envoie l'en-tête de sécurité HSTS avec `includeSubDomains`, qui oblige les
> navigateurs à utiliser HTTPS sur **tous** les sous-domaines de `anthonyouzhene.com` pendant un an. Avant la
> mise en ligne, vérifier que chaque sous-domaine encore utilisé (ex. l'ancien `wp-admin.anthonyouzhene.com`)
> a un certificat SSL, ou le supprimer s'il ne sert plus.

## 3. Adresse e-mail pour le formulaire de contact

1. cPanel → **Comptes de messagerie** → créer par exemple `contact@anthonyouzhene.com`.
2. Dans les options de ce compte (« Connecter des appareils » / configuration du client de messagerie),
   relever les paramètres **SMTP** : serveur sortant, port (généralement **465** en SSL), identifiant (l'adresse
   complète) et mot de passe. Ils serviront à l'étape 5.

## 4. Récupérer le code sur le serveur

En SSH, dans un dossier **hors de `public_html`** (sinon les fichiers du projet seraient publics si
l'application s'arrêtait) :

```bash
cd ~
git clone https://github.com/AnthonyOuzhene/Portfolio.git portfolio
cd portfolio
git checkout main
```

Le dépôt étant public, aucun identifiant n'est demandé.

## 5. Créer l'application Node.js

cPanel → **Setup Node.js App** → **Create Application** :

| Champ                        | Valeur                                                  |
| ---------------------------- | ------------------------------------------------------- |
| Node.js version              | **22** ou plus récente (le build exige Node ≥ 20.19)     |
| Application mode             | **Production**                                          |
| Application root             | `portfolio`                                             |
| Application URL              | `www.anthonyouzhene.com`                                |
| Application startup file     | `back/src/index.js`                                     |

**Variables d'environnement** (bouton « Add variable ») :

| Variable       | Valeur                                                        |
| -------------- | ------------------------------------------------------------- |
| `NODE_ENV`     | `production`                                                  |
| `SMTP_HOST`    | le serveur sortant relevé à l'étape 3                         |
| `SMTP_PORT`    | `465`                                                         |
| `SMTP_USER`    | `contact@anthonyouzhene.com`                                  |
| `SMTP_PASS`    | le mot de passe de cette adresse                              |
| `CONTACT_TO`   | l'adresse qui reçoit les messages (ex. `a.ouzhene@gmail.com`) |

> ⚠️ Le fichier `back/.env` n'est **pas** lu chez o2switch (Passenger démarre directement `back/src/index.js`) :
> les variables se saisissent uniquement ici. Ne pas définir `PORT`, Passenger s'en charge.

Valider avec **Create**. En haut de la page de l'application, cPanel affiche une commande du type :

```bash
source /home/<utilisateur>/nodevenv/portfolio/22/bin/activate && cd /home/<utilisateur>/portfolio
```

La copier : elle active la bonne version de Node pour les étapes suivantes.

## 6. Installer les dépendances et générer le site

En SSH :

```bash
source /home/<utilisateur>/nodevenv/portfolio/22/bin/activate && cd /home/<utilisateur>/portfolio
node -v                   # doit afficher v22.x (ou plus)
npm install --include=dev # inclut Vite & co, nécessaires au build même si NODE_ENV=production
npm run build             # génère front/dist : pages pré-rendues, sitemap.xml, robots.txt
```

Puis redémarrer l'application : cPanel → **Setup Node.js App** → **Restart**.

## 7. Vérifications après la mise en ligne

- [ ] `https://www.anthonyouzhene.com` s'affiche, ainsi que `/parcours` et une page projet (`/projets/oflix`).
- [ ] Une adresse inexistante (`/test-404`) affiche « Cette page s'est perdue en route ».
- [ ] `http://anthonyouzhene.com` redirige vers `https://www.anthonyouzhene.com`.
- [ ] `https://www.anthonyouzhene.com/api/health` répond `{"status":"ok"}`.
- [ ] `/sitemap.xml` et `/robots.txt` s'affichent.
- [ ] Le mode clair / sombre et la pile de projets fonctionnent.
- [ ] Un message envoyé depuis le formulaire de contact arrive bien dans ta boîte.
- [ ] L'aperçu de partage est correct dans le [Post Inspector LinkedIn](https://www.linkedin.com/post-inspector/).

## 8. Référencement (Google et IA)

1. **Google Search Console** ([search.google.com/search-console](https://search.google.com/search-console)) :
   ajouter la propriété `https://www.anthonyouzhene.com`, la valider (enregistrement DNS TXT via cPanel →
   **Éditeur de zone**, ou fichier fourni par Google), puis envoyer le sitemap
   `https://www.anthonyouzhene.com/sitemap.xml`.
2. **Bing Webmaster Tools** ([bing.com/webmasters](https://www.bing.com/webmasters)) : importer le site depuis la
   Search Console. L'index de Bing est aussi utilisé par plusieurs moteurs de réponse IA.

## 9. Mettre à jour le site

Après chaque modification (code **ou** contenu dans `content/*.json`) :

1. Sur ton poste : commit puis `git push` sur `main`.
2. En SSH sur le serveur :

   ```bash
   source /home/<utilisateur>/nodevenv/portfolio/22/bin/activate && cd /home/<utilisateur>/portfolio
   git pull
   npm install --include=dev   # seulement si des dépendances ont changé
   npm run build    # régénère les pages avec le nouveau contenu
   ```

3. cPanel → **Setup Node.js App** → **Restart** (pour servir les nouvelles pages et le nouveau code).

## 10. Dépannage

| Symptôme | Piste |
| --- | --- |
| `node` ou `npm` : « command not found » | Lancer d'abord la commande `source …/activate` de l'étape 5. |
| Erreur « NodeJS Selector demands to store node modules … symlink called node_modules » | Un vrai dossier `node_modules` existe dans `~/portfolio` (o2switch veut un lien vers son environnement Node). Le supprimer (`rm -rf node_modules`), puis relancer `npm install --include=dev` **après** la commande `source …/activate`. |
| Page d'erreur au lieu du site | Consulter le journal d'erreurs de l'application (fichier `stderr.log` dans le dossier de l'application s'il existe, ou logs Passenger), puis **Restart**. |
| Erreur « require() of ES Module … not supported » | Passenger charge le fichier de démarrage en CommonJS. Créer à la racine un fichier `app.cjs` contenant `import('./back/src/index.js');` et le déclarer comme *Application startup file*. |
| Le site répond mais les pages sont introuvables | `npm run build` n'a pas été lancé (dossier `front/dist` absent) : le lancer puis **Restart**. |
| Le formulaire de contact affiche une erreur | Vérifier les variables `SMTP_*` de l'étape 5, puis **Restart** (les variables ne sont lues qu'au démarrage). |
| L'ancien contenu s'affiche encore | Refaire `npm run build` + **Restart**, puis recharger la page sans cache (`Cmd + Maj + R`). |
