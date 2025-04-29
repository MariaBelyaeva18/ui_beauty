import './assets/main.css';

import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';
import { VDateInput, VTimePicker } from 'vuetify/labs/components';
import { VueMaskDirective } from 'v-mask';
import { useMainStore } from '@/store/mainStore';
import router from './router';
import App from './App.vue';

import mixins from '@/utils/mixins.js';

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);
app.mixin({
  methods: { ...mixins() },
});
app.directive('mask', VueMaskDirective);

const vuetify = createVuetify({
  components: {
    ...components,
    VDateInput,
    VTimePicker,
  },
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

app.mount('#app');
