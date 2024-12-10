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

    tableSettingsInfo: {
      limit: 10,
      offset: 0,
      totalItems: 0,
      loading: false,
    },

    /** Массив материалов со склада */
    materials: [],

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
        await this.getList();
      } catch (e) {
        console.error(e);
      } finally {
        this.loadingFlags.createMaterial = false;
      }
    },

    /** Получение списка материалов */
    async getList() {
      try {
        this.tableSettingsInfo.loading = true;
        const { data: { data } } = await api.get('/storage/list', {
          params: {
            limit: this.tableSettingsInfo.limit,
            offset: this.tableSettingsInfo.offset,
          },
        });

        this.materials = data.materials;
        this.tableSettingsInfo.totalItems = data.totalCount;
      } catch (e) {
        console.error(e);
      } finally {
        this.tableSettingsInfo.loading = false;
      }
    },
  },
});
