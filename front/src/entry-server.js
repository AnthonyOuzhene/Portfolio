import { createMemoryHistory } from 'vue-router';
import { renderToString } from 'vue/server-renderer';
import { createPortfolioApp } from './app.js';

// The pre-rendering script also needs the content to build each page's <head>.
export * as content from './content.js';

/** Renders one page (e.g. "/" or "/projets/oflix") to HTML at build time — used by scripts/prerender.js. */
export async function render(url) {
  const { app, router } = createPortfolioApp({ history: createMemoryHistory(), hydrate: true });

  await router.push(url);
  await router.isReady();

  return renderToString(app);
}
