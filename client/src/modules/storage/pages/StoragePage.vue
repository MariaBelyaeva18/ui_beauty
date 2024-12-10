<template>
  <section class="users-page">
    <div class="d-flex justify-space-between">
      <h1>
        Склад
      </h1>
      <v-btn
        color="blue-darken-4"
        variant="flat"
        @click="storageStore.addMaterialModalView = true"
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
    />

    <AddMaterialModal />
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { useStorageStore } from '@/store/storageStore';
import AddMaterialModal from '@/modules/storage/components/AddMaterialModal.vue';
import { headers } from '@/modules/storage/enteties/headers';

const storageStore = useStorageStore();

onMounted(() => {
  storageStore.getList();
});

const changePageHandler = (page) => {
  console.log(page);
  storageStore.tableSettingsInfo.offset = storageStore.tableSettingsInfo.limit * (page - 1);

  storageStore.getList();
};
const changePageItemsHandler = (limit) => {
  console.log(limit);
  storageStore.tableSettingsInfo.limit = limit;

  storageStore.getList();
};

</script>
