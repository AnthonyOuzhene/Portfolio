import { readFileSync } from 'node:fs';

const load = (file) => JSON.parse(readFileSync(new URL(`./${file}`, import.meta.url), 'utf8'));

export const profile = load('profile.json');
export const skills = load('skills.json');
export const projects = load('projects.json');
export const writing = load('writing.json');

/** Lightweight project shape used in listings (no gallery / features). */
export const toProjectSummary = ({ slug, title, tagline, summary, stack, accent, status, cover }) => ({
  slug,
  title,
  tagline,
  summary,
  stack,
  accent,
  status,
  cover,
});
