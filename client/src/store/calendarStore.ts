import { defineStore } from 'pinia';
import { api } from '../utils/Api.js';

export const useCalendarStore = defineStore('calendar', {
  state: () => ({
    absence: [],
    employees: [],
    form: {
      employeeId: null,
      dateFrom: null,
      dateTo: null,
      reason: null,
    },
    addAbsenceModalView: false,
    mode: 'create',
  }),

  actions: {
    /** Получение списка сотрудников */
    async getEmployeesList() {
      const { data: { data } } = await api.get('/employee/list', {
        params: {
          limit: 100,
          offset: 0,
        },
      });
      this.employees = data;
    },
    async getAbsence() {
      const test = [
        {
          id: '5a37e1e9-2453-488e-a113-72a166bd25bf',
          employee: {
            id: '6a37e1e9-2453-488e-a113-72a166bd25bf',
            name: 'Артем Сергеевич Клиненко',
          },
          dateFrom: '2024-12-15 17:15:54.525000 +00:00',
          dateTo: '2024-12-30 17:15:54.525000 +00:00',
          reason: 'Ежегодный оплачиваемый отпуск',
        },
        {
          id: 'e1125c74-0354-4bc9-89e0-f76849d9da0c',
          employee: {
            id: '7a37e1e9-2453-488e-a113-72a166bd25bf',
            name: 'Валерия Геннадьевна Ткаченко',
          },
          dateFrom: '2024-12-30 17:15:54.525000 +00:00',
          dateTo: '2025-01-12 17:15:54.525000 +00:00',
          reason: 'Больничный',
        },
        {
          id: '25e0d744-22b6-47d0-a84f-8b3fcf60299b',
          employee: {
            id: '7a37e1e9-2453-488e-a113-72a166bd25bf',
            name: 'Валерия Геннадьевна Ткаченко',
          },
          dateFrom: '2024-11-28 17:15:54.525000 +00:00',
          dateTo: '2024-12-05 17:15:54.525000 +00:00',
          reason: 'За свой счет',
        },
      ];
      this.absences = test.map((el) => {
        const name = el.employee.name.split(' ');
        name.splice(1, 1);
        return {
          ...el,
          name: name.join(' '),
        };
      });
    },
  },
});
