import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from '@/App.vue';
import router from '@/router';
import localStoragePlugin from '@/plugins/pinia/localStoragePlugin';

const app = createApp(App);

const pinia = createPinia();

// kreira se funkcija koja vraca objekat i nakon toga se ova funkcija registruje u pinia kao plugin
// ovaj property ce biti dostupan u pinia store-u i moci ce da mu se pristupi iz svih komponenti aplikacije
function ourPlugin() {
  return {
    secret: 'TEST',
  };
}
pinia.use(ourPlugin);
// registrovanje naseg custom localStoragePlugin plugina za manipulaciju sa state-om u localStorage
pinia.use(localStoragePlugin);

app.use(pinia);
app.use(router);

app.mount('#app');
