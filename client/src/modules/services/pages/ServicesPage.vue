<template>
  <section class="users-page">
    <div class="d-flex justify-space-between">
      <h1>
        Услуги
      </h1>
      <v-btn
        color="blue-darken-4"
        variant="flat"
        @click="servicesStore.addServiceModalView = true; servicesStore.mode = 'create'"
      >
        Добавить новую услугу
      </v-btn>
    </div>

    <v-data-table-server
      :items-per-page="servicesStore.tableSettingsInfo.limit"
      :headers="headers"
      :items="servicesStore.data"
      :items-per-page-options="[
        {value: 10, title: '10'},
        {value: 25, title: '25'},
        {value: 50, title: '50'},
        {value: 100, title: '100'},
      ]"
      :items-length="servicesStore.tableSettingsInfo.totalItems"
      :loading="servicesStore.tableSettingsInfo.loading"
      item-value="id"
      @update:page="changePageHandler"
      @update:items-per-page="changePageItemsHandler"
    >
      <template #item.actions="{ item }">
        <v-icon
          class="me-2"
          size="small"
          @click="editHandler(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          size="small"
          @click="servicesStore.deleteModalView = true; servicesStore.form.id = item.id"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table-server>

    <v-dialog
      :model-value="servicesStore.deleteModalView"
      max-width="500px"
      @update:model-value="servicesStore.deleteModalView = $event"
    >
      <v-card>
        <v-card-text>
          Удаление услуги
        </v-card-text>
        <v-card-text class="text-h5">
          Вы уверены, что хотите продолжить удаление?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="servicesStore.deleteModalView = false"
          >
            Отмена
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="servicesStore.delete(); servicesStore.deleteModalView = false"
          >
            Удалить
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>

    <UpsertServiceModal />
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import UpsertServiceModal from '@/modules/services/components/UpsertServiceModal.vue';
import { headers } from '@/modules/services/entities/headers';
import { useServicesStore } from '@/store/servicesStore';

const servicesStore = useServicesStore();

onMounted(() => {
  servicesStore.getList();
});

const changePageHandler = (page) => {
  servicesStore.tableSettingsInfo.offset = servicesStore.tableSettingsInfo.limit * (page - 1);

  servicesStore.getList();
};
const changePageItemsHandler = (limit) => {
  servicesStore.tableSettingsInfo.limit = limit;

  servicesStore.getList();
};

const editHandler = (item) => {
  servicesStore.addServiceModalView = true;
  servicesStore.mode = 'edit';

  servicesStore.form = {
    id: item.id,
    name: item.name,
    description: item.description,
    cost: item.cost,
    duration: item.duration,
  };
};

</script>
