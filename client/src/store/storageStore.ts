import { defineStore } from 'pinia';
import { api } from '../utils/Api.js';

export const useStorageStore = defineStore('storage', {
  state: () => ({
    form: {
      materialName: '',
      amount: 0,
    },
    loadingFlags: {
      createMaterial: false,
    },

    addMaterialModalView: false,
  }),

  actions: {
    /** Создание нового материала на складе */
    async createMaterial() {
      try {
        this.loadingFlags.createMaterial = true;
        await api.post('/storage', this.form);
        this.form = {
          materialName: '',
          amount: 0,
        };
      } catch (e) {
        console.error(e);
      } finally {
        this.loadingFlags.createMaterial = false;
      }
    },
  },
});
