<template>
  <section class="users-page">
    <div class="d-flex justify-space-between">
      <h1>
        Заказы
      </h1>
      <div>
        <v-btn
          class="mr-4"
          color="blue-darken-4"
          variant="flat"
          @click="printPdf()"
        >
          Сгенерировать отчет
        </v-btn>
        <v-btn
          color="blue-darken-4"
          variant="flat"
          @click="ordersStore.addOrderModalView = true; ordersStore.mode = 'create'"
        >
          Добавить новый заказ
        </v-btn>
      </div>
    </div>

    <v-data-table-server
      :items-per-page="ordersStore.tableSettingsInfo.limit"
      :headers="headers"
      :items="ordersStore.data"
      :items-per-page-options="[
        {value: 10, title: '10'},
        {value: 25, title: '25'},
        {value: 50, title: '50'},
        {value: 100, title: '100'},
      ]"
      :items-length="ordersStore.tableSettingsInfo.totalItems"
      :loading="ordersStore.tableSettingsInfo.loading"
      item-value="id"
      @update:page="changePageHandler"
      @update:items-per-page="changePageItemsHandler"
    >
      <template #item.status="{ item }">
        <v-chip
          :color="statuses[item.status].color"
        >
          {{ statuses[item.status].text }}
        </v-chip>
      </template>
      <template #item.actions="{ item }">
        <div class="d-flex ga-1">
          <v-icon
            size="small"
            title="Редактировать заказ"
            @click="editHandler(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            size="small"
            title="Отменить заказ"
            @click="ordersStore.cancelModalView = true; ordersStore.form.id = item.id"
          >
            mdi-cancel
          </v-icon>
          <v-icon
            size="small"
            title="Взять в работу"
            @click="ordersStore.acceptOrder(item.id)"
          >
            mdi-briefcase-outline
          </v-icon>
          <v-icon
            size="small"
            title="Завершить заказ"
            @click="ordersStore.doneOrder(item.id)"
          >
            mdi-check
          </v-icon>
        </div>
      </template>
    </v-data-table-server>

    <v-dialog
      :model-value="ordersStore.cancelModalView"
      max-width="500px"
      @update:model-value="ordersStore.cancelModalView = $event"
    >
      <v-card>
        <v-card-text>
          Отмена заказа
        </v-card-text>
        <v-card-text class="text-h5">
          Вы уверены, что хотите продолжить отмену?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="ordersStore.cancelModalView = false"
          >
            Отмена
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="ordersStore.cancelOrder(); ordersStore.cancelModalView = false"
          >
            Продолжить
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>

    <UpsertOrderModal />
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { useOrdersStore } from '@/store/ordersStore';
import UpsertOrderModal from '@/modules/orders/components/UpsertOrderModal.vue';
import { headers } from '@/modules/orders/entities/headers';
import { statuses } from '@/modules/services/entities/statuses';

const ordersStore = useOrdersStore();

onMounted(() => {
  ordersStore.getList();
  ordersStore.getServicesList();
});

const changePageHandler = (page) => {
  ordersStore.tableSettingsInfo.offset = ordersStore.tableSettingsInfo.limit * (page - 1);

  ordersStore.getList();
};
const changePageItemsHandler = (limit) => {
  ordersStore.tableSettingsInfo.limit = limit;

  ordersStore.getList();
};

const editHandler = (item) => {
  ordersStore.addOrderModalView = true;
  ordersStore.mode = 'edit';

  ordersStore.form = {
    id: item.id,
    executionDate: item.executionDate,
    serviceId: item.service.id,
    masterId: item.master.id,
    description: item.description,
  };

  ordersStore.masters = [item.master];
};

const printPdf = async () => {
  try {
    const newTab = window.open('http://localhost:8080/orders/report', '_blank');

    setTimeout(() => {
      if (newTab) {
        console.log('HERERER');
        newTab.print(); // Открывает диалог печати
      } else {
        console.error('Не удалось открыть новое окно');
      }
    }, 5000);
  } catch (error) {
    console.error('Ошибка при печати PDF:', error);
  }
};

</script>
