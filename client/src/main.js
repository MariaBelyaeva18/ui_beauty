import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';
import { store } from '@/store';

const app = createApp(App);

app.use(createPinia());

const vuetify = createVuetify({
  components,
  directives,
});

app.use(vuetify);
app.use(router);

store().getList();

app.mount('#app');
