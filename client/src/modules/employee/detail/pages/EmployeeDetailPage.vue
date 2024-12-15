<template>
  <section class="employee-page">
    <v-btn
      v-if="employeeStore.detail.mode !== 'create'"
      class="d-block ml-auto"
      icon="mdi-wrench"
      size="x-large"
      :disabled="employeeStore.detail.mode === 'edit'"
      title="Редактировать"
      @click="employeeStore.detail.mode = 'edit'"
    />

    <EmployeeCard class="mt-4" />

    <v-btn
      v-if="employeeStore.detail.mode !== 'watch'"
      class="mr-2"
      size="x-large"
      color="blue-darken-4"
      :loading="saving"
      @click="employeeStore.detail.mode = 'watch'"
    >
      Отменить
    </v-btn>

    <v-btn
      v-if="employeeStore.detail.mode !== 'watch'"
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

import { onMounted, onUnmounted, ref } from 'vue';
import EmployeeCard from '@/modules/employee/detail/components/EmployeeCard.vue';
import { useEmployeeStore } from '@/store/employeeStore';
import router from '@/router';

const employeeStore = useEmployeeStore();

const saving = ref(false);

onMounted(() => {
  employeeStore.getRolesList();
  employeeStore.getServicesList();

  const { employeeId } = router.currentRoute.value.params;

  if (employeeId === 'new') {
    employeeStore.detail.mode = 'create';
  } else {
    employeeStore.detail.mode = 'watch';
    employeeStore.getDetailInfo(employeeId);
  }
});

onUnmounted(() => {
  employeeStore.clearForm();
});

const saveHandler = async () => {
  saving.value = true;

  if (employeeStore.detail.mode === 'edit') {
    await employeeStore.update();
  } else {
    await employeeStore.create();
  }

  saving.value = false;

  await router.push('/employee');
};
</script>

<style lang="sass" scoped>
.employee-page
  padding: 20px 40px
</style>
