import { Router } from 'express';
import { profile, projects, skills, toProjectSummary, writing } from '../data/index.js';

export const contentRouter = Router();

// Everything the home page needs, in a single round trip.
contentRouter.get('/home', (_req, res) => {
  res.json({
    profile,
    skills,
    projects: projects.map(toProjectSummary),
    writing,
  });
});

contentRouter.get('/profile', (_req, res) => res.json(profile));
contentRouter.get('/skills', (_req, res) => res.json(skills));
contentRouter.get('/writing', (_req, res) => res.json(writing));
contentRouter.get('/projects', (_req, res) => res.json(projects.map(toProjectSummary)));

contentRouter.get('/projects/:slug', (req, res) => {
  const index = projects.findIndex((p) => p.slug === req.params.slug);
  if (index === -1) {
    return res.status(404).json({ error: 'Projet introuvable' });
  }

  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  res.json({
    ...projects[index],
    prev: { slug: prev.slug, title: prev.title },
    next: { slug: next.slug, title: next.title },
  });
});
