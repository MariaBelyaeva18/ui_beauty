import { defineStore } from 'pinia';

export const useStorageStore = defineStore('storage', {
  state: () => ({
    form: {
      materialName: '',
      amount: 0,
    },
    addMaterialModalView: false,
  }),

  actions: {
  },
});
