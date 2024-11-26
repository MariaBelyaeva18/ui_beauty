import { defineStore } from 'pinia';
import { api } from '../utils/Api.js';

export const useMainStore = defineStore('main', {
  state: () => ({
    loading: false,
    roles: [],
  }),

  actions: {
    async getList() {
      const { data: { data } } = await api.get('/roles');
      this.roles = data;
    },
  },
});
