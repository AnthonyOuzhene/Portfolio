<script setup>
import { computed, onMounted } from 'vue';
import { useTheme } from '../composables/useTheme.js';
import AppIcon from './AppIcon.vue';

const { theme, toggle, syncFromDocument } = useTheme();
const isLight = computed(() => theme.value === 'light');

// The pre-rendered HTML doesn't know the visitor's theme: sync once in the browser.
onMounted(syncFromDocument);
</script>

<template>
  <!-- Both icons are rendered; CSS shows the right one from <html data-theme>,
       so a light-mode visitor never sees the wrong icon flash on load. -->
  <button
    type="button"
    class="theme-toggle"
    :aria-label="isLight ? 'Passer en mode sombre' : 'Passer en mode clair'"
    :title="isLight ? 'Mode sombre' : 'Mode clair'"
    @click="toggle"
  >
    <span class="theme-toggle__icon theme-toggle__icon--sun"><AppIcon name="sun" /></span>
    <span class="theme-toggle__icon theme-toggle__icon--moon"><AppIcon name="moon" /></span>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid var(--border-strong);
  font-size: 1.1rem;
  color: var(--text);
  transition:
    background 0.2s,
    border-color 0.2s;
}

.theme-toggle:hover {
  background: var(--surface-hover);
}

/* Both icons stacked in the same cell; the inactive one spins out. */
.theme-toggle__icon {
  grid-area: 1 / 1;
  display: grid;
  transition:
    opacity 0.2s,
    transform 0.3s var(--ease-out);
}

.theme-toggle__icon--moon,
:root[data-theme='light'] .theme-toggle__icon--sun {
  opacity: 0;
  transform: rotate(90deg) scale(0.6);
}

:root[data-theme='light'] .theme-toggle__icon--moon {
  opacity: 1;
  transform: none;
}
</style>
