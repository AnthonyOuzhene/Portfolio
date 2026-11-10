<script setup>
import { useSiteData } from '../composables/useSiteData.js';
import HeroSection from '../components/HeroSection.vue';
import TechMarquee from '../components/TechMarquee.vue';
import AboutSection from '../components/AboutSection.vue';
import SkillsSection from '../components/SkillsSection.vue';
import ProjectsSection from '../components/ProjectsSection.vue';
import WritingSection from '../components/WritingSection.vue';
import ContactSection from '../components/ContactSection.vue';
import FloatingActions from '../components/FloatingActions.vue';

const { data, error, retry } = useSiteData();
</script>

<template>
  <div v-if="data" class="home">
    <HeroSection :profile="data.profile" />
    <TechMarquee :items="data.profile.marquee" />
    <AboutSection :profile="data.profile" />
    <SkillsSection :skills="data.skills" />
    <ProjectsSection :projects="data.projects" />
    <WritingSection :writing="data.writing" />
    <ContactSection />
    <FloatingActions :cv="data.profile.cv" />
  </div>

  <div v-else-if="error" class="state container">
    <h1>Oups, le contenu n'a pas pu être chargé.</h1>
    <p>{{ error.message }}</p>
    <button class="btn" @click="retry">Réessayer</button>
  </div>

  <div v-else class="state container" aria-busy="true">
    <span class="loader" />
    <span class="sr-only">Chargement…</span>
  </div>
</template>

<style scoped>
.state {
  min-height: 100svh;
  display: grid;
  place-content: center;
  justify-items: center;
  gap: 20px;
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
