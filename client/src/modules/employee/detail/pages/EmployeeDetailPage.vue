<template>
  <section class="employee-page pa-16 ma-16">
    <v-btn
      v-if="employeeStore.detail.mode === 'watch'"
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
      size="large"
      color="blue-darken-4"
      :loading="saving"
      @click="router.push('/employee')"
    >
      Отменить
    </v-btn>

    <v-btn
      v-if="employeeStore.detail.mode !== 'watch'"
      size="large"
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
import { useMainStore } from '@/store/mainStore';

const employeeStore = useEmployeeStore();
const mainStore = useMainStore();

const saving = ref(false);

onMounted(() => {
  employeeStore.getRolesList();
  employeeStore.getServicesList();

  const { employeeId } = router.currentRoute.value.params;
  const { mode } = router.currentRoute.value.query;

  if (employeeId === 'new') {
    employeeStore.detail.mode = 'create';
  } else {
    employeeStore.detail.mode = mode === 'edit' ? 'edit' : 'watch';
    employeeStore.getDetailInfo(employeeId);
  }
});

onUnmounted(() => {
  employeeStore.clearForm();
});

const saveHandler = async () => {
  saving.value = true;

  if (employeeStore.detail.mode === 'edit') {
    if (mainStore.form.id === employeeStore.detail.form.id) {
      await mainStore.updateUserInfo(employeeStore.detail.form);
    }
    await employeeStore.update();
  } else {
    await employeeStore.create();
  }

  saving.value = false;
};
</script>

<style lang="sass" scoped>
.employee-page
  padding: 20px 40px
</style>
