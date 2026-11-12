import { existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Maps a URL path to the pre-rendered HTML file generated at build time
 * (front/scripts/prerender.js): "/" → index.html, "/parcours" → parcours/index.html,
 * "/projets/oflix" → projets/oflix/index.html. Returns null when there is none.
 *
 * Only letters, digits, "-" and "/" are accepted, so a path can never reach
 * another file (no "..", no extensions).
 */
export function resolvePage(distDir, urlPath) {
  const clean = urlPath.replace(/\/+$/, ''); // "/parcours/" → "/parcours"
  if (!/^[a-z0-9/-]*$/i.test(clean)) return null;

  const file = join(distDir, clean, 'index.html');
  return existsSync(file) ? file : null;
}
