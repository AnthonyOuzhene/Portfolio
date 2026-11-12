// Site content: the JSON files of the /content folder (project root).
// Vite bundles them into the site at build time — edit them, then rebuild.
import profile from '../../content/profile.json';
import skills from '../../content/skills.json';
import projects from '../../content/projects.json';
import writing from '../../content/writing.json';
import journey from '../../content/journey.json';

export { profile, skills, projects, writing, journey };

/** A project with its previous / next neighbours (the list loops), or null if the slug is unknown. */
export function getProject(slug) {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return null;

  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return { ...projects[index], prev, next };
}
