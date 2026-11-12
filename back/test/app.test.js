import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { createApp } from '../src/app.js';

const makeApp = (opts = {}) => createApp({ sendMail: vi.fn(), serveFront: false, ...opts });

describe('front pages (pre-rendered build)', () => {
  let dist;
  let app;

  // A fake front/dist with the same layout as the real pre-rendered build.
  beforeAll(() => {
    dist = mkdtempSync(join(tmpdir(), 'portfolio-dist-'));
    const files = {
      'index.html': 'HOME',
      'parcours/index.html': 'PARCOURS',
      'projets/oflix/index.html': 'OFLIX',
      '404.html': 'NOT FOUND',
      'assets/app-abc123.js': 'console.log(1)',
      'images/avatar.webp': 'img',
    };
    for (const [file, content] of Object.entries(files)) {
      mkdirSync(dirname(join(dist, file)), { recursive: true });
      writeFileSync(join(dist, file), content);
    }
    app = createApp({ sendMail: vi.fn(), frontDist: dist });
  });

  afterAll(() => rmSync(dist, { recursive: true, force: true }));

  it('serves the pre-rendered page matching the URL', async () => {
    expect((await request(app).get('/').expect(200)).text).toBe('HOME');
    expect((await request(app).get('/parcours').expect(200)).text).toBe('PARCOURS');
    expect((await request(app).get('/parcours/').expect(200)).text).toBe('PARCOURS');
    expect((await request(app).get('/projets/oflix').expect(200)).text).toBe('OFLIX');
  });

  it('answers unknown pages with the 404 page and a real 404 status', async () => {
    expect((await request(app).get('/projets/inconnu').expect(404)).text).toBe('NOT FOUND');
    expect((await request(app).get('/nimporte-quoi').expect(404)).text).toBe('NOT FOUND');
  });

  it('never resolves a path outside the pre-rendered pages', async () => {
    await request(app).get('/..%2F..%2Fpackage.json').expect(404);
    await request(app).get('/parcours/index.html.bak').expect(404);
  });

  it('caches hashed assets for a year, other files briefly, pages never', async () => {
    const asset = await request(app).get('/assets/app-abc123.js').expect(200);
    expect(asset.headers['cache-control']).toContain('max-age=31536000');
    expect(asset.headers['cache-control']).toContain('immutable');

    const image = await request(app).get('/images/avatar.webp').expect(200);
    expect(image.headers['cache-control']).toBe('public, max-age=3600');

    const page = await request(app).get('/parcours').expect(200);
    expect(page.headers['cache-control']).toBe('no-cache');
  });
});

describe('content API', () => {
  it('returns everything the home page needs', async () => {
    const res = await request(makeApp()).get('/api/home').expect(200);
    expect(res.body.profile.name).toBe('Anthony Ouzhene');
    expect(res.body.projects.length).toBeGreaterThan(0);
    expect(res.body.projects[0]).not.toHaveProperty('gallery');
    expect(res.body.skills.length).toBeGreaterThan(0);
    expect(res.body.writing.length).toBeGreaterThan(0);
  });

  it('returns a project with its neighbours', async () => {
    const res = await request(makeApp()).get('/api/projects/oflix').expect(200);
    expect(res.body.title).toBe("O'flix");
    expect(res.body.gallery.length).toBeGreaterThan(0);
    expect(res.body.prev.slug).toBeTruthy();
    expect(res.body.next.slug).toBeTruthy();
  });

  it('returns the career journey', async () => {
    const res = await request(makeApp()).get('/api/journey').expect(200);
    expect(res.body.experiences.length).toBeGreaterThan(0);
    expect(res.body.experiences[0]).toHaveProperty('role');
    expect(res.body.education.length).toBeGreaterThan(0);
  });

  it('404s on unknown project and unknown API route', async () => {
    const app = makeApp();
    await request(app).get('/api/projects/nope').expect(404);
    await request(app).get('/api/nope').expect(404);
  });
});

describe('contact API', () => {
  const valid = { name: 'Ada Lovelace', email: 'ada@example.com', message: 'Bonjour, parlons de votre profil !' };

  it('sends a valid message', async () => {
    const sendMail = vi.fn();
    await request(makeApp({ sendMail })).post('/api/contact').send(valid).expect(202);
    expect(sendMail).toHaveBeenCalledWith({ name: valid.name, email: valid.email, message: valid.message });
  });

  it('rejects invalid fields with per-field errors', async () => {
    const res = await request(makeApp())
      .post('/api/contact')
      .send({ name: 'A', email: 'nope', message: 'court' })
      .expect(422);
    expect(Object.keys(res.body.fields).sort()).toEqual(['email', 'message', 'name']);
  });

  it('silently drops honeypot submissions', async () => {
    const sendMail = vi.fn();
    await request(makeApp({ sendMail }))
      .post('/api/contact')
      .send({ ...valid, website: 'http://spam.example' })
      .expect(202);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('returns 502 when delivery fails', async () => {
    const sendMail = vi.fn().mockRejectedValue(new Error('smtp down'));
    vi.spyOn(console, 'error').mockImplementation(() => {});
    await request(makeApp({ sendMail })).post('/api/contact').send(valid).expect(502);
  });

  it('rate limits bursts', async () => {
    const app = makeApp({ contactLimit: 2 });
    await request(app).post('/api/contact').send(valid).expect(202);
    await request(app).post('/api/contact').send(valid).expect(202);
    await request(app).post('/api/contact').send(valid).expect(429);
  });

  it('rejects malformed JSON', async () => {
    await request(makeApp())
      .post('/api/contact')
      .set('Content-Type', 'application/json')
      .send('{bad')
      .expect(400);
  });
});
