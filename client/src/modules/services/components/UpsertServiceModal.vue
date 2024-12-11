<template>
  <v-navigation-drawer
    temporary
    class="pa-4"
    location="right"
    width="500"
    :title="getTitle"
    :model-value="servicesStore.addMaterialModalView"
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
        @input="servicesStore.form.name = $event.target.value"
      />
      <v-text-field
        class="mt-4"
        label="Описание"
        density="comfortable"
        :model-value="servicesStore.form.description"
        @input="servicesStore.form.description = $event.target.value"
      />
      <v-text-field
        class="mt-4"
        label="Стоимость"
        density="comfortable"
        :model-value="servicesStore.form.cost"
        @input="servicesStore.form.cost = $event.target.value"
      />

      <v-text-field
        :model-value="servicesStore.form.duration"
        :active="menu2"
        :focus="menu2"
        label="Picker in menu"
        prepend-icon="mdi-clock-time-four-outline"
        readonly
        @update:modelValue="servicesStore.form.duration = $event"
      >
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          activator="parent"
          transition="scale-transition"
        >
          <v-time-picker
            v-if="menu2"
            :model-value="servicesStore.form.duration"
            full-width
            format="24hr"
            @update:modelValue="servicesStore.form.duration = $event"
          />
        </v-menu>
      </v-text-field>
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

const servicesStore = useServicesStore();

const getTitle = computed(() => (servicesStore.mode === 'create'
  ? 'Добавление новой услуги'
  : 'Обновление услуги'
));

const menu2 = ref(false);

const saveMaterialHandler = async () => {
  if (servicesStore.mode === 'create') {
    await servicesStore.create();
  } else {
    await servicesStore.update();
  }
  servicesStore.addMaterialModalView = false;
};

const closeHandler = () => {
  servicesStore.addMaterialModalView = false;
  servicesStore.clearForm();
};
</script>
