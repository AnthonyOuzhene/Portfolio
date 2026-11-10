<script setup>
defineProps({
  items: { type: Array, required: true },
});
</script>

<template>
  <div class="marquee" aria-hidden="true">
    <div class="marquee__track">
      <template v-for="n in 2" :key="n">
        <span v-for="item in items" :key="`${n}-${item}`" class="marquee__item">{{ item }}</span>
      </template>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  overflow: hidden;
  border-block: 1px solid var(--border);
  padding-block: 22px;
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
}

.marquee__track {
  display: flex;
  width: max-content;
  animation: scroll 40s linear infinite;
}

.marquee:hover .marquee__track {
  animation-play-state: paused;
}

.marquee__item {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 3vw, 2.2rem);
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--faint);
  padding-inline: 28px;
  white-space: nowrap;
}

.marquee__item::after {
  content: '✦';
  margin-left: 56px;
  font-size: 0.6em;
  color: var(--accent);
}

@keyframes scroll {
  to {
    transform: translateX(-50%);
  }
}
</style>
