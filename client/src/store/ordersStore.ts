import { defineStore } from 'pinia';
import { api } from '../utils/Api.js';


export const useOrdersStore = defineStore('orders', {
  state: () => ({
    mode: 'create' as 'create' | 'edit',
    form: {
      id: null,
      executionDate: null,
      time: null,
      serviceId: null,
      masterId: null,
      description: '',
    },
    formValid: {
      id: true,
      executionDate: true,
      time: true,
      serviceId: true,
      masterId: true,
      description: true,
    },
    formErrors: {
      id: null,
      executionDate: null,
      time: null,
      serviceId: null,
      masterId: null,
      description: null,
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

    /** Массив заказов */
    data: [],
    /** Список услуг */
    services: [],
    /** Список мастеров */
    masters: [],
    addOrderModalView: false,
    cancelModalView: false,
    items: [],
  }),

  actions: {
    /** Получение списка услуг */
    async getList() {
      const user = JSON.parse(localStorage.getItem('user'));
      try {
        this.tableSettingsInfo.loading = true;
        const { data: { data: { data, count } } } = await api.get('/orders/list', {
          params: {
            contextUserId: user.id,
            limit: this.tableSettingsInfo.limit,
            offset: this.tableSettingsInfo.offset,
          },
        });

        this.data = data;
        this.tableSettingsInfo.totalItems = count;
      } catch (e) {
        console.error(e);
      } finally {
        this.tableSettingsInfo.loading = false;
      }
    },

    /** Получение списка услуг */
    async getServicesList() {
      try {

        const { data: { data: {data} } } = await api.get('/services/list', {
          params: {
            limit: 100,
          },
        });

        this.services = data
      } catch (error) {
      console.error(error)
      }
    },

    /** Получение списка доступных мастеров */
    async getMasterList() {
      try {

        const { serviceId } = this.form

        console.log(this.form)
        if (!serviceId) {
          return
        }


        const { data: { data } } = await api.get('/orders/master', {
          params: {
            serviceId,
          },
        });


        this.masters = data
      } catch (error) {
      console.error(error)
      }
    },

    async getTimeSlots() {
      const { serviceId, executionDate, masterId } = this.form
      const { data } = await api.get('/orders/', {
        params: {
          serviceId,
          masterId,
          date: executionDate,
        },
      });
      this.items = data;
    },

    /** Создание заказа */
    async create() {
      const user = JSON.parse(localStorage.getItem('user'));
      try {
        this.loadingFlags.upsert = true;
        await api.post('/orders', {
          executionDate: this.form.executionDate,
          serviceId: this.form.serviceId,
          time: this.form.time,
          clientId: user.id,
          masterId: this.form.masterId,
          description: this.form.description,
        });
        this.clearForm();
        await this.getList();
      } catch (e) {
        console.error(e);
      } finally {
        this.loadingFlags.upsert = false;
      }
    },

    /** Обновление заказа */
    async update() {
      const user = JSON.parse(localStorage.getItem('user'));
      try {
        this.loadingFlags.upsert = true;
        await api.put('/orders', {
          id: this.form.id,
          executionDate: this.form.executionDate,
          serviceId: this.form.serviceId,
          time: this.form.time,
          clientId: user.id,
          masterId: this.form.masterId,
          description: this.form.description,
        });
        this.clearForm();
        await this.getList();
      } catch (e) {
        console.error(e);
      } finally {
        this.loadingFlags.upsert = false;
      }
    },

    /** Отмена заказа */
    async cancelOrder() {
      try {
        await api.patch(`/orders/cancel/${this.form.id}`);

        await this.getList();
      } catch (e) {
        console.error(e);
      }
    },

    /** Взятие в работу заказа */
    async acceptOrder(orderId: string) {
      try {
        await api.patch(`/orders/accept/${orderId}`);

        await this.getList();
      } catch (e) {
        console.error(e);
      }
    },

    /** Завершение заказа */
    async doneOrder(orderId: string) {
      try {
        await api.patch(`/orders/done/${orderId}`);

        await this.getList();
      } catch (e) {
        console.error(e);
      }
    },

    clearForm() {
      this.form = {
        id: null,
        time: null,
        executionDate: null,
        serviceId: null,
        masterId: null,
        description: '',
      };
      this.formValid = {
        id: true,
        time: true,
        executionDate: true,
        serviceId: true,
        masterId: true,
        description: true,
      };
      this.formErrors = {
        id: null,
        time: null,
        executionDate: null,
        serviceId: null,
        masterId: null,
        description: null,
      };
    },

    checkError(errorList) {
      this.formValid = {
        id: true,
        time: true,
        executionDate: true,
        serviceId: true,
        masterId: true,
        description: true,
      };
      this.formErrors = {
        id: null,
        time: null,
        executionDate: null,
        serviceId: null,
        masterId: null,
        description: null,
      };
      Object.keys(errorList).forEach((el) => {
        this.formValid[el] = false;
        this.formErrors[el] = errorList[el];
      })
    },
  },
});
