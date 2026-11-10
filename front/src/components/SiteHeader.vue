<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import AppIcon from './AppIcon.vue';
import ThemeToggle from './ThemeToggle.vue';

const links = [
  { hash: '#a-propos', label: 'À propos' },
  { hash: '#competences', label: 'Compétences' },
  { hash: '#projets', label: 'Projets' },
  { hash: '#redaction', label: 'Rédaction' },
];

const scrolled = ref(false);
const open = ref(false);
const route = useRoute();

const onScroll = () => (scrolled.value = window.scrollY > 24);

onMounted(() => {
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
});
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll));

watch(() => route.fullPath, () => (open.value = false));
watch(open, (isOpen) => document.body.style.setProperty('overflow', isOpen ? 'hidden' : ''));
</script>

<template>
  <header class="header" :class="{ 'is-scrolled': scrolled || open, 'is-open': open }">
    <div class="container header__inner">
      <RouterLink :to="{ name: 'home' }" class="logo" aria-label="Accueil">
        <span class="logo__mark">AO</span>
        <span class="logo__name">Anthony Ouzhene</span>
      </RouterLink>

      <nav class="nav" aria-label="Navigation principale">
        <ul class="nav__list">
          <li v-for="link in links" :key="link.hash">
            <RouterLink :to="{ name: 'home', hash: link.hash }" class="nav__link">{{ link.label }}</RouterLink>
          </li>
        </ul>
        <RouterLink :to="{ name: 'home', hash: '#contact' }" class="btn nav__cta">
          Me contacter
        </RouterLink>
      </nav>

      <div class="header__actions">
        <ThemeToggle />
        <button
          class="burger"
          :aria-expanded="open"
          aria-controls="mobile-menu"
          :aria-label="open ? 'Fermer le menu' : 'Ouvrir le menu'"
          @click="open = !open"
        >
          <AppIcon :name="open ? 'close' : 'menu'" />
        </button>
      </div>
    </div>

    <Transition name="menu">
      <nav v-if="open" id="mobile-menu" class="mobile-menu" aria-label="Navigation mobile">
        <ul>
          <li v-for="(link, i) in [...links, { hash: '#contact', label: 'Contact' }]" :key="link.hash" :style="{ '--i': i }">
            <RouterLink :to="{ name: 'home', hash: link.hash }">{{ link.label }}</RouterLink>
          </li>
        </ul>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  transition:
    background 0.4s,
    border-color 0.4s,
    backdrop-filter 0.4s;
  border-bottom: 1px solid transparent;
}

.header.is-scrolled {
  background: var(--glass);
  backdrop-filter: blur(16px) saturate(1.4);
  -webkit-backdrop-filter: blur(16px) saturate(1.4);
  border-color: var(--border);
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 76px;
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: var(--font-display);
  font-weight: 600;
}

.logo__mark {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--gradient);
  color: #fff;
  font-size: 0.95rem;
  letter-spacing: -0.04em;
}

.logo__name {
  font-size: 1.02rem;
}

.nav {
  display: none;
  align-items: center;
  gap: 32px;
}

.nav__list {
  display: flex;
  gap: 28px;
}

.nav__link {
  position: relative;
  font-size: 0.95rem;
  color: var(--muted);
  transition: color 0.2s;
}

.nav__link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -4px;
  height: 1px;
  background: var(--gradient);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.35s var(--ease-out);
}

.nav__link:hover {
  color: var(--text);
}

.nav__link:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.nav__cta {
  min-height: 42px;
  padding: 0 20px;
  font-size: 0.9rem;
}

.header__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.burger {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: 1px solid var(--border-strong);
  font-size: 1.1rem;
}

.mobile-menu {
  height: calc(100dvh - 76px);
  padding: 32px var(--gutter);
}

.mobile-menu ul {
  display: grid;
  gap: 8px;
}

.mobile-menu li {
  animation: menu-item 0.5s var(--ease-out) both;
  animation-delay: calc(var(--i) * 60ms + 80ms);
}

.mobile-menu a {
  display: block;
  padding: 10px 0;
  font-family: var(--font-display);
  font-size: clamp(2rem, 9vw, 3rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  border-bottom: 1px solid var(--border);
}

@keyframes menu-item {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.3s;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}

@media (max-width: 420px) {
  .logo__name {
    display: none;
  }
}

@media (min-width: 900px) {
  .nav {
    display: flex;
    margin-left: auto; /* nav + theme toggle grouped on the right */
  }

  .header__actions {
    margin-left: 16px;
  }

  .burger,
  .mobile-menu {
    display: none;
  }
}
</style>
