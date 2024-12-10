import {VDataTableServer} from "vuetify/components";

export const headers: VDataTableServer['headers'] = [
  { title: 'Название материала', key: 'name', align: 'start',  sortable: false },
  { title: 'Кол-во', key: 'amount', align: 'start',  sortable: false },
  { title: 'Годен до', key: 'expirationDate', align: 'start',  sortable: false },
  { title: 'Actions', key: 'actions', sortable: false },
];
