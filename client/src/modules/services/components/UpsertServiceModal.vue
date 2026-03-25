<template>
  <v-navigation-drawer
    temporary
    class="pa-4"
    location="right"
    width="500"
    :title="getTitle"
    :model-value="servicesStore.addServiceModalView"
    @update:model-value="closeHandler"
  >
    <template #default>
      <h1>
        {{ getTitle }}
      </h1>
      <v-text-field
        class="mt-4"
        label="Название услуги"
        density="comfortable"
        :model-value="servicesStore.form.name"
        :error="!servicesStore.formValid.name"
        :error-messages="langs[servicesStore.formErrors.name]"
        @input="servicesStore.form.name = $event.target.value"
      />
      <v-text-field
        class="mt-4"
        label="Описание"
        density="comfortable"
        :model-value="servicesStore.form.description"
        :error="!servicesStore.formValid.description"
        :error-messages="langs[servicesStore.formErrors.description]"
        @input="servicesStore.form.description = $event.target.value"
      />
      <v-text-field
        label="Стоимость, руб"
        density="comfortable"
        :model-value="servicesStore.form.cost"
        :error="!servicesStore.formValid.cost"
        :error-messages="langs[servicesStore.formErrors.cost]"
        @input="servicesStore.form.cost = $event.target.value"
        @keypress="onlyNumbers"
      />

      <v-select
        class="mt-4"
        :model-value="servicesStore.form.duration"
        :error="!servicesStore.formValid.duration"
        :error-messages="langs[servicesStore.formErrors.duration]"
        :items="items"
        label="Длительность"
        clearable
        @update:modelValue="servicesStore.form.duration = $event"
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
        :loading="servicesStore.loadingFlags.upsert"
        @click="saveMaterialHandler"
      >
        Сохранить
      </v-btn>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useServicesStore } from '@/store/servicesStore';
import langs from '@/utils/langs';

const servicesStore = useServicesStore();

const getTitle = computed(() => (servicesStore.mode === 'create'
  ? 'Добавление новой услуги'
  : 'Обновление услуги'
));

const items = ref([
  '00:30',
  '01:00',
  '01:30',
  '02:00',
  '02:30',
  '03:00',
  '03:30',
  '04:00',
  '04:30',
  '05:00',
  '05:30',
  '06:00',
  '06:30',
  '07:00',
  '07:30',
  '08:00',
]);

const saveMaterialHandler = async () => {
  if (servicesStore.mode === 'create') {
    await servicesStore.create();
  } else {
    await servicesStore.update();
  }
};

const closeHandler = () => {
  servicesStore.addServiceModalView = false;
  servicesStore.clearForm();
};

const onlyNumbers = (val) => {
  const keyCode = val.keyCode || val.which;
  const keyValue = String.fromCharCode(keyCode);
  const isValid = /^\d+$/.test(keyValue); // Разрешаем только цифры

  if (!isValid) {
    val.preventDefault();
    return false;
  }
  if (servicesStore.form.cost?.length === 7) {
    val.preventDefault();
    return false;
  }

  return true;
};
</script>
