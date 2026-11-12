import { onBeforeUnmount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

/**
 * Scroll spy for the home page: tells which section (by id) is crossing the
 * middle of the screen, so the matching menu link can be highlighted.
 *
 * - `activeId` is null while the hero (top of the page) is in view.
 * - `setActive(id)` highlights a link immediately on click and pauses the spy
 *   during the smooth scroll, so the sections scrolled past don't flicker.
 */
export function useScrollSpy(ids) {
  const route = useRoute();
  const activeId = ref(null);

  let observer = null;
  let retryTimer = null;
  let lockedUntil = 0;

  function stop() {
    observer?.disconnect();
    observer = null;
    clearTimeout(retryTimer);
  }

  // Sections only exist once the home page has loaded its content (and finished
  // its page transition), so we retry for a few seconds until they are all there.
  function start(attempt = 0) {
    if (typeof document === 'undefined') return; // pre-rendering: no page to observe
    const hero = document.querySelector('.home .hero');
    const sections = ids.map((id) => document.getElementById(id));
    if (!hero || sections.some((s) => !s)) {
      if (attempt < 40) retryTimer = setTimeout(() => start(attempt + 1), 150);
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < lockedUntil) return;
        for (const entry of entries) {
          if (entry.isIntersecting) activeId.value = entry.target.id || null;
        }
      },
      // A thin band in the middle of the viewport: the section crossing it is "active".
      { rootMargin: '-45% 0px -50% 0px' },
    );
    [hero, ...sections].forEach((el) => observer.observe(el));
  }

  watch(
    () => route.name,
    (name) => {
      stop();
      activeId.value = route.hash ? route.hash.slice(1) : null;
      if (name === 'home') start();
    },
    { immediate: true },
  );

  onBeforeUnmount(stop);

  return {
    activeId,
    setActive(id) {
      activeId.value = id;
      lockedUntil = Date.now() + 1000;
    },
  };
}
