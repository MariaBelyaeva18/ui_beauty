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
      reason: '',
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
        await this.getAbsence();
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
        await api.put('/employee-absence', {
          id: this.form.id,
          employeeId: this.form.employeeId,
          dateFrom: this.form.dateFrom,
          dateTo: this.form.dateTo,
          reason: this.form.reason,
        });
        await this.getAbsence();
      } catch (e) {
        console.error(e);
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
    }
  },
});
