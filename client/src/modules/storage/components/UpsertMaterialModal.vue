<template>
  <v-navigation-drawer
    temporary
    class="pa-4"
    location="right"
    width="500"
    :title="getTitle"
    :model-value="storageStore.addMaterialModalView"
    @update:model-value="closeHandler"
  >
    <template #default>
      <h1>
        {{ getTitle }}
      </h1>
      <v-text-field
        class="mt-4"
        label="Название материала"
        density="comfortable"
        :model-value="storageStore.form.materialName"
        @input="storageStore.form.materialName = $event.target.value"
      />
      <v-text-field
        label="Количество материала"
        density="comfortable"
        :model-value="storageStore.form.amount"
        @input="storageStore.form.amount = $event.target.value"
      />
      <v-date-input
        label="Годен до"
        prepend-icon=""
        variant="outlined"
        persistent-placeholder
        :model-value="storageStore.form.expirationDate"
        @update:modelValue="storageStore.form.expirationDate = $event"
      />
    </template>
    <template #append>
      <v-btn
        class="mr-2"
        color="blue-darken-4"
        variant="outlined"
        @click="closeHandler "
      >
        Отменить
      </v-btn>
      <v-btn
        color="blue-darken-4"
        variant="flat"
        :loading="storageStore.loadingFlags.upsertMaterial"
        @click="saveMaterialHandler"
      >
        Сохранить
      </v-btn>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { computed } from 'vue';
import { useStorageStore } from '@/store/storageStore';

const storageStore = useStorageStore();

const getTitle = computed(() => (storageStore.mode === 'create'
  ? 'Добавление нового материала'
  : 'Обновление материала'
));

const saveMaterialHandler = async () => {
  if (storageStore.mode === 'create') {
    await storageStore.createMaterial();
  } else {
    await storageStore.updateMaterial();
  }
  storageStore.addMaterialModalView = false;
};

const closeHandler = () => {
  storageStore.addMaterialModalView = false;
  storageStore.clearForm();
};
</script>
