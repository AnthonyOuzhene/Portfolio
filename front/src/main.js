import { createApp } from 'vue';
import '@fontsource-variable/inter';
import '@fontsource-variable/space-grotesk';
import './styles/main.css';

import App from './App.vue';
import router from './router.js';
import { vReveal } from './composables/reveal.js';

createApp(App).use(router).directive('reveal', vReveal).mount('#app');
