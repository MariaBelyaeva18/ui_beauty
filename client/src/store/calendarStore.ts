import { defineStore } from 'pinia';
import { api } from '../utils/Api.js';

export const useCalendarStore = defineStore('calendar', {
  state: () => ({
    currentMonth: null,
    currentYear: null,

    absence: [],
    employees: [],
    form: {
      id: null,
      employeeId: null,
      dateFrom: null,
      dateTo: null,
      reason: null,
    },
    formValid: {
      id: true,
      employeeId: true,
      dateFrom: true,
      dateTo: true,
      reason: true,
    },
    formErrors: {
      id: null,
      employeeId: null,
      dateFrom: null,
      dateTo: null,
      reason: null,
    },
    loadingFlags: {
      upsert: false
    },
    addAbsenceModalView: false,
    mode: 'create' as 'create' | 'edit',
  }),

  actions: {
    /** Получение списка сотрудников */
    async getEmployeesList() {
      const { data: { data: {data} } } = await api.get('/employee/list', {
        params: {
          limit: 100,
          offset: 0,
        },
      });
      this.employees = data;
    },

    /** Получение списка отсутствий */
    async getAbsence() {

      const { data: {data} } = await api.get('employee-absence/list', {
        params: {
          month: this.currentMonth + 1,
          year: this.currentYear
        }
      })

      this.absences = data;
    },

    /** Создание отсутствия */
    async create() {
      try {
        this.loadingFlags.upsert = true;
        await api.post('employee-absence', {
          employeeId: this.form.employeeId,
          dateFrom: this.form.dateFrom,
          dateTo: this.form.dateTo,
          reason: this.form.reason,
        });
        this.addAbsenceModalView = false;
        await this.getAbsence();
        this.clearForm();
      } catch (e) {
        console.error(e);
        const { data: { errorList = {} } = {} } = e.response.data;
        if (errorList) {
          this.checkError(errorList);
        }
      } finally {
        this.loadingFlags.upsert = false;
      }
    },

    /** Обновление услуги */
    async update() {
      try {
        this.loadingFlags.upsert = true;
        await api.put('/employee-absence', {
          id: this.form.id,
          employeeId: this.form.employeeId,
          dateFrom: this.form.dateFrom,
          dateTo: this.form.dateTo,
          reason: this.form.reason,
        });
        this.addAbsenceModalView = false;
        await this.getAbsence();
        this.clearForm();
      } catch (e) {
        console.error(e);
        const { data: { errorList = {} } = {} } = e.response.data;
        if (errorList) {
          this.checkError(errorList);
        }
      } finally {
        this.loadingFlags.upsert = false;
      }
    },

    /** Обновление услуги */
    async delete() {
      try {
        this.loadingFlags.upsert = true;
        await api.put(`/employee-absence/${this.form.id}`);
        await this.getAbsence();

        this.addAbsenceModalView = false;
        this.clearForm();
      } catch (e) {
        console.error(e);
        const { data: { errorList = {} } = {} } = e.response.data;
        if (errorList) {
          this.checkError(errorList);
        }
      } finally {
        this.loadingFlags.upsert = false;
      }
    },


    clearForm() {
      this.form = {
        id: null,
        employeeId: null,
        dateFrom: null,
        dateTo: null,
        reason: null,
      }
      this.formValid = {
        id: true,
        employeeId: true,
        dateFrom: true,
        dateTo: true,
        reason: true,
      };
      this.formErrors = {
        id: null,
        employeeId: null,
        dateFrom: null,
        dateTo: null,
        reason: null,
      };
    },

    checkError(errorList) {
      this.formValid = {
        id: true,
        employeeId: true,
        dateFrom: true,
        dateTo: true,
        reason: true,
      };
      this.formErrors = {
        id: null,
        employeeId: null,
        dateFrom: null,
        dateTo: null,
        reason: null,
      };
      Object.keys(errorList).forEach((el) => {
        this.formValid[el] = false;
        this.formErrors[el] = errorList[el];
      })
    },
  },
});
