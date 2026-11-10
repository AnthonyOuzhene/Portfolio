import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import express from 'express';
import helmet from 'helmet';
import { contentRouter } from './routes/content.js';
import { createContactRouter } from './routes/contact.js';
import { createMailer } from './services/mailer.js';

const frontDist = fileURLToPath(new URL('../../front/dist', import.meta.url));

export function createApp({ sendMail = createMailer(), serveFront = true, contactLimit } = {}) {
  const app = express();

  app.set('trust proxy', 1);
  app.disable('x-powered-by');
  app.use(helmet());
  app.use(express.json({ limit: '20kb' }));

  app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
  app.use('/api', contentRouter);
  app.use('/api/contact', createContactRouter({ sendMail, limit: contactLimit }));
  app.use('/api', (_req, res) => res.status(404).json({ error: 'Route API inconnue' }));

  // In production the API also serves the built Vue app (single deployable).
  if (serveFront && existsSync(frontDist)) {
    app.use(express.static(frontDist, { maxAge: '1y', index: false, immutable: true }));
    app.get('/{*splat}', (_req, res) => {
      res.set('Cache-Control', 'no-cache');
      res.sendFile('index.html', { root: frontDist });
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
