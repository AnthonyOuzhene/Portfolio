import { createMemoryHistory } from 'vue-router';
import { renderToString } from 'vue/server-renderer';
import { createPortfolioApp } from './app.js';

/**
 * Renders one page to HTML at build time (used by scripts/prerender.js).
 *
 * @param url    the page path, e.g. "/" or "/projets/oflix"
 * @param state  the content this page needs: { home, journey, projects }
 */
export async function render(url, state) {
  const { app, router } = createPortfolioApp({
    history: createMemoryHistory(),
    initialState: state,
    hydrate: true,
  });

  await router.push(url);
  await router.isReady();

  return renderToString(app);
}
