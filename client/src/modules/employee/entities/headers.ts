import {VDataTableServer} from "vuetify/components";

export const headers: VDataTableServer['headers'] = [
  { title: 'ФИО', key: 'fio', align: 'start',  sortable: false },
  { title: 'Номер телефона', key: 'phone', align: 'start',  sortable: false },
  { title: 'Роль', key: 'roleName', align: 'start',  sortable: false },
  { title: 'Услуги', key: 'services', align: 'start',  sortable: false },
  { title: 'Actions', key: 'actions', sortable: false },
];
