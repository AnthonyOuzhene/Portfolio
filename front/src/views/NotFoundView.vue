<script setup>
import AppIcon from '../components/AppIcon.vue';
</script>

<template>
  <section class="not-found container">
    <p class="code gradient-text">404</p>
    <h1>Cette page s'est perdue en route.</h1>
    <p class="lead">Le lien est peut-être cassé, ou la page n'existe plus.</p>
    <RouterLink :to="{ name: 'home' }" class="btn">
      <AppIcon name="arrow-left" />
      Retour à l'accueil
    </RouterLink>
  </section>
</template>

<style scoped>
.not-found {
  min-height: 100svh;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 18px;
  text-align: center;
}

.code {
  font-family: var(--font-display);
  font-size: clamp(7rem, 30vw, 16rem);
  font-weight: 700;
  line-height: 0.85;
  letter-spacing: -0.06em;
}

h1 {
  font-size: clamp(1.6rem, 4vw, 2.6rem);
}

.lead {
  color: var(--muted);
  margin-bottom: 12px;
}
</style>
