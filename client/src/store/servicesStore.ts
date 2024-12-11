import { defineStore } from 'pinia';
import { api } from '../utils/Api.js';

export const useServicesStore = defineStore('services', {
  state: () => ({
    mode: 'create' as 'create' | 'edit',
    form: {
      id: null,
      name: '',
      description: '',
      cost: 0,
      duration: null,
    },
    loadingFlags: {
      upsert: false,
    },

    tableSettingsInfo: {
      limit: 10,
      offset: 0,
      totalItems: 0,
      loading: false,
    },

    /** Массив материалов со склада */
    data: [],

    addServiceModalView: false,
    deleteModalView: false,
  }),

  actions: {
    /** Получение списка услуг */
    async getList() {
      try {
        this.tableSettingsInfo.loading = true;
        const { data: { data } } = await api.get('/services/list', {
          params: {
            limit: this.tableSettingsInfo.limit,
            offset: this.tableSettingsInfo.offset,
          },
        });

        this.data = data.data;
        this.tableSettingsInfo.totalItems = data.totalCount;
      } catch (e) {
        console.error(e);
      } finally {
        this.tableSettingsInfo.loading = false;
      }
    },

    /** Создание услуги */
    async create() {
      try {
        this.loadingFlags.upsert = true;
        await api.post('/services', {
          name: this.form.name,
          description: this.form.description,
          cost: this.form.cost,
          duration: this.form.duration,
        });
        this.clearForm();
        await this.getList();
      } catch (e) {
        console.error(e);
      } finally {
        this.loadingFlags.upsert = false;
      }
    },

    /** Обновление услуги */
    async update() {
      try {
        this.loadingFlags.upsert = true;
        await api.patch('/services', {
          id: this.form.id,
          name: this.form.name,
          description: this.form.description,
          cost: this.form.cost,
          duration: this.form.duration,
        });
        this.clearForm();
        await this.getList();
      } catch (e) {
        console.error(e);
      } finally {
        this.loadingFlags.upsert = false;
      }
    },

    /** Удаление материала */
    async delete() {
      try {
        await api.delete(`/services/${this.form.id}`);

        await this.getList();
      } catch (e) {
        console.error(e);
      }
    },

    clearForm() {
      this.form = {
        id: null,
        name: '',
        description: '',
        cost: 0,
        duration: null,
      };
    }

  },
});
