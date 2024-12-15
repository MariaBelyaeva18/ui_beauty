import { defineStore } from 'pinia';
import { api } from '../utils/Api.js';

export const useEmployeeStore = defineStore('employee', {
  state: () => ({
    /** Реестр */
    registry: {
      deleteId: '',
      tableSettingsInfo: {
        limit: 10,
        offset: 0,
        totalItems: 0,
        loading: false,
      },
      /** Массив материалов со склада */
      data: [],

      deleteModalView: false,
    },

    detail: {
      mode: 'create' as 'create' | 'edit' | 'watch',
      services: [],
      roles: [],
      avatarPath: '',
      form: {
        id: null,
        name: '',
        middleName: '',
        lastName: '',
        phone: '',
        roleId: null,
        avatarFile: '',
        username: '',
        password: '',
        masterServiceIds: []
      },
      loadingFlags: {
        upsert: false,
        getDetail: false,
      }
    },
  }),

  actions: {
    /** Получение списка услуг */
    async getList() {
      try {
        this.registry.tableSettingsInfo.loading = true;
        const { data: { data } } = await api.get('/employee/list', {
          params: {
            limit: this.registry.tableSettingsInfo.limit,
            offset: this.registry.tableSettingsInfo.offset,
          },
        });

        this.registry.data = data.data;
        this.registry.tableSettingsInfo.totalItems = data.totalCount;
      } catch (e) {
        console.error(e);
      } finally {
        this.registry.tableSettingsInfo.loading = false;
      }
    },

    /** Получение списка услуг */
    async getDetailInfo(masterId: string) {
      try {
        this.detail.loadingFlags.getDetail = true;
        const { data: { data } } = await api.get(`/employee/detail/${masterId}`);

        this.detail.avatarPath = data.avatarPath

        this.detail.form = {
          id: data.id,
          name: data.name,
          middleName: data.middleName,
          lastName: data.lastName,
          phone: data.phone,
          roleId:data.roleId,
          username: data.username,
          password: data.password,
          masterServiceIds: data.masterServices,
        }
        this.registry.data = data.data;
      } catch (e) {
        console.error(e);
      } finally {
        this.detail.loadingFlags.getDetail = false;
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

        this.detail.services = data.data
      } catch(e) {
        console.error(e)
      }
    },

    /** Получение списка ролей */
    async getRolesList() {
      const { data: { data } } = await api.get('/roles');
      this.detail.roles = data;
    },

    /** Создание услуги */
    async create() {
      try {
        this.detail.loadingFlags.upsert = true;

        const formData = new FormData();
        formData.append('file', this.detail.form.avatarFile);

        formData.append('data', JSON.stringify({
          name: this.detail.form.name,
          middleName: this.detail.form.middleName,
          lastName: this.detail.form.lastName,
          phone: this.detail.form.phone,
          roleId: this.detail.form.roleId,
          username: this.detail.form.username,
          password: this.detail.form.password,
          masterServiceIds: this.detail.form.masterServiceIds
        }));

        await api.post('/employee', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } catch (e) {
        console.error(e);
      } finally {
        this.detail.loadingFlags.upsert = false;
      }
    },

    /** Обновление услуги */
    async update() {
      try {
        this.detail.loadingFlags.upsert = true;
        await api.put('/employee', {
          id: this.detail.form.id,
          name: this.detail.form.name,
          middleName: this.detail.form.middleName,
          lastName: this.detail.form.lastName,
          phone: this.detail.form.phone,
          roleId: this.detail.form.roleId,
          username: this.detail.form.username,
          password: this.detail.form.password,
          masterServiceIds: this.detail.form.masterServiceIds
        });
      } catch (e) {
        console.error(e);
      } finally {
        this.detail.loadingFlags.upsert = false;
      }
    },

    /** Удаление материала */
    async delete() {
      try {
        await api.delete(`/employee/${this.registry.deleteId}`);

        await this.getList();
      } catch (e) {
        console.error(e);
      }
    },

    clearForm() {
      this.detail.form = {
        id: null,
        name: '',
        middleName: '',
        lastName: '',
        phone: '',
        roleId: null,
        avatarFile: '',
        username: '',
        password: '',
        masterServiceIds: []
      };
    },

    /** Обновление аватара пользователя */
    async updateAvatar(file) {

      const formData = new FormData();
      formData.append('file', file);

      await api.post(`users/avatar/${this.detail.form.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      await this.getDetailInfo(this.detail.form.id);
    }

  },
});
