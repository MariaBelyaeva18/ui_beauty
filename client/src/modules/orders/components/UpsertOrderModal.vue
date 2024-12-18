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

      <v-date-input
        label="Дата заказа"
        prepend-icon=""
        variant="outlined"
        persistent-placeholder
        :model-value="ordersStore.form.executionDate"
        @update:modelValue="ordersStore.form.executionDate = $event; checkMasterInfo()"
      />
      <v-select
        class="mt-4"
        label="Услуга"
        :items="ordersStore.services"
        item-title="name"
        item-value="id"
        density="comfortable"
        :model-value="ordersStore.form.serviceId"
        @update:modelValue="ordersStore.form.serviceId = $event; checkMasterInfo()"
      />
      <v-select
        class="mt-4"
        label="Мастер"
        :items="ordersStore.masters"
        item-title="name"
        item-value="id"
        :disabled="!ordersStore.form.executionDate || !ordersStore.form.serviceId"
        density="comfortable"
        :model-value="ordersStore.form.masterId"
        @update:modelValue="ordersStore.form.masterId = $event"
      />
      <v-text-field
        label="Комментарий"
        density="comfortable"
        :model-value="ordersStore.form.description"
        @input="ordersStore.form.description = $event.target.value"
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
        :loading="ordersStore.loadingFlags.upsert"
        @click="saveMaterialHandler"
      >
        Сохранить
      </v-btn>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { computed } from 'vue';
import { useOrdersStore } from '@/store/ordersStore';

const ordersStore = useOrdersStore();

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
  ordersStore.addOrderModalView = false;
};

const closeHandler = () => {
  ordersStore.addOrderModalView = false;
  ordersStore.clearForm();
};

const checkMasterInfo = () => {
  ordersStore.form.masterId = null;
  ordersStore.getMasterList();
};
</script>
