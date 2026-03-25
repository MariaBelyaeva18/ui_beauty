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
    formValid: {
      id: true,
      name: true,
      lastName: true,
      roleId: true,
      login: true,
      password: true,
    },
    formErrors: {
      id: null,
      name: null,
      lastName: null,
      roleId: null,
      login: null,
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
      this.formValid = {
        id: true,
        name: true,
        middleName: true,
        lastName: true,
        phone: true,
        roleId: true,
        avatarFile: true,
        login: true,
        password: true,
      };
      this.formErrors = {
        id: null,
        name: null,
        middleName: null,
        lastName: null,
        phone: null,
        roleId: null,
        avatarFile: null,
        login: null,
        password: null,
      };
    },

    async updateUserInfo(emplForm) {
      const form = emplForm || this.form
      const user = JSON.parse(localStorage.getItem('user'));
      try{
        await api.patch(`/users/${user.id}`, {
          name: form.name,
          middle_name: form.middle_name,
          last_name: form.last_name,
          phone_number: form.phone,
          login: form.username,
          password: form.password,
        });
        await this.getUserInfo();

        this.isEdit = false;
      } catch (e) {
        console.log(e)
        const { data: { errorList = {} } = {} } = e.response.data;
        if (errorList) {
          this.checkError(errorList);
        }
      }
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

    checkError(errorList) {
      this.formValid = {
        id: true,
        name: true,
        middleName: true,
        lastName: true,
        phone: true,
        roleId: true,
        avatarFile: true,
        username: true,
        password: true,
      };
      this.formErrors = {
        id: null,
        name: null,
        middleName: null,
        lastName: null,
        phone: null,
        roleId: null,
        avatarFile: null,
        username: null,
        password: null,
      };
      Object.keys(errorList).forEach((el) => {
        this.formValid[el] = false;
        this.formErrors[el] = errorList[el];
      })
    },
  },
});
