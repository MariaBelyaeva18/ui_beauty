import { defineStore } from 'pinia';
import { api } from '../utils/Api.js';

export const useEmployeeStore = defineStore('employee', {
  state: () => ({
    mode: 'create' as 'create' | 'edit',
    form: {
      id: null,
      name: '',
      middleName: '',
      lastName: '',
      phone: '',
      roleId: null,
      masterServiceIds: []
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
    services: [],

    addEmployeeModalView: false,
    deleteModalView: false,
  }),

  actions: {
    /** Получение списка услуг */
    async getList() {
      try {
        this.tableSettingsInfo.loading = true;
        const { data: { data } } = await api.get('/employee/list', {
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

    /** Получение списка услуг */
    async getServicesList() {
      try {
        const { data: { data } } = await api.get('/services/list', {
          params: {
            limit: 100,
            offset: 0,
          },
        });

        this.services = data.data
      } catch(e) {
        console.error(e)
      }
    },

    /** Создание услуги */
    async create() {
      try {
        this.loadingFlags.upsert = true;
        await api.post('/employee', {
          name: this.form.name,
          middleName: this.form.middleName,
          lastName: this.form.lastName,
          phone: this.form.phone,
          roleId: this.form.roleId,
          masterServiceIds: this.form.masterServiceIds
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
        await api.put('/employee', {
          id: this.form.id,
          name: this.form.name,
          middleName: this.form.middleName,
          lastName: this.form.lastName,
          phone: this.form.phone,
          roleId: this.form.roleId,
          masterServiceIds: this.form.masterServiceIds
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
        await api.delete(`/employee/${this.form.id}`);

        await this.getList();
      } catch (e) {
        console.error(e);
      }
    },

    clearForm() {
      this.form = {
        id: null,
        name: '',
        middleName: '',
        lastName: '',
        phone: '',
        roleId: null,
      };
    }

  },
});
