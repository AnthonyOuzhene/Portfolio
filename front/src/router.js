import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './views/HomeView.vue';

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
  { path: '/projets/:slug', name: 'project', component: () => import('./views/ProjectView.vue') },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('./views/NotFoundView.vue'), meta: { title: `Page introuvable · ${SITE}` } },
];

const router = createRouter({
  history: createWebHistory(),
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
  if (to.meta.title) document.title = to.meta.title;
});

export default router;
