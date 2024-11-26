import { defineStore } from 'pinia';
import { api } from '../utils/Api.js';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    form: {
      username: null,
      password: null,
    },
    message: null,
  }),

  actions: {
    async checkUser(payload) {
      try {
        const { data: { data } } = await api.post('/auth', { ...payload });
        this.message = null;
        localStorage.setItem('user', JSON.stringify(data));
        this.router.push({ name: 'users' });
      } catch (e) {
        this.message = e.response.data.message;
        console.error(e);
      }
    },

    async logout() {
      try {
        localStorage.removeItem('user');
      } catch (e) {
        console.error(e);
      } finally {
        window.location.reload();
      }
    },
  },
});
