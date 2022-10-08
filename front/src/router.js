// on importe les fonctions de vue router depuis la dépendance vue-router
import { createRouter, createWebHistory } from 'vue-router';

// on récupère les composants à utiliser avec notre router
import HomeView from "./views/HomeView.vue";
import SkillsView from "./views/SkillsView.vue";
import PortfolioView from "./views/PortfolioView.vue";
import SeoView from "./views/SeoView.vue";
import BlogView from "./views/BlogView.vue";
import PostSingleView from './views/PostSingleView.vue'
import ContactView from "./views/ContactView.vue";
import NotFoundView from "./views/NotFoundView.vue";


// on définit des routes. C'est un array qui contient des objets sours la forme {path, component} (on ne choisit pes les noms de propriétés)
// chaque objet est une correspondance entre un chemin et un composant
const routes = [
    { path: '/', component: HomeView, name: "homepage" },
    { path: '/competences', component: SkillsView, name: "skills" },
    { path: '/portfolio', component: PortfolioView, name: "portfolio" },
    { path: '/seo', component: SeoView, name: "seo" },
    { path: '/blog', component: BlogView, name: "blog" },
    { path: '/blog/:postId', component: PostSingleView, name: "post" },
    { path: '/contact', component: ContactView, name: "contact" },
    { path: '/:pathMatch(.*)*', component: NotFoundView, name: "error"},
]


// on instancie VueRouter avec la fonction createRouter
const router = createRouter({
    // on utilise le mode d'historique "HTML5" => urls classiques ex. /register
    history: createWebHistory(process.env.APP_URL),
    routes, // short for `routes: routes`
});

// on exporte l'instance de VueRouter créée
export default router;