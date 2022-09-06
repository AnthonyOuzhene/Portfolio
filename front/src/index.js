import { createApp } from "vue";

import App from "./App.vue";
import customRouter from './router.js';

import VueGoogleMaps from '@fawmi/vue-google-maps';

const app = createApp(App);
app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyAKiNwTuVIonZ7HCcGZNoE_JI3WqLmUR-A',
    },
})


// on utilise le router défini dans router.js
// avec app.use on rend le router accessible partout dans l'application
app.use(customRouter);

app.mount("#app");