<template>
  <section class="employee-page">
    <v-btn
      class="d-block ml-auto"
      icon="mdi-wrench"
      size="x-large"
      :disabled="mainStore.isEdit"
      title="Редактировать"
      @click="mainStore.isEdit = true"
    />

    <EmployeeCard class="mt-4" />

    <v-btn
      v-if="mainStore.isEdit"
      size="x-large"
      color="blue-darken-4"
      :loading="saving"
      @click="saveHandler"
    >
      Сохранить
    </v-btn>
  </section>
</template>

<script setup>

import { ref } from 'vue';
import EmployeeCard from '@/modules/employee/detail/components/EmployeeCard.vue';
import { useEmployeeStore } from '@/store/employeeStore';

const employeeStore = useEmployeeStore();

const saving = ref(false);

const saveHandler = async () => {
  saving.value = true;
  await mainStore.updateUserInfo();
  saving.value = false;
  mainStore.isEdit = false;
};
</script>

<style lang="sass" scoped>
.employee-page
  padding: 20px 40px
</style>
