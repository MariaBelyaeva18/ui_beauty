<template>
  <section class="users-page">
    <div class="d-flex justify-space-between">
      <h1>
        Склад
      </h1>
      <v-btn
        color="blue-darken-4"
        variant="flat"
        @click="storageStore.addMaterialModalView = true; storageStore.mode = 'create'"
      >
        Добавить новый материал
      </v-btn>
    </div>

    <v-data-table-server
      :items-per-page="storageStore.tableSettingsInfo.limit"
      :headers="headers"
      :items="storageStore.materials"
      :items-per-page-options="[
        {value: 10, title: '10'},
        {value: 25, title: '25'},
        {value: 50, title: '50'},
        {value: 100, title: '100'},
      ]"
      :items-length="storageStore.tableSettingsInfo.totalItems"
      :loading="storageStore.tableSettingsInfo.loading"
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
          @click="storageStore.deleteModalView = true; storageStore.form.id = item.id"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table-server>

    <v-dialog
      :model-value="storageStore.deleteModalView"
      max-width="500px"
      @update:model-value="storageStore.deleteModalView = $event"
    >
      <v-card>
        <v-card-text>
          Удаление материала
        </v-card-text>
        <v-card-text class="text-h5">
          Материал будет удален со склада без возможности восстановления.
          Вы уверены, что хотите продолжить?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="storageStore.deleteModalView = false"
          >
            Отмена
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="storageStore.deleteMaterial(); storageStore.deleteModalView = false"
          >
            Удалить
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-dialog>

    <UpsertMaterialModal />
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStorageStore } from '@/store/storageStore';
import UpsertMaterialModal from '@/modules/storage/components/UpsertMaterialModal.vue';
import { headers } from '@/modules/storage/enteties/headers';

const storageStore = useStorageStore();

onMounted(() => {
  storageStore.getList();
});

const changePageHandler = (page) => {
  storageStore.tableSettingsInfo.offset = storageStore.tableSettingsInfo.limit * (page - 1);

  storageStore.getList();
};
const changePageItemsHandler = (limit) => {
  storageStore.tableSettingsInfo.limit = limit;

  storageStore.getList();
};

const editHandler = (item) => {
  storageStore.addMaterialModalView = true;
  storageStore.mode = 'edit';

  storageStore.form = {
    id: item.id,
    materialName: item.name,
    amount: item.amount,
    expirationDate: item.expirationDate,
  };
};

</script>
