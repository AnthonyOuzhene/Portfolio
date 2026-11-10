<script setup>
import { computed } from 'vue';
import { useTheme } from '../composables/useTheme.js';
import AppIcon from './AppIcon.vue';

const { theme, toggle } = useTheme();
const isLight = computed(() => theme.value === 'light');
</script>

<template>
  <button
    type="button"
    class="theme-toggle"
    :aria-label="isLight ? 'Passer en mode sombre' : 'Passer en mode clair'"
    :title="isLight ? 'Mode sombre' : 'Mode clair'"
    @click="toggle"
  >
    <Transition name="spin" mode="out-in">
      <AppIcon :key="theme" :name="isLight ? 'moon' : 'sun'" />
    </Transition>
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

.spin-enter-active,
.spin-leave-active {
  transition:
    opacity 0.2s,
    transform 0.3s var(--ease-out);
}

.spin-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.6);
}

.spin-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.6);
}
</style>
