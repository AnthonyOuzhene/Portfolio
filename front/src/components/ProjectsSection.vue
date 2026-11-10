<script setup>
import { computed, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import AppIcon from './AppIcon.vue';

const props = defineProps({
  projects: { type: Array, required: true },
});

const router = useRouter();

// Order of the deck: order[0] is the card on top.
const order = ref(props.projects.map((_, i) => i));
watch(
  () => props.projects.length,
  (n) => (order.value = Array.from({ length: n }, (_, i) => i)),
);

const VISIBLE = 3; // cards rendered in the stack
const THRESHOLD = 110; // px of horizontal drag needed to swipe

const stack = computed(() =>
  order.value.slice(0, VISIBLE).map((index, depth) => ({ project: props.projects[index], index, depth })),
);
const top = computed(() => props.projects[order.value[0]]);
const position = computed(() => order.value[0] + 1);

// ---------- Drag state of the top card ----------
const drag = reactive({ active: false, x: 0, y: 0, startX: 0, startY: 0, flying: false, moved: false });

const topStyle = computed(() => ({
  transform: `translate(${drag.x}px, ${drag.y * 0.3}px) rotate(${drag.x * 0.06}deg)`,
  transition: drag.active ? 'none' : undefined,
}));

// -1 … 1 : how close we are to a swipe, used to fade the stamps in.
const progress = computed(() => Math.max(-1, Math.min(1, drag.x / THRESHOLD)));

function onPointerDown(event) {
  if (drag.flying || event.button > 0) return;
  drag.active = true;
  drag.moved = false;
  drag.startX = event.clientX;
  drag.startY = event.clientY;
  event.currentTarget.setPointerCapture(event.pointerId);
}

function onPointerMove(event) {
  if (!drag.active) return;
  drag.x = event.clientX - drag.startX;
  drag.y = event.clientY - drag.startY;
  if (Math.abs(drag.x) > 6) drag.moved = true;
}

function onPointerUp() {
  if (!drag.active) return;
  drag.active = false;
  if (drag.x > THRESHOLD) like();
  else if (drag.x < -THRESHOLD) pass();
  else {
    drag.x = 0;
    drag.y = 0;
  }
}

// A simple tap (no drag) on the top card also opens the project.
function onClick() {
  if (!drag.moved && !drag.flying) like();
}

function flyOut(direction) {
  return new Promise((resolve) => {
    drag.flying = true;
    drag.x = direction * (window.innerWidth * 0.9 + 200);
    drag.y = drag.y || -40;
    setTimeout(resolve, 380);
  });
}

function reset() {
  drag.x = 0;
  drag.y = 0;
  drag.flying = false;
}

async function pass() {
  if (drag.flying) return;
  await flyOut(-1);
  order.value = [...order.value.slice(1), order.value[0]];
  reset();
}

async function like() {
  if (drag.flying) return;
  const slug = top.value.slug;
  await flyOut(1);
  router.push({ name: 'project', params: { slug } });
}

function onKey(event) {
  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    pass();
  } else if (event.key === 'ArrowRight' || event.key === 'Enter') {
    event.preventDefault();
    like();
  }
}
</script>

<template>
  <section id="projets" class="section">
    <div class="container layout">
      <header class="section-head intro">
        <span v-reveal class="eyebrow">Projets</span>
        <h2 v-reveal="80" class="section-title">Réalisations <span class="gradient-text">à la carte</span></h2>
        <p v-reveal="160" class="section-lead">
          Des projets menés en équipe en méthode agile, en formation ou pour des clients. Glissez à gauche pour
          passer au suivant, à droite pour découvrir le projet en détail.
        </p>

        <ul v-reveal="220" class="hints" aria-hidden="true">
          <li><span class="hint-key hint-key--pass"><AppIcon name="close" /></span> Suivant</li>
          <li><span class="hint-key hint-key--like"><AppIcon name="heart" /></span> Voir le projet</li>
        </ul>
      </header>

      <div v-reveal="120" class="deck-wrap">
        <div
          class="deck"
          tabindex="0"
          role="group"
          aria-roledescription="pile de cartes"
          :aria-label="`Projet ${position} sur ${projects.length} : ${top.title}. Flèche gauche pour passer, flèche droite pour ouvrir.`"
          @keydown="onKey"
        >
          <article
            v-for="card in [...stack].reverse()"
            :key="card.project.slug"
            class="swipe-card"
            :class="{ 'is-top': card.depth === 0, 'is-flying': card.depth === 0 && drag.flying }"
            :style="[
              { '--project-accent': card.project.accent, '--depth': card.depth },
              card.depth === 0 ? topStyle : null,
            ]"
            :aria-hidden="card.depth !== 0"
            @pointerdown="card.depth === 0 && onPointerDown($event)"
            @pointermove="card.depth === 0 && onPointerMove($event)"
            @pointerup="card.depth === 0 && onPointerUp($event)"
            @pointercancel="card.depth === 0 && onPointerUp($event)"
            @click="card.depth === 0 && onClick()"
          >
            <div class="swipe-card__media">
              <img :src="card.project.cover" :alt="`Visuel du projet ${card.project.title}`" draggable="false" />
              <span v-if="card.project.status !== 'Terminé'" class="swipe-card__status">{{ card.project.status }}</span>
            </div>

            <div class="swipe-card__body">
              <p class="swipe-card__tagline">{{ card.project.tagline }}</p>
              <h3 class="swipe-card__title">{{ card.project.title }}</h3>
              <p class="swipe-card__bio">{{ card.project.summary }}</p>
              <ul class="swipe-card__stack" aria-label="Stack">
                <li v-for="tech in card.project.stack" :key="tech" class="tag">{{ tech }}</li>
              </ul>
            </div>

            <template v-if="card.depth === 0">
              <span class="stamp stamp--like" :style="{ opacity: Math.max(0, progress) }" aria-hidden="true">Match !</span>
              <span class="stamp stamp--pass" :style="{ opacity: Math.max(0, -progress) }" aria-hidden="true">Suivant</span>
            </template>
          </article>
        </div>

        <div class="controls">
          <button type="button" class="round-btn round-btn--pass" aria-label="Passer au projet suivant" @click="pass">
            <AppIcon name="close" />
          </button>
          <span class="counter" aria-live="polite">{{ position }} / {{ projects.length }}</span>
          <button type="button" class="round-btn round-btn--like" :aria-label="`Voir le projet ${top.title}`" @click="like">
            <AppIcon name="heart" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.layout {
  display: grid;
  gap: 48px;
  align-items: center;
}

