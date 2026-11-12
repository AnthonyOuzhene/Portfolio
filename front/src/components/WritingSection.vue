<script setup>
import AppIcon from './AppIcon.vue';

defineProps({
  writing: { type: Array, required: true },
});
</script>

<template>
  <section id="redaction" class="section">
    <div class="container">
      <header class="section-head">
        <span v-reveal class="eyebrow">Rédaction web</span>
        <h2 v-reveal="80" class="section-title">Des mots qui <span class="gradient-text">se référencent</span></h2>
        <p v-reveal="160" class="section-lead">
          Avant le code, j'ai écrit pour le web : articles de blog et fiches produits optimisés pour le référencement
          naturel. Aujourd'hui, j'applique ce savoir-faire au SEO et au GEO des sites que je développe, pour qu'ils
          soient trouvés sur Google comme dans les réponses des IA.
        </p>
      </header>

      <ul class="writing">
        <li v-for="(item, i) in writing" :key="item.id" v-reveal="i * 70">
          <a :href="item.url" target="_blank" rel="noopener noreferrer" class="writing__item card">
            <span class="writing__logo">
              <img :src="item.logo" :alt="`Logo ${item.client}`" loading="lazy" />
            </span>
            <span class="writing__body">
              <span class="writing__info">
                <strong>{{ item.client }}</strong>
                <span>{{ item.type }}</span>
              </span>
              <AppIcon name="external" class="writing__icon" />
            </span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.writing {
  display: grid;
  gap: 20px;
}

.writing__item {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  border-radius: var(--radius-lg);
  transition:
    border-color 0.3s,
    transform 0.5s var(--ease-out);
}

.writing__item:hover {
  border-color: var(--border-strong);
  transform: translateY(-6px);
}

/* Large light area so every logo (often designed for white backgrounds) reads well. */
.writing__logo {
  display: block;
  overflow: hidden;
  aspect-ratio: 16 / 10;
  padding: 14% 18%;
  background: #f4f4f6;
}

.writing__logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.6s var(--ease-out);
}

.writing__item:hover .writing__logo img {
  transform: scale(1.06);
}

.writing__body {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px 22px;
}

.writing__info {
  display: grid;
  flex: 1;
  min-width: 0;
}

.writing__info strong {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 1.3rem;
}

.writing__info span {
  font-size: 0.88rem;
  color: var(--muted);
}

.writing__icon {
  color: var(--faint);
  transition:
    color 0.3s,
    transform 0.3s var(--ease-out);
}

.writing__item:hover .writing__icon {
  color: var(--text);
  transform: translate(2px, -2px);
}

@media (min-width: 760px) {
  .writing {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
