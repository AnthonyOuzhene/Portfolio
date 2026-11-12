<script setup>
import { profile, projects, skills, writing } from '../content.js';
import HeroSection from '../components/HeroSection.vue';
import TechMarquee from '../components/TechMarquee.vue';
import AboutSection from '../components/AboutSection.vue';
import SkillsSection from '../components/SkillsSection.vue';
import ProjectsSection from '../components/ProjectsSection.vue';
import WritingSection from '../components/WritingSection.vue';
import ContactSection from '../components/ContactSection.vue';
import FloatingActions from '../components/FloatingActions.vue';
</script>

<template>
  <div class="home">
    <HeroSection :profile="profile" />
    <TechMarquee :items="profile.marquee" />
    <AboutSection :profile="profile" />
    <SkillsSection :skills="skills" />
    <ProjectsSection :projects="projects" />
    <WritingSection :writing="writing" />
    <ContactSection />
    <FloatingActions />
  </div>
</template>
