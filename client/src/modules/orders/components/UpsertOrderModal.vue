<template>
  <v-navigation-drawer
    temporary
    class="pa-4"
    location="right"
    width="500"
    :title="getTitle"
    :model-value="ordersStore.addOrderModalView"
    @update:model-value="closeHandler"
  >
    <template #default>
      <h1>
        {{ getTitle }}
      </h1>

      <v-select
        class="mt-4"
        label="Услуга"
        :items="ordersStore.services"
        item-title="name"
        item-value="id"
        :disabled="ordersStore.mode === 'edit'"
        density="comfortable"
        :model-value="ordersStore.form.serviceId"
        :error="!ordersStore.formValid.serviceId"
        :error-messages="langs[ordersStore.formErrors.serviceId]"
        @update:modelValue="ordersStore.form.serviceId = $event; checkMasterInfo()"
      />
      <v-select
        class="mt-4"
        label="Мастер"
        :items="ordersStore.masters"
        item-title="name"
        item-value="id"
        :disabled="ordersStore.mode === 'edit' || !ordersStore.form.serviceId"
        density="comfortable"
        :model-value="ordersStore.form.masterId"
        :error="!ordersStore.formValid.masterId"
        :error-messages="langs[ordersStore.formErrors.masterId]"
        @update:modelValue="ordersStore.form.masterId = $event"
      />

      <v-date-input
        label="Дата записи"
        prepend-icon=""
        variant="outlined"
        :min="new Date()"
        :disabled="!ordersStore.form.masterId"
        :model-value="ordersStore.form.executionDate"
        :error="!ordersStore.formValid.executionDate"
        :error-messages="langs[ordersStore.formErrors.executionDate]"
        @update:modelValue="ordersStore.form.executionDate = $event; ordersStore.form.time = null; ordersStore.getTimeSlots()"
      />
      <v-select
        class="mt-4"
        :model-value="ordersStore.form.time"
        :error="!ordersStore.formValid.time"
        :error-messages="langs[ordersStore.formErrors.time]"
        :items="ordersStore.items"
        :disabled="!ordersStore.form.executionDate"
        label="Время записи"
        clearable
        @update:modelValue="ordersStore.form.time = $event"
      />
      <v-text-field
        class="mt-5"
        label="Комментарий"
        density="comfortable"
        :disabled="['Мастер', 'Управляющий'].includes(mainStore.form.role_name)"
        :model-value="ordersStore.form.description"
        :error="!ordersStore.formValid.description"
        :error-messages="langs[ordersStore.formErrors.description]"
        @input="ordersStore.form.description = $event.target.value"
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
        :loading="ordersStore.loadingFlags.upsert"
        @click="saveMaterialHandler"
      >
        Сохранить
      </v-btn>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useOrdersStore } from '@/store/ordersStore';
import langs from '@/utils/langs';
import { useMainStore } from '@/store/mainStore';

const ordersStore = useOrdersStore();
const mainStore = useMainStore();

const getTitle = computed(() => (ordersStore.mode === 'create'
  ? 'Добавление нового заказа'
  : 'Обновление заказа'
));

const saveMaterialHandler = async () => {
  if (ordersStore.mode === 'create') {
    await ordersStore.create();
  } else {
    await ordersStore.update();
  }
};

const closeHandler = () => {
  ordersStore.addOrderModalView = false;
  ordersStore.clearForm();
};

const checkMasterInfo = () => {
  ordersStore.form.masterId = null;
  ordersStore.getMasterList();
};

onMounted(() => {
  if (!ordersStore.form.masterId) {
    return;
  }
  ordersStore.getTimeSlots();
});
</script>
