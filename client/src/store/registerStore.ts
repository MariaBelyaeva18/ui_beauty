import { defineStore } from 'pinia';
import { tr } from 'vuetify/locale';
import { api } from '../utils/Api.js';

export const useRegisterStore = defineStore('register', {
  state: () => ({
    form: {
      name: null,
      middle_name: null,
      last_name: null,
      username: null,
      password: null,
      repeatPassword: null,
      phone: null,
      role: null,
    },
    formValid: {
      name: true,
      middle_name: true,
      last_name: true,
      username: true,
      password: true,
      repeatPassword: true,
      phone: true,
      role: true,
    },
    formErrors: {
      name: null,
      middle_name: null,
      last_name: null,
      username: null,
      password: null,
      repeatPassword: null,
      phone: null,
      role: null,
    },
    passError: false,
  }),

  actions: {
    async createUser(form) {
      if (form.password !== form.repeatPassword) {
        this.passError = true;
        return;
      }

      try {
        this.passError = false;
        await api.post('/auth/register', { ...form });
        this.router.push('/auth');
      } catch (e) {
        console.error(e);
        const { data: { errorList = {} } = {} } = e.response.data;
        if (errorList) {
          this.checkError(errorList);
        }
      }
    },

    reset() {
      this.passError = false;
      this.form = {
        name: null,
        middle_name: null,
        last_name: null,
        username: null,
        password: null,
        repeatPassword: null,
        phone: null,
        role: null,
      };
      this.formValid = {
        name: true,
        middle_name: true,
        last_name: true,
        username: true,
        password: true,
        repeatPassword: true,
        phone: true,
        role: true,
      };
      this.formErrors = {
        name: null,
        middle_name: null,
        last_name: null,
        username: null,
        password: null,
        repeatPassword: null,
        phone: null,
        role: null,
      };
    },

    checkError(errorList) {
      this.formValid = {
        name: true,
        middle_name: true,
        last_name: true,
        username: true,
        password: true,
        repeatPassword: true,
        phone: true,
        role: true,
      };
      this.formErrors = {
        name: null,
        middle_name: null,
        last_name: null,
        username: null,
        password: null,
        repeatPassword: null,
        phone: null,
        role: null,
      };
      Object.keys(errorList).forEach((el) => {
        this.formValid[el] = false;
        this.formErrors[el] = errorList[el];
      });
    },
  },
});
