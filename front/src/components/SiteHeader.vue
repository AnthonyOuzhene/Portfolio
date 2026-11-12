<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useScrollSpy } from '../composables/useScrollSpy.js';
import AppIcon from './AppIcon.vue';
import ThemeToggle from './ThemeToggle.vue';

// Home sections are reached by anchor; "Parcours" is its own page.
const links = [
  { to: { name: 'home', hash: '#a-propos' }, label: 'À propos' },
  { to: { name: 'journey' }, label: 'Parcours' },
  { to: { name: 'home', hash: '#competences' }, label: 'Compétences' },
  { to: { name: 'home', hash: '#projets' }, label: 'Projets' },
  { to: { name: 'home', hash: '#redaction' }, label: 'Rédaction' },
];
const mobileLinks = [...links, { to: { name: 'home', hash: '#contact' }, label: 'Contact' }];

const scrolled = ref(false);
const open = ref(false);
const route = useRoute();

// Active link: on the home page, the section currently on screen (scroll spy);
// on other pages, the link to that page.
const { activeId, setActive } = useScrollSpy(['a-propos', 'competences', 'projets', 'redaction', 'contact']);

function isActive(link) {
  if (link.to.hash) return route.name === 'home' && activeId.value === link.to.hash.slice(1);
  return route.name === link.to.name;
}

function onLinkClick(link) {
  if (link.to.hash) setActive(link.to.hash.slice(1));
}

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
      <RouterLink :to="{ name: 'home' }" class="logo" aria-label="Anthony Ouzhene, accueil">
        <span class="logo__mark" aria-hidden="true">AO</span>
      </RouterLink>

      <nav class="nav" aria-label="Navigation principale">
        <ul class="nav__list">
          <li v-for="link in links" :key="link.label">
            <!-- Vue Router's own active classes ignore the #hash, so they are disabled
                 and the active state comes from the scroll spy instead. -->
            <RouterLink
              :to="link.to"
              class="nav__link"
              active-class=""
              exact-active-class=""
              :class="{ 'is-active': isActive(link) }"
              :aria-current="isActive(link) ? 'location' : undefined"
              @click="onLinkClick(link)"
            >
              {{ link.label }}
            </RouterLink>
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
          <li v-for="(link, i) in mobileLinks" :key="link.label" :style="{ '--i': i }">
            <RouterLink
              :to="link.to"
              active-class=""
              exact-active-class=""
              :class="{ 'is-active': isActive(link) }"
              :aria-current="isActive(link) ? 'location' : undefined"
              @click="onLinkClick(link)"
            >
              {{ link.label }}
            </RouterLink>
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

.nav__link:hover,
.nav__link.is-active {
  color: var(--text);
}

.nav__link:hover::after,
.nav__link.is-active::after {
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

.mobile-menu a.is-active {
  color: color-mix(in srgb, var(--accent), var(--text) var(--accent-ink));
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

/* 5 links + CTA + theme toggle need ~1000px; below that the burger menu is used */
@media (min-width: 1024px) {
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
