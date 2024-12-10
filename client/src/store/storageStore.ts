import { defineStore } from 'pinia';
import { api } from '../utils/Api.js';

export const useStorageStore = defineStore('storage', {
  state: () => ({
    mode: 'create' as 'create' | 'edit',
    form: {
      id: null,
      materialName: '',
      expirationDate: null,
      amount: 0,
    },
    loadingFlags: {
      upsertMaterial: false,
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
    deleteModalView: false,
  }),

  actions: {
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

    /** Создание нового материала на складе */
    async createMaterial() {
      try {
        this.loadingFlags.upsertMaterial = true;
        await api.post('/storage', {
          materialName: this.form.materialName,
          amount: this.form.amount,
          expirationDate: this.form.expirationDate
        });
        this.clearForm();
        await this.getList();
      } catch (e) {
        console.error(e);
      } finally {
        this.loadingFlags.upsertMaterial = false;
      }
    },

    /** Обновление материала */
    async updateMaterial() {
      try {
        this.loadingFlags.upsertMaterial = true;
        await api.patch('/storage', {
          id: this.form.id,
          materialName: this.form.materialName,
          amount: this.form.amount,
          expirationDate: this.form.expirationDate
        });
        this.clearForm();
        await this.getList();
      } catch (e) {
        console.error(e);
      } finally {
        this.loadingFlags.upsertMaterial = false;
      }
    },

    /** Удаление материала */
    async deleteMaterial() {
      try {
        await api.delete(`/storage/${this.form.id}`);

        await this.getList();
      } catch (e) {
        console.error(e);
      }
    },

    clearForm() {
      this.form = {
        id: null,
        materialName: '',
        amount: 0,
        expirationDate: null
      };
    }

  },
});
