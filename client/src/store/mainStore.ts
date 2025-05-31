import { defineStore } from 'pinia';
import { api } from '../utils/Api.js';

export const useMainStore = defineStore('main', {
  state: () => ({
    loading: false,
    roles: [],
    isEdit: false,
    avatarPath: '',
    form: {
      id: null,
      name: null,
      middle_name: null,
      last_name: null,
      phone: null,
      role_id: null,
      role_name: null,
      username: null,
      password: null,
    },
  }),

  actions: {
    async getList() {
      const { data: { data } } = await api.get('/roles');
      this.roles = data;
    },

    async getUserInfo(avatar?) {
      const user = JSON.parse(localStorage.getItem('user'));
      const { data } = await api.get(`/users/${user.id}`);

      console.log(data);

      if (avatar) {
        this.avatarPath = data.avatar_path;
        return
      }
      this.avatarPath = data.avatar_path;
      this.form = {
        id: data.id,
        name: data.name,
        middle_name: data.middle_name,
        last_name: data.last_name,
        phone: data.phone_number,
        role_id: data.role_id,
        role_name: data.role_name,
        username: data.login,
        password: data.password,
      };
    },

    async updateUserInfo(emplForm) {
      const form = emplForm || this.form
      const user = JSON.parse(localStorage.getItem('user'));
      await api.patch(`/users/${user.id}`, {
        name: form.name,
        middle_name: form.middle_name,
        last_name: form.last_name,
        phone_number: form.phone,
        login: form.username,
        password: form.password,
      });
      await this.getUserInfo();
    },

    async updateAvatar(file) {
      const user = JSON.parse(localStorage.getItem('user'));

      const formData = new FormData();
      formData.append('file', file);

      await api.post(`users/avatar/${user.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      await this.getUserInfo(true);
    },
  },
});
