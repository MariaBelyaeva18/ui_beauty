import './assets/main.css';

import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';
import { useMainStore } from '@/store/mainStore';

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);

const vuetify = createVuetify({
  components,
  directives,
});

app.use(vuetify);
app.use(router);

/** Нужно, чтобы в сторах pinia можно было использовать this.router */
pinia.use(({ store }) => {
  store.router = markRaw(router);
});

const mainStore = useMainStore();
mainStore.getList();
mainStore.getUserInfo();

app.mount('#app');
