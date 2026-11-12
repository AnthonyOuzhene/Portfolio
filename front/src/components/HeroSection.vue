<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import AppIcon from './AppIcon.vue';

const props = defineProps({
  profile: { type: Object, required: true },
});

// Rotating word at the end of the tagline: each word gets its own colour
// (cycling through the site accents) and a small emoji.
const WORD_COLORS = ['#ff4d5a', '#a07bff', '#3dd6c6', '#ffb347'];

const wordIndex = ref(0);
const word = computed(() => props.profile.rotatingWords[wordIndex.value]);
const wordColor = computed(() => WORD_COLORS[wordIndex.value % WORD_COLORS.length]);
let timer;

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  timer = setInterval(() => {
    wordIndex.value = (wordIndex.value + 1) % props.profile.rotatingWords.length;
  }, 2800);
});
onBeforeUnmount(() => clearInterval(timer));
</script>

<template>
  <section class="hero">
    <div class="hero__glow" aria-hidden="true">
      <span class="blob blob--1" />
      <span class="blob blob--2" />
      <span class="blob blob--3" />
    </div>
    <div class="hero__grid" aria-hidden="true" />

    <div class="container hero__inner">
      <p class="hero__status">
        <span class="dot" />
        {{ profile.availability }}
      </p>

      <h1 class="hero__title">
        <span class="line"><span>Anthony</span></span>
        <span class="line"><span class="gradient-text">Ouzhene</span></span>
      </h1>

      <div class="hero__bottom">
        <div class="hero__copy">
          <p class="hero__role">{{ profile.role }}</p>
          <p class="hero__tagline">
            Des créations
            <span class="word-rotator">
              <Transition name="word" mode="out-in">
                <span :key="wordIndex" class="word" :style="{ '--word-color': wordColor }">
                  {{ word.text }}<span class="word__emoji" aria-hidden="true">{{ word.emoji }}</span>
                </span>
              </Transition>
            </span>
          </p>
        </div>

        <div class="hero__actions">
          <RouterLink :to="{ name: 'home', hash: '#projets' }" class="btn">
            Voir mes projets
            <AppIcon name="arrow-down" />
          </RouterLink>
          <RouterLink :to="{ name: 'journey' }" class="btn btn--ghost">
            Mon parcours
            <AppIcon name="arrow-right" />
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  /* 85% of the screen, content centred: the marquee below peeks in and invites scrolling */
  min-height: 85svh;
  display: flex;
  align-items: center;
  padding-top: 120px;
  padding-bottom: 48px;
  overflow: hidden;
  isolation: isolate;
}

/* ---------- Animated background ---------- */
.hero__glow {
  position: absolute;
  inset: 0;
  z-index: -2;
  filter: blur(80px);
  opacity: var(--hero-glow-opacity);
  transition: opacity 0.4s;
  /* fade out towards the bottom so the glow never ends in a hard line above the marquee */
  mask-image: linear-gradient(to bottom, #000 60%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, #000 60%, transparent);
}

.blob {
  position: absolute;
  border-radius: 50%;
  mix-blend-mode: var(--hero-glow-blend);
  animation: float 18s ease-in-out infinite alternate;
}

.blob--1 {
  width: 46vmax;
  height: 46vmax;
  top: -18vmax;
  right: -10vmax;
  background: var(--accent-2);
}

.blob--2 {
  width: 34vmax;
  height: 34vmax;
  top: 10vmax;
  right: 18vmax;
  background: var(--accent);
  animation-duration: 22s;
  animation-delay: -6s;
}

.blob--3 {
  width: 28vmax;
  height: 28vmax;
  bottom: -14vmax;
  left: -8vmax;
  background: var(--accent-3);
  opacity: 0.6;
  animation-duration: 26s;
  animation-delay: -12s;
}

@keyframes float {
  0% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(-6vmax, 4vmax) scale(1.1);
  }
  100% {
    transform: translate(4vmax, -3vmax) scale(0.95);
  }
}

.hero__grid {
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image:
    linear-gradient(var(--border) 1px, transparent 1px),
    linear-gradient(90deg, var(--border) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, #000 30%, transparent 75%);
  -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, #000 30%, transparent 75%);
}

/* ---------- Content ---------- */
.hero__inner {
  display: grid;
  gap: clamp(24px, 4vw, 40px);
}

.hero__status {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  justify-self: start;
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid var(--border-strong);
  background: var(--glass-soft);
  backdrop-filter: blur(8px);
  font-size: 0.85rem;
  color: var(--muted);
  animation: rise 0.9s var(--ease-out) both;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--success);
  box-shadow: 0 0 0 0 rgb(61 214 140 / 0.6);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  70% {
    box-shadow: 0 0 0 10px rgb(61 214 140 / 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgb(61 214 140 / 0);
  }
}

/* The name is a small signature line; the role below is the headline. */
.hero__title {
  font-size: clamp(1.3rem, 2.2vw, 1.7rem);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.line {
  display: inline-block;
  overflow: hidden;
  margin-right: 0.3em;
}

.line > span {
  display: inline-block;
  animation: slide-up 1.1s var(--ease-out) both;
}

.line:nth-child(2) > span {
  animation-delay: 0.12s;
}

@keyframes slide-up {
  from {
    transform: translateY(105%);
  }
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
}

.hero__bottom {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 32px;
  align-items: end;
  animation: rise 1s var(--ease-out) 0.35s both;
}

.hero__copy {
  display: grid;
  gap: 6px;
}

.hero__role {
  font-family: var(--font-display);
  font-size: clamp(2.6rem, 7vw, 6.2rem);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.045em;
  text-wrap: balance;
}

.hero__tagline {
  margin-top: 12px;
  color: var(--muted);
  font-size: clamp(1.5rem, 3.4vw, 2.8rem);
  line-height: 1.2;
}

.word-rotator {
  display: inline-block;
  vertical-align: bottom;
  white-space: nowrap;
  font-weight: 600;
}

/* On phones the longest words would wrap and make the buttons jump at every
   change: the word always goes on its own line instead (constant height). */
@media (max-width: 480px) {
  .word-rotator {
    display: block;
  }
}

.word {
  display: inline-block;
  /* darkened in light mode so every colour stays readable on white */
  color: color-mix(in srgb, var(--word-color), var(--text) var(--accent-ink));
}

.word__emoji {
  display: inline-block;
  margin-left: 0.35em;
  font-size: 0.85em;
  opacity: 0.9;
}

.word-enter-active,
.word-leave-active {
  transition:
    opacity 0.3s,
    transform 0.35s var(--ease-out);
}

.word-enter-from {
  opacity: 0;
  transform: translateY(60%);
}

.word-leave-to {
  opacity: 0;
  transform: translateY(-60%);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

/* Text and buttons side by side only when the large tagline has room for its longest word. */
@media (min-width: 1024px) {
  .hero__bottom {
    grid-template-columns: minmax(0, 1fr) auto;
  }
}
</style>
