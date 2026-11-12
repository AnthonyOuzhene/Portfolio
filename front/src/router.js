import { createRouter } from 'vue-router';
import HomeView from './views/HomeView.vue';
// Imported directly (not lazy-loaded) so their CSS is in the main stylesheet:
// a pre-rendered /parcours or /projets/… page is then styled before any JS runs.
import ProjectView from './views/ProjectView.vue';
import JourneyView from './views/JourneyView.vue';
import NotFoundView from './views/NotFoundView.vue';

const SITE = 'Anthony Ouzhene';

function waitFor(selector, timeout = 3000) {
  return new Promise((resolve) => {
    const start = performance.now();
    const check = () => {
      if (document.querySelector(selector)) return resolve(true);
      if (performance.now() - start > timeout) return resolve(false);
      requestAnimationFrame(check);
    };
    check();
  });
}

const routes = [
  { path: '/', name: 'home', component: HomeView, meta: { title: `${SITE} · Développeur web passionné` } },
  { path: '/projets/:slug', name: 'project', component: ProjectView },
  { path: '/parcours', name: 'journey', component: JourneyView, meta: { title: `Parcours · ${SITE}` } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView, meta: { title: `Page introuvable · ${SITE}` } },
];

/**
 * A new router per app: web history in the browser, memory history when
 * pre-rendering pages at build time.
 */
export function createAppRouter(history) {
  const router = createRouter({
    history,
    routes,
    async scrollBehavior(to, from, saved) {
      if (saved) return saved;
      if (to.hash) {
        // Sections only exist once the page transition is done and content is loaded.
        const found = await waitFor(to.hash);
        return found ? { el: to.hash, top: 80, behavior: from.name === to.name ? 'smooth' : 'instant' } : { top: 0 };
      }
      return { top: 0 };
    },
  });

  router.afterEach((to) => {
    if (to.meta.title && typeof document !== 'undefined') document.title = to.meta.title;
  });

  return router;
}
