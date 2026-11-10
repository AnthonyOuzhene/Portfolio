<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { api } from '../api.js';
import { useAsync } from '../composables/useAsync.js';
import AppIcon from '../components/AppIcon.vue';
import NotFoundView from './NotFoundView.vue';

const route = useRoute();
const { data: project, error, loading } = useAsync(() => api.project(route.params.slug));

const notFound = computed(() => error.value?.status === 404);

watch(project, (p) => {
  if (p) document.title = `${p.title} · Anthony Ouzhene`;
});

// ---------- Lightbox ----------
const lightbox = ref(null); // index of the open image, or null
const gallery = computed(() => project.value?.gallery ?? []);

function onKey(event) {
  if (lightbox.value === null) return;
  const n = gallery.value.length;
  if (event.key === 'Escape') lightbox.value = null;
  if (event.key === 'ArrowRight') lightbox.value = (lightbox.value + 1) % n;
  if (event.key === 'ArrowLeft') lightbox.value = (lightbox.value - 1 + n) % n;
}

watch(lightbox, (value) => {
  document.body.style.setProperty('overflow', value === null ? '' : 'hidden');
  if (value === null) window.removeEventListener('keydown', onKey);
  else window.addEventListener('keydown', onKey);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey);
  document.body.style.removeProperty('overflow');
});
</script>

<template>
  <NotFoundView v-if="notFound" />

  <article v-else-if="project" class="project-page" :style="{ '--project-accent': project.accent }">
    <header class="hero">
      <div class="hero__glow" aria-hidden="true" />
      <div class="container hero__inner">
        <RouterLink :to="{ name: 'home', hash: '#projets' }" class="back">
          <AppIcon name="arrow-left" />
          Tous les projets
        </RouterLink>

        <p class="hero__tagline">{{ project.tagline }}</p>
        <h1 class="hero__title">{{ project.title }}</h1>
        <p class="hero__summary">{{ project.summary }}</p>

        <dl class="facts">
          <div>
            <dt>Contexte</dt>
            <dd>{{ project.context }}</dd>
          </div>
          <div>
            <dt>Statut</dt>
            <dd>{{ project.status }}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd class="facts__stack">
              <span v-for="tech in project.stack" :key="tech" class="tag">{{ tech }}</span>
            </dd>
          </div>
        </dl>

        <div v-if="project.links.length" class="hero__links">
          <a
            v-for="(link, i) in project.links"
            :key="link.url"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="btn"
            :class="{ 'btn--ghost': i > 0 }"
          >
            {{ link.label }}
            <AppIcon name="arrow-up-right" />
          </a>
        </div>
      </div>
    </header>

    <div class="container">
      <figure class="cover">
        <img :src="project.cover" :alt="`Visuel du projet ${project.title}`" />
      </figure>

      <section v-if="project.features.length" class="block">
        <h2 v-reveal class="block__title">Ce que j'ai réalisé</h2>
        <ul class="features">
          <li v-for="(feature, i) in project.features" :key="feature" v-reveal="i * 60" class="feature card">
            <span class="feature__check"><AppIcon name="check" /></span>
            {{ feature }}
          </li>
        </ul>
      </section>

      <section v-if="gallery.length" class="block">
        <h2 v-reveal class="block__title">Captures</h2>
        <div class="gallery">
          <figure v-for="(shot, i) in gallery" :key="shot.src" v-reveal="i * 80" class="shot" :class="{ 'shot--wide': i === 0 }">
            <button type="button" class="shot__btn" :aria-label="`Agrandir : ${shot.caption}`" @click="lightbox = i">
              <img :src="shot.src" :alt="shot.caption" loading="lazy" />
            </button>
            <figcaption>{{ shot.caption }}</figcaption>
          </figure>
        </div>
      </section>

      <section v-if="!project.features.length && !gallery.length" class="block wip card">
        <h2>Projet en cours de réalisation</h2>
        <p>Le détail complet et les captures arrivent bientôt.</p>
      </section>

      <nav class="pager" aria-label="Autres projets">
        <RouterLink :to="{ name: 'project', params: { slug: project.prev.slug } }" class="pager__link">
          <span class="pager__label"><AppIcon name="arrow-left" /> Précédent</span>
          <span class="pager__title">{{ project.prev.title }}</span>
        </RouterLink>
        <RouterLink :to="{ name: 'project', params: { slug: project.next.slug } }" class="pager__link pager__link--next">
          <span class="pager__label">Suivant <AppIcon name="arrow-right" /></span>
          <span class="pager__title">{{ project.next.title }}</span>
        </RouterLink>
      </nav>
    </div>

    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="lightbox !== null"
          class="lightbox"
          role="dialog"
          aria-modal="true"
          :aria-label="gallery[lightbox].caption"
          @click.self="lightbox = null"
        >
          <button class="lightbox__close" aria-label="Fermer" autofocus @click="lightbox = null">
            <AppIcon name="close" />
          </button>
          <figure class="lightbox__figure">
            <img :src="gallery[lightbox].src" :alt="gallery[lightbox].caption" />
            <figcaption>{{ gallery[lightbox].caption }} · {{ lightbox + 1 }}/{{ gallery.length }}</figcaption>
          </figure>
        </div>
      </Transition>
    </Teleport>
  </article>

  <div v-else-if="error" class="state container">
    <h1>Impossible de charger ce projet.</h1>
    <p>{{ error.message }}</p>
  </div>

  <div v-else-if="loading" class="state container" aria-busy="true">
    <span class="loader" />
  </div>
