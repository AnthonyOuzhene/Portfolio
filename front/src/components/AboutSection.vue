<script setup>
import AppIcon from './AppIcon.vue';

defineProps({
  profile: { type: Object, required: true },
});
</script>

<template>
  <section id="a-propos" class="section">
    <div class="container about">
      <div v-reveal class="about__portrait">
        <div class="portrait">
          <img src="/images/avatar.webp" alt="Avatar Octocat d'Anthony Ouzhene" width="1000" height="1000" loading="lazy" />
        </div>
        <p class="portrait__badge">
          <AppIcon name="pin" />
          {{ profile.location }}
        </p>
      </div>

      <div class="about__content">
        <header class="section-head">
          <span v-reveal class="eyebrow">À propos</span>
          <h2 v-reveal="80" class="section-title">
            Du back-end solide, <span class="gradient-text">des interfaces qui respirent.</span>
          </h2>
        </header>

        <div class="about__text">
          <p v-for="(paragraph, i) in profile.about" :key="i" v-reveal="i * 80">{{ paragraph }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  display: grid;
  gap: clamp(48px, 7vw, 96px);
}

.about__portrait {
  position: relative;
  justify-self: center;
  width: min(100%, 380px);
}

.portrait {
  position: relative;
  aspect-ratio: 4 / 5;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background:
    radial-gradient(circle at 30% 20%, rgb(139 92 255 / 0.5), transparent 60%),
    radial-gradient(circle at 80% 90%, rgb(255 77 90 / 0.45), transparent 55%),
    var(--bg-elev);
  border: 1px solid var(--border);
}

.portrait::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background: var(--gradient);
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0.7;
}

.portrait img {
  width: 100%;
  height: 100%;
  /* Transparent illustration: show it whole, centred, with some breathing room. */
  object-fit: contain;
  padding: 8% 6% 12%;
  filter: drop-shadow(0 24px 40px var(--shadow));
}

.portrait__badge {
  position: absolute;
  left: 50%;
  bottom: -20px;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 999px;
  background: var(--panel);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border-strong);
  font-size: 0.88rem;
  white-space: nowrap;
}

.portrait__badge .icon {
  color: var(--accent);
}

.about__text {
  display: grid;
  gap: 18px;
  color: var(--muted);
  font-size: 1.08rem;
  max-width: 62ch;
}

@media (min-width: 960px) {
  .about {
    grid-template-columns: 380px 1fr;
    align-items: start;
  }

  .about__portrait {
    position: sticky;
    top: 120px;
  }
}
</style>
