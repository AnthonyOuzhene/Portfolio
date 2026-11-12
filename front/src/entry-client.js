import { createWebHistory } from 'vue-router';
import '@fontsource-variable/inter';
import '@fontsource-variable/space-grotesk';
import './styles/main.css';
import { createPortfolioApp } from './app.js';

const container = document.getElementById('app');
const hydrate = container.firstElementChild !== null; // pre-rendered page vs dev server

const { app, router } = createPortfolioApp({ history: createWebHistory(), hydrate });

router.isReady().then(() => app.mount(container));
