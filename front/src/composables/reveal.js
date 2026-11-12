// v-reveal: fades/slides an element in the first time it enters the viewport.
// Usage: <div v-reveal> or <div v-reveal="120"> (delay in ms).

let observer;

function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
  );
  return observer;
}

export const vReveal = {
  // Pre-rendering: output the same class/delay the browser will add, so the
  // page doesn't change when the app takes over the server-generated HTML.
  getSSRProps({ value }) {
    return value ? { class: 'reveal', style: { '--reveal-delay': `${value}ms` } } : { class: 'reveal' };
  },
  mounted(el, { value }) {
    el.classList.add('reveal');
    if (value) el.style.setProperty('--reveal-delay', `${value}ms`);
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-revealed');
      return;
    }
    getObserver().observe(el);
  },
  unmounted(el) {
    observer?.unobserve(el);
  },
};
