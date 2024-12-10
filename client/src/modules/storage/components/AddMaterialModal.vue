<template>
  <v-navigation-drawer
    temporary
    class="pa-4"
    location="right"
    width="500"
    title="Добавление нового материала"
    :model-value="storageStore.addMaterialModalView"
    @update:model-value="storageStore.addMaterialModalView = $event"
  >
    <template #default>
      <h1>
        Добавление нового материала
      </h1>
      <v-text-field
        class="mt-4"
        label="Название материала"
        density="comfortable"
        :model-value="storageStore.form.materialName"
        @input="storageStore.form.materialName = $event.target.value"
      />
      <v-text-field
        label="Название материала"
        density="comfortable"
        :model-value="storageStore.form.amount"
        @input="storageStore.form.amount = $event.target.value"
      />
    </template>
    <template #append>
      <v-btn
        class="mr-2"
        color="blue-darken-4"
        variant="outlined"
        @click="storageStore.addMaterialModalView=false"
      >
        Отменить
      </v-btn>
      <v-btn
        color="blue-darken-4"
        variant="flat"
        :loading="storageStore.loadingFlags.createMaterial"
        @click="saveMaterialHandler"
      >
        Сохранить
      </v-btn>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { useStorageStore } from '@/store/storageStore';

const storageStore = useStorageStore();

const saveMaterialHandler = async () => {
  await storageStore.createMaterial();
  storageStore.addMaterialModalView = false;
};
</script>
