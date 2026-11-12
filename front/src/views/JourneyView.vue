<script setup>
import { computed } from 'vue';
import { loadJourney, useStore } from '../store.js';
import AppIcon from '../components/AppIcon.vue';

// Already in the store on the pre-rendered page, fetched from the API otherwise.
const store = useStore();
if (!store.journey) loadJourney(store);

const journey = computed(() => store.journey);
const error = computed(() => store.errors.journey ?? null);
</script>

<template>
  <article v-if="journey" class="journey">
    <!-- ---------- Intro ---------- -->
    <header class="hero">
      <div class="hero__glow" aria-hidden="true" />
      <div class="container hero__inner">
        <span class="eyebrow">Parcours</span>
        <h1 class="hero__title">De l'atelier <span class="gradient-text">au code</span></h1>
        <p class="hero__intro">{{ journey.intro }}</p>
      </div>
    </header>

    <!-- ---------- Experience timeline ---------- -->
    <section class="container block" aria-labelledby="xp-title">
      <h2 id="xp-title" v-reveal class="block__title">Expérience</h2>

      <ol class="timeline">
        <li
          v-for="(xp, i) in journey.experiences"
          :key="xp.id"
          v-reveal="i * 80"
          class="timeline__item"
          :class="{ 'is-current': xp.current }"
        >
          <span class="timeline__dot" aria-hidden="true" />
          <p class="timeline__period">{{ xp.period }}</p>

          <div class="xp card">
            <div class="xp__head">
              <div>
                <h3 class="xp__role">{{ xp.role }}</h3>
                <p v-if="xp.company" class="xp__company">{{ xp.company }}</p>
              </div>
              <span v-if="xp.current" class="xp__badge"><span class="pulse" /> En poste</span>
            </div>
            <ul class="xp__highlights">
              <li v-for="item in xp.highlights" :key="item">{{ item }}</li>
            </ul>
            <ul class="xp__stack" aria-label="Compétences mobilisées">
              <li v-for="tech in xp.stack" :key="tech" class="tag">{{ tech }}</li>
            </ul>
          </div>
        </li>
      </ol>
    </section>

    <!-- ---------- Education ---------- -->
    <section class="container block" aria-labelledby="edu-title">
      <h2 id="edu-title" v-reveal class="block__title">Formations</h2>
      <ul class="education">
        <li v-for="(edu, i) in journey.education" :key="edu.title" v-reveal="i * 60" class="edu card">
          <p class="edu__period">{{ edu.period }}</p>
          <h3 class="edu__title">{{ edu.title }}</h3>
          <p class="edu__school">{{ edu.school }}</p>
        </li>
      </ul>
    </section>

    <!-- ---------- Languages & interests ---------- -->
    <section class="container block extras">
      <div v-reveal class="extras__col">
        <h2 class="extras__title">Langues</h2>
        <ul class="languages">
          <li v-for="lang in journey.languages" :key="lang.name">
            <strong>{{ lang.name }}</strong>
            <span>{{ lang.level }}</span>
          </li>
        </ul>
      </div>
      <div v-reveal="100" class="extras__col">
        <h2 class="extras__title">En dehors du code</h2>
        <ul class="interests">
          <li v-for="interest in journey.interests" :key="interest" class="tag">{{ interest }}</li>
        </ul>
      </div>
    </section>

    <!-- ---------- Call to action ---------- -->
    <section class="container block">
      <div v-reveal class="cta card">
        <h2 class="cta__title">Envie d'en voir <span class="gradient-text">plus&nbsp;?</span></h2>
        <div class="cta__actions">
          <RouterLink :to="{ name: 'home', hash: '#projets' }" class="btn">
            Voir mes projets
            <AppIcon name="arrow-right" />
          </RouterLink>
          <RouterLink :to="{ name: 'home', hash: '#contact' }" class="btn btn--ghost">Me contacter</RouterLink>
        </div>
      </div>
    </section>
  </article>

  <div v-else-if="error" class="state container">
    <h1>Impossible de charger le parcours.</h1>
    <p>{{ error.message }}</p>
  </div>

  <div v-else class="state container" aria-busy="true">
    <span class="loader" />
  </div>
</template>

<style scoped>
/* ---------- Intro ---------- */
.hero {
  position: relative;
  padding: 150px 0 24px;
  isolation: isolate;
  /* clip the glow on the sides only (no horizontal scroll), but let it fade out
     downwards instead of ending in a hard line */
  overflow-x: clip;
}

.hero__glow {
  position: absolute;
  z-index: -1;
  top: -40%;
  right: -15%;
  width: 70vmax;
  height: 70vmax;
  background: radial-gradient(closest-side, rgb(139 92 255 / 0.22), transparent);
  filter: blur(40px);
}

.hero__inner {
  display: grid;
  gap: 24px;
}

