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
        :error="!storageStore.formValid.materialName"
        :error-messages="langs[storageStore.formErrors.materialName]"
        density="comfortable"
        :model-value="storageStore.form.materialName"
        @input="storageStore.form.materialName = $event.target.value"
      />
      <v-text-field
        class="mt-4"
        label="Количество материала (не меньше 1)"
        :error="!storageStore.formValid.amount"
        :error-messages="langs[storageStore.formErrors.amount]"
        density="comfortable"
        :model-value="storageStore.form.amount"
        @input="storageStore.form.amount = $event.target.value"
        @keypress="onlyNumbers"
      />
      <v-date-input
        class="mt-4"
        label="Годен до"
        :min="storageStore.mode === 'create' ? new Date() : null"
        :error="!storageStore.formValid.expirationDate"
        :error-messages="langs[storageStore.formErrors.expirationDate]"
        prepend-icon=""
        :model-value="storageStore.form.expirationDate"
        @update:modelValue="storageStore.form.expirationDate = $event"
      />
    </template>
    <template #append>
      <v-btn
        class="mr-2"
        color="blue-darken-4"
        variant="outlined"
        @click="closeHandler"
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
import langs from '@/utils/langs';

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
};

const closeHandler = () => {
  storageStore.addMaterialModalView = false;
  storageStore.clearForm();
};

const onlyNumbers = (val) => {
  const keyCode = val.keyCode || val.which;
  const keyValue = String.fromCharCode(keyCode);
  const isValid = /^\d+$/.test(keyValue); // Разрешаем только цифры

  if (!isValid) {
    val.preventDefault();
    return false;
  }

  return true;
};
</script>