.intro {
  margin-bottom: 0;
}

.hints {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 8px;
  color: var(--muted);
  font-size: 0.92rem;
}

.hints li {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}

.hint-key {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid var(--border-strong);
  font-size: 0.85rem;
}

.hint-key--pass {
  color: var(--danger);
}

.hint-key--like {
  color: var(--success);
}

/* ---------- Deck ---------- */
.deck-wrap {
  display: grid;
  justify-items: center;
  gap: 28px;
}

.deck {
  position: relative;
  width: min(100%, 400px);
  aspect-ratio: 4 / 5.6;
  margin-bottom: 36px; /* room for the cards peeking out below the top one */
  border-radius: var(--radius-lg);
  outline-offset: 8px;
}

.swipe-card {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  background: var(--bg-elev);
  box-shadow: 0 30px 60px -20px var(--shadow);
  transform: translateY(calc(var(--depth) * 16px)) scale(calc(1 - var(--depth) * 0.05));
  transform-origin: 50% 100%;
  transition:
    transform 0.4s var(--ease-out),
    opacity 0.4s;
  user-select: none;
  -webkit-user-select: none;
}

.swipe-card:not(.is-top) {
  filter: brightness(calc(1 - var(--depth) * var(--stack-dim)));
}

.swipe-card.is-top {
  cursor: grab;
  touch-action: pan-y; /* vertical page scroll still works on touch screens */
  border-color: color-mix(in srgb, var(--project-accent) 35%, var(--border));
}

.swipe-card.is-top:active {
  cursor: grabbing;
}

.swipe-card.is-flying {
  transition: transform 0.38s cubic-bezier(0.4, 0, 1, 1);
  pointer-events: none;
}

.swipe-card__media {
  position: relative;
  display: grid;
  place-items: center;
  flex: 1;
  min-height: 0;
  background:
    radial-gradient(circle at 50% 120%, color-mix(in srgb, var(--project-accent) 60%, transparent), transparent 70%),
    var(--bg-elev);
}

.swipe-card__media img {
  width: 62%;
  height: 80%;
  object-fit: contain;
  border-radius: var(--radius);
  filter: drop-shadow(0 24px 40px var(--shadow));
  pointer-events: none;
}

.swipe-card__status {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 500;
  background: var(--glass);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border-strong);
}

.swipe-card__body {
  display: grid;
  gap: 8px;
  padding: 22px 24px 26px;
  background: linear-gradient(to top, var(--bg-elev) 70%, transparent);
}

.swipe-card__tagline {
  font-size: 0.82rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  /* darkened in light mode so it stays readable on white */
  color: color-mix(in srgb, var(--project-accent), var(--text) var(--accent-ink));
}

.swipe-card__title {
  font-size: clamp(1.8rem, 5vw, 2.3rem);
}

.swipe-card__bio {
  color: var(--muted);
  font-size: 0.95rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.swipe-card__stack {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 4px;
}

/* ---------- Stamps ---------- */
.stamp {
  position: absolute;
  top: 64px; /* below the "En cours" badge */
  padding: 6px 14px;
  border: 3px solid currentColor;
  border-radius: 10px;
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  pointer-events: none;
  background: var(--glass-soft);
}

.stamp--like {
  left: 22px;
  color: var(--success);
  transform: rotate(-14deg);
}

.stamp--pass {
  right: 22px;
  color: var(--danger);
  transform: rotate(14deg);
}

/* ---------- Controls ---------- */
.controls {
  display: flex;
  align-items: center;
  gap: 28px;
}

.counter {
  min-width: 48px;
  text-align: center;
  font-family: var(--font-display);
  color: var(--muted);
  font-variant-numeric: tabular-nums;
}

.round-btn {
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 1px solid var(--border-strong);
  background: var(--surface);
  font-size: 1.5rem;
  transition:
    transform 0.25s var(--ease-out),
    background 0.25s,
    border-color 0.25s;
}

.round-btn:hover {
  transform: scale(1.08);
}

.round-btn:active {
  transform: scale(0.95);
}

.round-btn--pass {
  color: var(--danger);
}

.round-btn--pass:hover {
  background: rgb(255 107 107 / 0.12);
  border-color: rgb(255 107 107 / 0.5);
}

.round-btn--like {
  color: var(--success);
}

.round-btn--like:hover {
  background: rgb(61 214 140 / 0.12);
  border-color: rgb(61 214 140 / 0.5);
}

@media (min-width: 960px) {
  .layout {
    grid-template-columns: 1fr 1fr;
    gap: 64px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .swipe-card.is-flying {
    transition: none;
  }
}
</style>
