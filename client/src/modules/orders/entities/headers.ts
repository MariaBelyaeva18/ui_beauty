import {VDataTableServer} from "vuetify/components";

export const headers: VDataTableServer['headers'] = [
  { title: 'Дата исполнения', key: 'executionDate', align: 'start',  sortable: false },
  { title: 'Услуга', key: 'service.name', align: 'start',  sortable: false },
  { title: 'Клиент', key: 'client.name', align: 'start',  sortable: false },
  { title: 'Мастер', key: 'master.name', align: 'start',  sortable: false },
  { title: 'Комментарий', key: 'description', sortable: false },
  { title: 'Статус', key: 'status', sortable: false },
  { title: 'Actions', key: 'actions', sortable: false },
];
