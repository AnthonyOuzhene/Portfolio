/**
 * Build-time pre-rendering (runs at the end of `npm run build`).
 *
 * For every page it writes a complete HTML file into dist/, so search engines
 * and AI crawlers get the real content without running JavaScript:
 *   - the page rendered by Vue (dist-ssr/entry-server.js),
 *   - its own <title>, description, canonical URL, Open Graph / Twitter tags and JSON-LD,
 *   - the data it needs, embedded as JSON so the browser doesn't refetch it.
 * It also writes sitemap.xml and robots.txt.
 *
 * Content comes straight from back/src/data/*.json: after editing it, rebuild.
 * The site URL can be overridden with the SITE_URL environment variable.
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { getHomeData, getProjectDetail, journey, profile, projects, skills } from '../../back/src/data/index.js';

const SITE_URL = (process.env.SITE_URL || 'https://www.anthonyouzhene.com').replace(/\/+$/, '');
const NAME = profile.name;
const OG_IMAGE = `${SITE_URL}/og-image.png`;

const frontDir = fileURLToPath(new URL('..', import.meta.url));
const distDir = join(frontDir, 'dist');
const ssrDir = join(frontDir, 'dist-ssr');

const { render } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href);
const template = readFileSync(join(distDir, 'index.html'), 'utf8');

// ---------- helpers ----------
const escapeAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// JSON safe to embed inside a <script> element (no "</script>" can close it early)
const embedJson = (data) => JSON.stringify(data).replace(/</g, '\\u003c');
const absolute = (path) => `${SITE_URL}${path}`;

// ---------- structured data (schema.org) ----------
const currentJob = journey.experiences.find((xp) => xp.current);

const person = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: NAME,
  url: `${SITE_URL}/`,
  image: absolute('/images/avatar.webp'),
  jobTitle: 'Développeur web',
  ...(currentJob?.company && { worksFor: { '@type': 'Organization', name: currentJob.company } }),
  address: { '@type': 'PostalAddress', addressRegion: 'Normandie', addressCountry: 'FR' },
  knowsAbout: skills.filter((g) => g.id === 'backend' || g.id === 'frontend').flatMap((g) => g.items),
  sameAs: profile.socials.map((s) => s.url),
};

const website = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: NAME,
  inLanguage: 'fr-FR',
  publisher: { '@id': person['@id'] },
};

// ---------- pages ----------
const home = getHomeData();

const pages = [
  {
    url: '/',
    file: 'index.html',
    state: { home },
    title: `${NAME} · Développeur web passionné`,
    description:
      'Anthony Ouzhene, développeur web passionné en Normandie : sites modernes, élégants et faciles à utiliser, sous Drupal, WordPress, Symfony et Vue.js.',
    jsonLd: [website, person],
  },
  {
    url: '/parcours',
    file: 'parcours/index.html',
    state: { home, journey },
    title: `Parcours · ${NAME}`,
    description:
      "Le parcours d'Anthony Ouzhene, de l'atelier industriel au développement web : expériences, formations, langues et centres d'intérêt.",
    jsonLd: [{ '@type': 'ProfilePage', url: absolute('/parcours'), name: `Parcours · ${NAME}`, mainEntity: person }],
  },
  ...projects.map((p) => ({
    url: `/projets/${p.slug}`,
    file: `projets/${p.slug}/index.html`,
    state: { home, projects: { [p.slug]: getProjectDetail(p.slug) } },
    title: `${p.title} · ${NAME}`,
    description: `${p.title} — ${p.summary}`,
    jsonLd: [
      {
        '@type': 'CreativeWork',
        name: p.title,
        headline: p.tagline,
        description: p.summary,
        url: absolute(`/projets/${p.slug}`),
        image: absolute(p.cover),
        keywords: p.stack.join(', '),
        creator: { '@id': person['@id'] },
      },
    ],
  })),
  {
    url: '/404',
    file: '404.html',
    state: { home },
    title: `Page introuvable · ${NAME}`,
    description: "Cette page n'existe pas ou plus.",
    noindex: true,
  },
];

function headFor(page) {
  const tags = [
    `<title>${escapeAttr(page.title)}</title>`,
    `<meta name="description" content="${escapeAttr(page.description)}" />`,
  ];

  if (page.noindex) {
    tags.push('<meta name="robots" content="noindex" />');
  } else {
    const url = absolute(page.url);
    tags.push(
      `<link rel="canonical" href="${url}" />`,
      '<meta property="og:type" content="website" />',
      '<meta property="og:locale" content="fr_FR" />',
      `<meta property="og:site_name" content="${escapeAttr(NAME)}" />`,
      `<meta property="og:title" content="${escapeAttr(page.title)}" />`,
      `<meta property="og:description" content="${escapeAttr(page.description)}" />`,
      `<meta property="og:url" content="${url}" />`,
      `<meta property="og:image" content="${OG_IMAGE}" />`,
      '<meta property="og:image:width" content="1200" />',
      '<meta property="og:image:height" content="630" />',
      `<meta property="og:image:alt" content="${escapeAttr(`${NAME} · Développeur web passionné`)}" />`,
      '<meta name="twitter:card" content="summary_large_image" />',
      `<meta name="twitter:title" content="${escapeAttr(page.title)}" />`,
      `<meta name="twitter:description" content="${escapeAttr(page.description)}" />`,
      `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    );
  }

  if (page.jsonLd) {
    // A JSON data block, not executable JavaScript: allowed by the Content-Security-Policy.
    tags.push(
      `<script type="application/ld+json">${embedJson({ '@context': 'https://schema.org', '@graph': page.jsonLd })}</script>`,
    );
  }

  return tags.join('\n    ');
}

const SEO_BLOCK = /<!-- seo:start[\s\S]*?<!-- seo:end -->/;
if (!SEO_BLOCK.test(template) || !template.includes('<!--app-html-->') || !template.includes('<!--app-state-->')) {
  throw new Error('dist/index.html is missing the seo / app-html / app-state markers (see front/index.html).');
}

for (const page of pages) {
  const appHtml = await render(page.url, page.state);
  // Replacer functions so "$" characters in the content are never treated as patterns.
  const html = template
    .replace(SEO_BLOCK, () => headFor(page))
    .replace('<!--app-html-->', () => appHtml)
    .replace('<!--app-state-->', () => `<script type="application/json" id="__STATE__">${embedJson(page.state)}</script>`);

  const target = join(distDir, page.file);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, html);
  console.log(`  pré-rendu  ${page.url.padEnd(28)} → dist/${page.file}`);
}

// ---------- sitemap.xml & robots.txt ----------
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .filter((p) => !p.noindex)
  .map((p) => `  <url><loc>${absolute(p.url)}</loc><lastmod>${today}</lastmod></url>`)
  .join('\n')}
</urlset>
`;
writeFileSync(join(distDir, 'sitemap.xml'), sitemap);

// Every crawler is welcome, AI ones included (GEO).
writeFileSync(join(distDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
console.log('  généré     sitemap.xml, robots.txt');

// The server bundle was only needed to render the pages.
rmSync(ssrDir, { recursive: true, force: true });
