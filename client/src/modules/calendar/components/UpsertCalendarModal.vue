<template>
  <v-navigation-drawer
    temporary
    class="pa-4"
    location="right"
    width="500"
    :title="getTitle"
    :model-value="calendarStore.addAbsenceModalView"
    @update:model-value="closeHandler"
  >
    <template #default>
      <h1>
        {{ getTitle }}
      </h1>
      <v-select
        class="mt-4"
        label="Сотрудник"
        :items="calendarStore.employees"
        item-title="name"
        item-value="id"
        density="comfortable"
        :model-value="calendarStore.form.employeeId"
        @update:modelValue="calendarStore.form.employeeId = $event"
      />
      <v-date-input
        label="Дата начала"
        prepend-icon=""
        variant="outlined"
        persistent-placeholder
        :model-value="calendarStore.form.dateFrom"
        @update:modelValue="calendarStore.form.dateFrom = $event"
      />
      <v-date-input
        label="Дата окончания"
        prepend-icon=""
        variant="outlined"
        persistent-placeholder
        :model-value="calendarStore.form.dateTo"
        @update:modelValue="calendarStore.form.dateTo = $event"
      />
      <v-text-field
        label="Причина"
        density="comfortable"
        :model-value="calendarStore.form.reason"
        @input="calendarStore.form.reason = $event.target.value"
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
        :loading="calendarStore.loadingFlags.upsert"
        @click="saveAbsenceHandler"
      >
        Сохранить
      </v-btn>
      <v-btn
        color="blue-darken-4"
        variant="flat"
        :loading="calendarStore.loadingFlags.upsert"
        @click="calendarStore.delete()"
      >
        Удалить
      </v-btn>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useCalendarStore } from '@/store/calendarStore';

const calendarStore = useCalendarStore();

onMounted(() => {
  calendarStore.getEmployeesList();
});

const getTitle = computed(() => (calendarStore.mode === 'create'
  ? 'Добавление нового отсутствия'
  : 'Обновление отсутствия'
));

const closeHandler = () => {
  calendarStore.addAbsenceModalView = false;
  calendarStore.clearForm();
};

const saveAbsenceHandler = async () => {
  if (calendarStore.mode === 'create') {
    await calendarStore.create();
  } else {
    await calendarStore.update();
  }
  closeHandler();
};
</script>