.hero__title {
  font-size: clamp(3rem, 9vw, 7rem);
  font-weight: 700;
  letter-spacing: -0.05em;
  line-height: 0.92;
  animation: rise 0.9s var(--ease-out) both;
}

.hero__intro {
  max-width: 68ch;
  font-size: clamp(1.05rem, 1.8vw, 1.25rem);
  color: var(--muted);
  animation: rise 0.9s var(--ease-out) 0.15s both;
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
}

/* ---------- Blocks ---------- */
.block {
  margin-top: clamp(72px, 10vw, 120px);
}

.block__title {
  font-size: clamp(2rem, 4.5vw, 3.2rem);
  margin-bottom: 40px;
}

/* ---------- Timeline ---------- */
.timeline {
  position: relative;
  display: grid;
  gap: 28px;
  padding-left: 32px;
}

/* the vertical line */
.timeline::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 8px;
  bottom: 8px;
  width: 2px;
  border-radius: 2px;
  background: linear-gradient(to bottom, var(--accent), var(--accent-2) 45%, var(--border) 100%);
}

.timeline__item {
  position: relative;
  display: grid;
  gap: 10px;
}

.timeline__dot {
  position: absolute;
  left: -32px;
  top: 6px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--bg);
  border: 2px solid var(--accent-2);
}

.is-current .timeline__dot {
  border-color: var(--accent);
  background: var(--accent);
  box-shadow: 0 0 0 6px rgb(255 77 90 / 0.18);
}

.timeline__period {
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--muted);
}

.xp {
  display: grid;
  gap: 18px;
  padding: clamp(22px, 3vw, 32px);
  border-radius: var(--radius-lg);
  transition: border-color 0.3s;
}

.xp:hover {
  border-color: var(--border-strong);
}

.is-current .xp {
  background:
    radial-gradient(circle at 100% 0%, rgb(255 77 90 / 0.1), transparent 55%),
    var(--surface);
}

.xp__head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.xp__role {
  font-size: clamp(1.3rem, 2.6vw, 1.7rem);
}

.xp__company {
  margin-top: 4px;
  color: var(--muted);
}

.xp__badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid var(--border-strong);
  font-size: 0.8rem;
  white-space: nowrap;
}

.pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--success);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgb(61 214 140 / 0.6);
  }
  70%,
  100% {
    box-shadow: 0 0 0 8px rgb(61 214 140 / 0);
  }
}

.xp__highlights {
  display: grid;
  gap: 10px;
  color: var(--muted);
}

.xp__highlights li {
  position: relative;
  padding-left: 20px;
}

.xp__highlights li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.7em;
  width: 8px;
  height: 2px;
  border-radius: 2px;
  background: var(--gradient);
}

.xp__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

@media (min-width: 900px) {
  .timeline {
    padding-left: 0;
  }

  /* line and dots sit in the middle of the 60px gap (180 + 30 = 210px) */
  .timeline::before {
    left: 209px;
  }

  .timeline__item {
    grid-template-columns: 180px 1fr;
    column-gap: 60px;
    align-items: start;
  }

  .timeline__dot {
    left: 202px;
    top: 30px;
  }

  .timeline__period {
    padding-top: 26px;
    text-align: right;
  }
}

/* ---------- Education ---------- */
.education {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
}

.edu {
  display: grid;
  align-content: start;
  gap: 8px;
  padding: 24px;
  border-radius: var(--radius);
  transition:
    border-color 0.3s,
    transform 0.4s var(--ease-out);
}

.edu:hover {
  border-color: var(--border-strong);
  transform: translateY(-4px);
}

.edu__period {
  font-family: var(--font-display);
  font-size: 0.82rem;
  color: color-mix(in srgb, var(--accent-2), var(--text) var(--accent-ink));
}

.edu__title {
  font-size: 1.15rem;
  line-height: 1.25;
}

.edu__school {
  color: var(--muted);
  font-size: 0.92rem;
}

/* ---------- Languages & interests ---------- */
.extras {
  display: grid;
  gap: 40px;
}

.extras__title {
  font-size: 1.4rem;
  margin-bottom: 18px;
}

.languages {
  display: grid;
  gap: 10px;
}

.languages li {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  max-width: 360px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border);
}

.languages span {
  color: var(--muted);
}

.interests {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.interests .tag {
  font-size: 0.9rem;
  padding: 7px 14px;
}

@media (min-width: 760px) {
  .extras {
    grid-template-columns: 1fr 1fr;
  }
}

/* ---------- CTA ---------- */
.cta {
  display: grid;
  justify-items: center;
  gap: 28px;
  margin-bottom: clamp(72px, 10vw, 120px);
  padding: clamp(40px, 6vw, 72px) 24px;
  text-align: center;
  background:
    radial-gradient(circle at 50% 120%, rgb(139 92 255 / 0.2), transparent 60%),
    var(--surface);
}

.cta__title {
  font-size: clamp(2rem, 5vw, 3.4rem);
}

.cta__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
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
