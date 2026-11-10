<script setup>
import SiteHeader from './components/SiteHeader.vue';
import SiteFooter from './components/SiteFooter.vue';
</script>

<template>
  <a class="skip-link" href="#main">Aller au contenu</a>
  <SiteHeader />
  <main id="main">
    <RouterView v-slot="{ Component, route }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </main>
  <SiteFooter />
</template>

<style>
.skip-link {
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 200;
  padding: 10px 16px;
  border-radius: 999px;
  background: var(--text);
  color: var(--bg);
  font-weight: 600;
  transform: translateY(-200%);
  transition: transform 0.2s;
}

.skip-link:focus {
  transform: none;
}

.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.35s var(--ease-out),
    transform 0.35s var(--ease-out);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(16px);
}

.page-leave-to {
  opacity: 0;
}
</style>
