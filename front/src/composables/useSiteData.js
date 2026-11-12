import { computed } from 'vue';
import { loadHome, useStore } from '../store.js';

// Site content (profile, skills, projects, writing), shared between the header,
// the home sections and the footer. Already present on pre-rendered pages,
// fetched once from the API otherwise.
export function useSiteData() {
  const store = useStore();
  if (!store.home) loadHome(store);

  return {
    data: computed(() => store.home),
    error: computed(() => store.errors.home ?? null),
    retry: () => loadHome(store),
  };
}
