import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Votre nom est un peu court.').max(100),
  email: z.email('Adresse e-mail invalide.').max(200),
  message: z.string().trim().min(10, 'Votre message doit faire au moins 10 caractères.').max(5000),
  // Honeypot: hidden field that humans leave empty.
  website: z.string().max(0).optional().or(z.literal('')),
});

export function createContactRouter({ sendMail, limit = 5 }) {
  const router = Router();

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { error: 'Trop de messages envoyés. Réessayez dans quelques minutes.' },
  });

  router.post('/', limiter, async (req, res) => {
    const result = contactSchema.safeParse(req.body ?? {});

    if (!result.success) {
      const fields = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0];
        if (key && !fields[key]) fields[key] = issue.message;
      }
      // A filled honeypot is a bot: pretend everything went fine.
      if (fields.website) return res.status(202).json({ ok: true });
      return res.status(422).json({ error: 'Certains champs sont invalides.', fields });
    }

    const { name, email, message } = result.data;
    try {
      await sendMail({ name, email, message });
      res.status(202).json({ ok: true });
    } catch (error) {
      console.error('[contact] échec de l’envoi :', error);
      res.status(502).json({ error: 'Le message n’a pas pu être envoyé. Réessayez plus tard.' });
    }
  });

  return router;
}
