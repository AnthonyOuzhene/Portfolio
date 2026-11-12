import { readFileSync } from 'node:fs';

const load = (file) => JSON.parse(readFileSync(new URL(`./${file}`, import.meta.url), 'utf8'));

export const profile = load('profile.json');
export const skills = load('skills.json');
export const projects = load('projects.json');
export const writing = load('writing.json');
export const journey = load('journey.json');

/** Everything the home page needs (same payload as GET /api/home). */
export const getHomeData = () => ({
  profile,
  skills,
  projects: projects.map(toProjectSummary),
  writing,
});

/** Full project with its previous / next neighbours, or null if the slug is unknown. */
export function getProjectDetail(slug) {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return null;

  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return {
    ...projects[index],
    prev: { slug: prev.slug, title: prev.title },
    next: { slug: next.slug, title: next.title },
  };
}

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
