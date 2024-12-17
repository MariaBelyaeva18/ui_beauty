import { defineStore } from 'pinia';
import { api } from '../utils/Api.js';


export const useOrdersStore = defineStore('orders', {
  state: () => ({
    mode: 'create' as 'create' | 'edit',
    form: {
      id: null,
      executionDate: null,
      serviceId: null,
      masterId: null,
      description: '',
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

        const { serviceId, executionDate} = this.form

        console.log(this.form)
        if (!serviceId || !executionDate) {
          return
        }


        const { data: { data } } = await api.get('/orders/master', {
          params: {
            serviceId,
            executionDate,
          },
        });


        this.masters = data
      } catch (error) {
      console.error(error)
      }
    },

    /** Создание заказа */
    async create() {
      const user = JSON.parse(localStorage.getItem('user'));
      try {
        this.loadingFlags.upsert = true;
        await api.post('/orders', {
          executionDate: this.form.executionDate,
          serviceId: this.form.serviceId,
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
        executionDate: null,
        serviceId: null,
        masterId: null,
        description: '',
      };
    }

  },
});
