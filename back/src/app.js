import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import helmet from 'helmet';
import { createContactRouter } from './routes/contact.js';
import { createMailer } from './services/mailer.js';
import { resolvePage } from './services/pages.js';

const defaultFrontDist = fileURLToPath(new URL('../../front/dist', import.meta.url));

export function createApp({
  sendMail = createMailer(),
  serveFront = true,
  frontDist = defaultFrontDist,
  contactLimit,
} = {}) {
  const app = express();

  app.set('trust proxy', 1);
  app.disable('x-powered-by');
  app.use(helmet());
  app.use(express.json({ limit: '20kb' }));

  // The API is only the contact form (site content is bundled into the front at build time).
  app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
  app.use('/api/contact', createContactRouter({ sendMail, limit: contactLimit }));
  app.use('/api', (_req, res) => res.status(404).json({ error: 'Route API inconnue' }));

  // In production the API also serves the built Vue app (single deployable).
  if (serveFront && existsSync(frontDist)) {
    // Vite files have a content hash in their name (it changes when they do): cache for a year.
    app.use('/assets', express.static(join(frontDist, 'assets'), { maxAge: '1y', immutable: true }));
    // Other public files (images, favicons, robots.txt…) keep their name when updated: short cache.
    // (redirect: false, otherwise "/parcours" would be redirected to "/parcours/" because it's a folder)
    app.use(express.static(frontDist, { maxAge: '1h', index: false, redirect: false }));

    // Pages pre-rendered at build time; anything else gets the 404 page with a real 404 status.
    app.get('/{*splat}', (req, res) => {
      res.set('Cache-Control', 'no-cache');
      const page = resolvePage(frontDist, req.path);
      if (page) return res.sendFile(page);

      const notFound = join(frontDist, '404.html');
      if (existsSync(notFound)) return res.status(404).sendFile(notFound);
      res.sendFile(join(frontDist, 'index.html')); // build without pre-rendering: plain SPA
    });
  }

  // eslint-disable-next-line no-unused-vars
  app.use((err, _req, res, _next) => {
    if (err.type === 'entity.parse.failed') {
      return res.status(400).json({ error: 'JSON invalide' });
    }
    console.error(err);
    res.status(err.status ?? 500).json({ error: 'Erreur interne' });
  });

  return app;
}
