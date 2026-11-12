import { inject, reactive } from 'vue';
import { api } from './api.js';

/**
 * Site content shared by every component.
 *
 * - On a pre-rendered page, it is filled from the JSON embedded in the HTML
 *   (see entry-client.js), so nothing has to be fetched on first load.
 * - Otherwise (dev server, or navigating to a page not loaded yet), the
 *   `load*` functions fetch it from the API once and keep it.
 */
export function createStore(initial = {}) {
  return reactive({
    home: initial.home ?? null, // { profile, skills, projects, writing }
    journey: initial.journey ?? null,
    projects: initial.projects ?? {}, // slug -> project detail
    errors: {}, // key -> error of the last failed load
  });
}

export const storeKey = Symbol('store');

export function useStore() {
  return inject(storeKey);
}

const pending = new Map();

// Fetches once per key; errors are kept in store.errors so the UI can offer a retry.
function loadOnce(store, key, fetcher, assign) {
  if (import.meta.env.SSR || pending.has(key)) return pending.get(key);
  delete store.errors[key];
  const promise = fetcher()
    .then(assign)
    .catch((error) => {
      store.errors[key] = error;
    })
    .finally(() => pending.delete(key));
  pending.set(key, promise);
  return promise;
}

export const loadHome = (store) => loadOnce(store, 'home', api.home, (data) => (store.home = data));

export const loadJourney = (store) => loadOnce(store, 'journey', api.journey, (data) => (store.journey = data));

export const loadProject = (store, slug) =>
  loadOnce(store, `project:${slug}`, () => api.project(slug), (data) => (store.projects[slug] = data));
