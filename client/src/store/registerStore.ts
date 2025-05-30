import { defineStore } from 'pinia';
import { api } from '../utils/Api.js';

export const useRegisterStore = defineStore('register', {
  state: () => ({
    form: {
      name: null,
      middle_name: null,
      last_name: null,
      username: null,
      password: null,
      repeatPassword: null,
      phone: null,
      role: null,
    },
    passError: false,
  }),

  actions: {
    async createUser(form) {
      if (form.password !== form.repeatPassword) {
        this.passError = true;
        return;
      }

      try {
        this.passError = false;
        await api.post('/auth/register', { ...form });
        this.router.push('/auth');
      } catch (e) {
        console.error(e);
      }
    },

  },
});
