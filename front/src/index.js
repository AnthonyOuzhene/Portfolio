import { createApp } from "vue";

import App from "./App.vue";
import customRouter from './router.js';

const app = createApp(App);

// on utilise le router défini dans router.js
// avec app.use on rend le router accessible partout dans l'application
app.use(customRouter);

app.mount("#app");