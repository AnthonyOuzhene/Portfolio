import { Router } from 'express';
import { getHomeData, getProjectDetail, journey, profile, projects, skills, toProjectSummary, writing } from '../data/index.js';

export const contentRouter = Router();

// Everything the home page needs, in a single round trip.
contentRouter.get('/home', (_req, res) => res.json(getHomeData()));

contentRouter.get('/profile', (_req, res) => res.json(profile));
contentRouter.get('/skills', (_req, res) => res.json(skills));
contentRouter.get('/writing', (_req, res) => res.json(writing));
contentRouter.get('/journey', (_req, res) => res.json(journey));
contentRouter.get('/projects', (_req, res) => res.json(projects.map(toProjectSummary)));

contentRouter.get('/projects/:slug', (req, res) => {
  const project = getProjectDetail(req.params.slug);
  if (!project) return res.status(404).json({ error: 'Projet introuvable' });
  res.json(project);
});
