<template>
  <section class="users-page">
    <div class="d-flex justify-space-between">
      <h1>
        Сотрудники
      </h1>
      <v-btn
        color="blue-darken-4"
        variant="flat"
        @click="$router.push('/employee/new')"
      >
        Добавить нового сотрудника
      </v-btn>
    </div>

    <v-data-table-server
      :items-per-page="employeeStore.registry.tableSettingsInfo.limit"
      :headers="headers"
      :items="employeeStore.registry.data"
      :items-per-page-options="[
        {value: 10, title: '10'},
        {value: 25, title: '25'},
        {value: 50, title: '50'},
        {value: 100, title: '100'},
      ]"
      :items-length="employeeStore.registry.tableSettingsInfo.totalItems"
      :loading="employeeStore.registry.tableSettingsInfo.loading"
      item-value="id"
      @update:page="changePageHandler"
      @update:items-per-page="changePageItemsHandler"
    >
      <template #item.services="{ item }">
        <v-chip
          v-for="service in item.masterServices"
          :key="service.id"
          class="mt-2 d-block"
        >
          {{ service.name }}
        </v-chip>
      </template>
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
          @click="employeeStore.registry.deleteModalView = true;
                  employeeStore.registry.deleteId = item.id"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table-server>

    <v-dialog
      :model-value="employeeStore.registry.deleteModalView"
      max-width="500px"
      @update:model-value="employeeStore.registry.deleteModalView = $event"
    >
      <v-card>
        <v-card-text>
          Удаление сотрудника
        </v-card-text>
        <v-card-text class="text-h5">
          Вы уверены, что хотите продолжить удаление?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="employeeStore.registry.deleteModalView = false"
          >
            Отмена
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="employeeStore.delete(); employeeStore.registry.deleteModalView = false"
          >
            Удалить
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { headers } from '@/modules/employee/registry/entities/headers';
import { useEmployeeStore } from '@/store/employeeStore';
import router from '@/router';

const employeeStore = useEmployeeStore();

onMounted(() => {
  employeeStore.getList();
});

const changePageHandler = (page) => {
  employeeStore.registry.tableSettingsInfo.offset = employeeStore
    .registry.tableSettingsInfo.limit * (page - 1);

  employeeStore.getList();
};
const changePageItemsHandler = (limit) => {
  employeeStore.registry.tableSettingsInfo.limit = limit;

  employeeStore.getList();
};

const editHandler = (item) => {
  router.push({
    path: (`/employee/${item.id}`),
    query: {
      mode: 'edit',
    },
  });
};

</script>
