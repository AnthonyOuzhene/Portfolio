<script setup>
import { computed } from 'vue';
import { useSiteData } from '../composables/useSiteData.js';
import AppIcon from './AppIcon.vue';

const { data } = useSiteData();
const socials = computed(() => data.value?.profile.socials ?? []);

function backToTop() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
}
</script>

<template>
  <footer class="footer">
    <div class="container">
      <p v-reveal class="footer__thanks">Merci de votre visite.</p>

      <div class="footer__bottom">
        <button type="button" class="footer__top" @click="backToTop">
          <AppIcon name="arrow-up" />
          Haut de page
        </button>

        <ul class="footer__socials">
          <li v-for="s in socials" :key="s.id">
            <a :href="s.url" target="_blank" rel="noopener noreferrer">
              <AppIcon :name="s.id" />
              {{ s.label }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  padding-block: clamp(48px, 7vw, 72px) 32px;
  border-top: 1px solid var(--border);
  overflow: hidden;
}

.footer__thanks {
  text-align: center;
  color: var(--muted);
  font-size: clamp(1rem, 2vw, 1.2rem);
}

.footer__bottom {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
}

.footer__top {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid var(--border-strong);
  color: var(--text);
  font-size: 0.92rem;
  transition:
    background 0.2s,
    transform 0.3s var(--ease-out);
}

.footer__top:hover {
  background: var(--surface-hover);
  transform: translateY(-2px);
}

.footer__socials {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 20px;
}

.footer__socials a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding-block: 8px;
  font-size: 0.92rem;
  color: var(--muted);
  transition: color 0.2s;
}

.footer__socials a:hover {
  color: var(--text);
}
</style>
