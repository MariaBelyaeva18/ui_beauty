<template>
  <v-navigation-drawer
    temporary
    class="pa-4"
    location="right"
    width="500"
    :title="getTitle"
    :model-value="employeeStore.addEmployeeModalView"
    @update:model-value="closeHandler"
  >
    <template #default>
      <h1>
        {{ getTitle }}
      </h1>
      <v-text-field
        class="mt-4"
        label="Имя"
        density="comfortable"
        :model-value="employeeStore.form.name"
        @input="employeeStore.form.name = $event.target.value"
      />
      <v-text-field
        class="mt-4"
        label="Отчество"
        density="comfortable"
        :model-value="employeeStore.form.middleName"
        @input="employeeStore.form.middleName = $event.target.value"
      />
      <v-text-field
        class="mt-4"
        label="Фамилия"
        density="comfortable"
        :model-value="employeeStore.form.lastName"
        @input="employeeStore.form.lastName = $event.target.value"
      />
      <v-text-field
        class="mt-4"
        label="Фамилия"
        density="comfortable"
        :model-value="employeeStore.form.phone"
        @input="employeeStore.form.phone = $event.target.value"
      />

      <v-select
        class="mt-4"
        label="Роль"
        :items="mainStore.roles"
        item-title="role"
        item-value="id"
        density="comfortable"
        :model-value="employeeStore.form.roleId"
        @update:modelValue="employeeStore.form.roleId = $event"
      />

      <v-combobox
        class="mt-4"
        multiple
        label="Услуги"
        :model-value="employeeStore.form.masterServiceIds"
        item-title="name"
        item-value="id"
        :return-object="false"
        :items="employeeStore.services"
        @update:modelValue="employeeStore.form.masterServiceIds = $event"
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
        :loading="employeeStore.loadingFlags.upsert"
        @click="saveMaterialHandler"
      >
        Сохранить
      </v-btn>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { computed } from 'vue';
import { useEmployeeStore } from '@/store/employeeStore';
import { useMainStore } from '@/store/mainStore';

const employeeStore = useEmployeeStore();
const mainStore = useMainStore();

const getTitle = computed(() => (employeeStore.mode === 'create'
  ? 'Добавление нового сотрудника'
  : 'Обновление сотрудника'
));

const saveMaterialHandler = async () => {
  if (employeeStore.mode === 'create') {
    await employeeStore.create();
  } else {
    await employeeStore.update();
  }
  employeeStore.addEmployeeModalView = false;
};

const closeHandler = () => {
  employeeStore.addEmployeeModalView = false;
  employeeStore.clearForm();
};
</script>
