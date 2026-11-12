<script setup>
import AppIcon from '../components/AppIcon.vue';
</script>

<template>
  <section class="not-found container">
    <!-- "Lost page" illustration: a magnifying glass searching inside a browser window -->
    <svg class="lost" viewBox="0 0 260 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="lost-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#ff4d5a" />
          <stop offset="0.55" stop-color="#8b5cff" />
          <stop offset="1" stop-color="#3dd6c6" />
        </linearGradient>
      </defs>
      <rect x="20" y="20" width="220" height="160" rx="18" fill="var(--bg-elev)" stroke="var(--border-strong)" stroke-width="2" />
      <path d="M20 54 H240" stroke="var(--border)" stroke-width="2" />
      <circle cx="42" cy="37" r="5" fill="#ff4d5a" />
      <circle cx="58" cy="37" r="5" fill="#ffb347" />
      <circle cx="74" cy="37" r="5" fill="#3dd6c6" />
      <rect x="94" y="30" width="126" height="14" rx="7" fill="var(--surface-hover)" />
      <path
        class="lost__trail"
        d="M44 160 C70 150 70 128 92 124"
        stroke="var(--faint)"
        stroke-width="3"
        stroke-dasharray="2 8"
        stroke-linecap="round"
        fill="none"
      />
      <g class="lost__lens">
        <circle cx="128" cy="110" r="34" fill="none" stroke="url(#lost-gradient)" stroke-width="8" />
        <path d="M153 135 L180 162" stroke="url(#lost-gradient)" stroke-width="11" stroke-linecap="round" />
        <text x="128" y="123" text-anchor="middle" font-family="var(--font-display)" font-size="38" font-weight="700" fill="var(--text)">?</text>
      </g>
    </svg>
    <span class="eyebrow">Erreur 404</span>
    <h1>Cette page n'existe pas… <span class="gradient-text">encore.</span></h1>
    <p class="lead">Et si c'était celle de votre futur site ? Je suis disponible pour la créer.</p>
    <div class="actions">
      <RouterLink :to="{ name: 'home', hash: '#contact' }" class="btn">
        Parlons de votre projet
        <AppIcon name="arrow-right" />
      </RouterLink>
      <RouterLink :to="{ name: 'home' }" class="btn btn--ghost">
        <AppIcon name="arrow-left" />
        Retour à l'accueil
      </RouterLink>
    </div>
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

/* ---------- "Lost page" illustration ---------- */
.lost {
  width: min(300px, 80vw);
  height: auto;
  margin-bottom: 8px;
  overflow: visible;
  filter: drop-shadow(0 24px 40px var(--shadow));
}

.lost text {
  font-family: var(--font-display);
}

/* The magnifying glass wanders around the window, as if looking for the page. */
.lost__lens {
  transform-box: fill-box;
  transform-origin: center;
  animation: lost-search 5s ease-in-out infinite;
}

/* The dotted trail keeps moving behind it. */
.lost__trail {
  animation: lost-trail 1.2s linear infinite;
}

@keyframes lost-search {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(-16px, -6px) rotate(-6deg);
  }
  50% {
    transform: translate(6px, -12px) rotate(4deg);
  }
  75% {
    transform: translate(14px, 4px) rotate(-3deg);
  }
}

@keyframes lost-trail {
  to {
    stroke-dashoffset: -20;
  }
}
/* (Visitors with "reduce motion" get a still illustration: see the global rule in base.css.) */

h1 {
  font-size: clamp(1.6rem, 4vw, 2.6rem);
}

.lead {
  color: var(--muted);
  margin-bottom: 12px;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}
</style>
