import { createWebHistory } from 'vue-router';
import '@fontsource-variable/inter';
import '@fontsource-variable/space-grotesk';
import './styles/main.css';
import { createPortfolioApp } from './app.js';

// Content embedded by the pre-rendering script (scripts/prerender.js), if any.
// It's a JSON data block, not a script, so the Content-Security-Policy allows it.
function readInitialState() {
  const el = document.getElementById('__STATE__');
  try {
    return el ? JSON.parse(el.textContent) : {};
  } catch {
    return {};
  }
}

const container = document.getElementById('app');
const hydrate = container.firstElementChild !== null; // pre-rendered page vs dev / plain SPA

const { app, router } = createPortfolioApp({
  history: createWebHistory(),
  initialState: readInitialState(),
  hydrate,
});

router.isReady().then(() => app.mount(container));
