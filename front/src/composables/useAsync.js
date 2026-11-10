import { ref, shallowRef, watchEffect } from 'vue';

/**
 * Runs an async loader and exposes { data, error, loading }.
 * The loader re-runs whenever reactive sources it reads change.
 */
export function useAsync(loader) {
  const data = shallowRef(null);
  const error = shallowRef(null);
  const loading = ref(true);

  watchEffect(async (onCleanup) => {
    let cancelled = false;
    onCleanup(() => (cancelled = true));

    loading.value = true;
    error.value = null;
    try {
      const result = await loader();
      if (!cancelled) data.value = result;
    } catch (e) {
      if (!cancelled) error.value = e;
    } finally {
      if (!cancelled) loading.value = false;
    }
  });

  return { data, error, loading };
}
