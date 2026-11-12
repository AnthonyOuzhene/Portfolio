import { createApp, createSSRApp } from 'vue';
import App from './App.vue';
import { createAppRouter } from './router.js';
import { createStore, storeKey } from './store.js';
import { vReveal } from './composables/reveal.js';

/**
 * Builds the app, shared by the browser (entry-client.js) and the build-time
 * pre-rendering (entry-server.js).
 *
 * @param history       vue-router history (web in the browser, memory when pre-rendering)
 * @param initialState  content already known: { home, journey, projects }
 * @param hydrate       true when taking over server-generated HTML
 */
export function createPortfolioApp({ history, initialState = {}, hydrate = false }) {
  const app = hydrate ? createSSRApp(App) : createApp(App);
  const router = createAppRouter(history);
  const store = createStore(initialState);

  app.use(router);
  app.provide(storeKey, store);
  app.directive('reveal', vReveal);

  return { app, router, store };
}
