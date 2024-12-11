import {VDataTableServer} from "vuetify/components";

export const headers: VDataTableServer['headers'] = [
  { title: 'Название услуги', key: 'name', align: 'start',  sortable: false },
  { title: 'Описание', key: 'description', align: 'start',  sortable: false },
  { title: 'Стоимость', key: 'cost', align: 'start',  sortable: false },
  { title: 'Длительность', key: 'duration', align: 'start',  sortable: false },
  { title: 'Actions', key: 'actions', sortable: false },
];