</template>

<style scoped>
/* ---------- Header ---------- */
.hero {
  position: relative;
  padding: 140px 0 64px;
  overflow: hidden;
  isolation: isolate;
}

.hero__glow {
  position: absolute;
  z-index: -1;
  top: -30%;
  right: -10%;
  width: 70vmax;
  height: 70vmax;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--project-accent) 35%, transparent), transparent);
  filter: blur(40px);
  opacity: 0.8;
}

.hero__inner {
  display: grid;
  gap: 20px;
}

.back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  justify-self: start;
  margin-bottom: 24px;
  color: var(--muted);
  font-size: 0.95rem;
  transition: color 0.2s;
}

.back:hover {
  color: var(--text);
}

.hero__tagline {
  font-family: var(--font-display);
  font-size: 0.85rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--project-accent), var(--text) var(--accent-ink));
}

.hero__title {
  font-size: clamp(3.2rem, 11vw, 8.5rem);
  font-weight: 700;
  letter-spacing: -0.05em;
  line-height: 0.9;
  animation: rise 0.9s var(--ease-out) both;
}

.hero__summary {
  max-width: 60ch;
  font-size: clamp(1.05rem, 2vw, 1.3rem);
  color: var(--muted);
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
}

.facts {
  display: grid;
  gap: 20px;
  margin-top: 24px;
  padding-top: 28px;
  border-top: 1px solid var(--border);
}

.facts dt {
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--faint);
  margin-bottom: 6px;
}

.facts__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.hero__links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 12px;
}

@media (min-width: 760px) {
  .facts {
    grid-template-columns: 1fr 160px 1.2fr;
  }
}

/* ---------- Cover ---------- */
.cover {
  display: grid;
  place-items: center;
  height: clamp(260px, 42vw, 520px);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  background:
    radial-gradient(circle at 50% 130%, color-mix(in srgb, var(--project-accent) 50%, transparent), transparent 60%),
    var(--bg-elev);
  overflow: hidden;
}

.cover img {
  height: 78%;
  max-width: 80%;
  object-fit: contain;
  border-radius: var(--radius);
  filter: drop-shadow(0 30px 50px var(--shadow));
}

/* ---------- Blocks ---------- */
.block {
  margin-top: clamp(72px, 10vw, 120px);
}

.block__title {
  font-size: clamp(2rem, 4.5vw, 3.2rem);
  margin-bottom: 32px;
}

.features {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
}

.feature {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 20px;
  border-radius: var(--radius);
}

.feature__check {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border-radius: 50%;
  background: color-mix(in srgb, var(--project-accent) 18%, transparent);
  color: var(--project-accent);
  font-size: 0.85rem;
}

.gallery {
  display: grid;
  gap: 20px;
}

.shot {
  display: grid;
  gap: 12px;
}

.shot__btn {
  display: block;
  width: 100%;
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--border);
  cursor: zoom-in;
}

.shot__btn img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  object-position: top;
  transition: transform 0.8s var(--ease-out);
}

.shot__btn:hover img {
  transform: scale(1.03);
}

.shot figcaption {
  font-size: 0.92rem;
  color: var(--muted);
}

@media (min-width: 760px) {
  .gallery {
    grid-template-columns: 1fr 1fr;
  }

  .shot--wide {
    grid-column: 1 / -1;
  }
}

.wip {
  padding: 48px;
  text-align: center;
}

.wip h2 {
  font-size: 1.8rem;
  margin-bottom: 8px;
}

.wip p {
  color: var(--muted);
}

/* ---------- Pager ---------- */
.pager {
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-block: clamp(72px, 10vw, 120px) clamp(48px, 8vw, 96px);
  border-top: 1px solid var(--border);
}

.pager__link {
  display: grid;
  gap: 6px;
  padding-block: 32px;
}

.pager__link--next {
  text-align: right;
  justify-items: end;
}

.pager__label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.88rem;
  color: var(--muted);
}

.pager__title {
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 4vw, 2.6rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  transition: color 0.3s;
}

.pager__link:hover .pager__title {
  color: color-mix(in srgb, var(--project-accent), var(--text) var(--accent-ink));
}

/* ---------- States ---------- */
.state {
  min-height: 100svh;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 16px;
  text-align: center;
}

.state p {
  color: var(--muted);
}

.loader {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid var(--border);
  border-top-color: var(--accent);
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

<style>
/* Lightbox is teleported to <body>, so it can't use scoped styles. */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 150;
  display: grid;
  place-items: center;
  padding: 64px 16px 24px;
  background: rgb(5 5 8 / 0.92);
  backdrop-filter: blur(8px);
}

.lightbox__figure {
  display: grid;
  gap: 14px;
  max-width: 1400px;
  pointer-events: none;
}

.lightbox__figure img {
  max-height: 80vh;
  width: auto;
  margin-inline: auto;
  border-radius: 12px;
  box-shadow: 0 40px 80px rgb(0 0 0 / 0.6);
}

.lightbox__figure figcaption {
  text-align: center;
  color: var(--muted);
  font-size: 0.92rem;
}

.lightbox__close {
  position: absolute;
  top: 16px;
  right: 16px;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid var(--border-strong);
  font-size: 1.2rem;
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.3s;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
