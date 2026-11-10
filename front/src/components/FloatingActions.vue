<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import AppIcon from './AppIcon.vue';

defineProps({
  cv: { type: String, required: true },
});

// Visible once the hero buttons have scrolled out of view, hidden again while the
// projects deck, the contact form or the footer is on screen (so it never covers their controls).
const heroActionsVisible = ref(true);
const blockersVisible = ref(new Set());
let observer;

onMounted(() => {
  const heroActions = document.querySelector('.hero__actions');
  const blockers = ['#projets .deck-wrap', '#contact', '.footer']
    .map((s) => document.querySelector(s))
    .filter(Boolean);

  observer = new IntersectionObserver((entries) => {
    const next = new Set(blockersVisible.value);
    for (const entry of entries) {
      if (entry.target === heroActions) heroActionsVisible.value = entry.isIntersecting;
      else if (entry.isIntersecting) next.add(entry.target);
      else next.delete(entry.target);
    }
    blockersVisible.value = next;
  });
  if (heroActions) observer.observe(heroActions);
  blockers.forEach((el) => observer.observe(el));
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <Transition name="float">
    <div v-if="!heroActionsVisible && blockersVisible.size === 0" class="floating" role="navigation" aria-label="Accès rapide">
      <RouterLink :to="{ name: 'home', hash: '#projets' }" class="btn floating__btn">
        Voir mes projets
        <AppIcon name="arrow-down" />
      </RouterLink>
      <a :href="cv" class="btn btn--ghost floating__btn" target="_blank" rel="noopener">
        <AppIcon name="download" />
        Mon CV
      </a>
    </div>
  </Transition>
</template>

<style scoped>
.floating {
  position: fixed;
  left: 50%;
  bottom: max(16px, env(safe-area-inset-bottom));
  z-index: 40;
  display: flex;
  gap: 8px;
  padding: 6px;
  border-radius: 999px;
  border: 1px solid var(--border-strong);
  background: var(--glass);
  backdrop-filter: blur(16px) saturate(1.4);
  -webkit-backdrop-filter: blur(16px) saturate(1.4);
  box-shadow: 0 20px 50px -12px var(--shadow);
  transform: translateX(-50%);
}

.floating__btn {
  min-height: 44px;
  padding: 0 18px;
  font-size: 0.92rem;
}

.float-enter-active,
.float-leave-active {
  transition:
    opacity 0.35s var(--ease-out),
    transform 0.35s var(--ease-out);
}

.float-enter-from,
.float-leave-to {
  opacity: 0;
  transform: translate(-50%, 24px);
}
</style>
