import { shallowRef } from 'vue';
import { api } from '../api.js';

// Site content (profile, skills, projects, writing) is fetched once and shared
// between the header, the home sections and the footer.
const data = shallowRef(null);
const error = shallowRef(null);
let pending = null;

function load() {
  pending ??= api
    .home()
    .then((result) => (data.value = result))
    .catch((e) => {
      error.value = e;
      pending = null; // allow a retry
    });
  return pending;
}

export function useSiteData() {
  if (!data.value) load();
  return {
    data,
    error,
    retry: () => {
      error.value = null;
      return load();
    },
  };
}
