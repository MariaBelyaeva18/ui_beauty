<template>
  <section>
    <div class="d-flex justify-space-between">
      <h1>
        График отсутствий
      </h1>
      <v-btn
        color="blue-darken-4"
        variant="flat"
        @click="calendarStore.addAbsenceModalView = true; calendarStore.mode = 'create'"
      >
        Добавить новое отсутствие
      </v-btn>
    </div>
    <div class="mt-6">
      <!-- Шапка с кнопками переключения месяца -->
      <div class="month-selector">
        <button @click="changeMonth(-1)">
          ←
        </button>
        <h2>{{ monthNames[calendarStore.currentMonth] }} {{ calendarStore.currentYear }}</h2>
        <button @click="changeMonth(1)">
          →
        </button>
      </div>

      <!-- Календарь -->
      <table class="absence-calendar">
        <!-- Заголовок таблицы с датами -->
        <thead>
          <tr>
            <th>Сотрудник</th>
            <th
              v-for="day in daysInMonth"
              :key="day"
            >
              {{ formatDay(day) }}
            </th>
          </tr>
        </thead>

        <!-- Тело таблицы с отсутствиями -->
        <tbody>
          <tr
            v-for="absence in calendarStore.absences"
            :key="absence.id"
          >
            <!-- Имя сотрудника -->
            <td>{{ absence.employee.name }}</td>
            <!-- Даты с проверкой на отсутствие -->
            <td
              v-for="day in daysInMonth"
              :key="day"
              :class="{ 'absent': isAbsent(absence, day) }"
              :title="getAbsenceReason(absence, day)"
              @click="isAbsent(absence, day) && updateHandler(absence)"
            />
          </tr>
        </tbody>
      </table>
    </div>
    <UpsertCalendarModal />
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useCalendarStore } from '@/store/calendarStore';
import UpsertCalendarModal from '@/modules/calendar/components/UpsertCalendarModal.vue';

const calendarStore = useCalendarStore();

onMounted(() => {
  calendarStore.currentYear = new Date().getFullYear();
  calendarStore.currentMonth = new Date().getMonth();

  calendarStore.getAbsence();
});

const monthNames = ref([
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
]);

const daysInMonth = computed(() => {
  const totalDays = new Date(
    calendarStore.currentYear,
    calendarStore.currentMonth + 1,
    0,
  ).getDate();
  return Array.from({ length: totalDays }, (_, i) => i + 1);
});

// Форматирование дня в двузначный вид
const formatDay = (day) => day.toString().padStart(2, '0');

// Проверка на попадание дня в диапазон отсутствия
const isAbsent = (absence, day) => {
  const currentDate = new Date(
    calendarStore.currentYear,
    calendarStore.currentMonth,
    day,
  ); // Текущая дата в календаре

  const fromDate = new Date(absence.dateFrom);
  const toDate = new Date(absence.dateTo);

  return currentDate >= fromDate && currentDate <= toDate;
};

// Получение причины отсутствия для конкретного дня
const getAbsenceReason = (absence, day) => {
  const currentDate = new Date(
    calendarStore.currentYear,
    calendarStore.currentMonth,
    day,
  ); // Текущая дата в календаре

  const fromDate = new Date(absence.dateFrom);
  const toDate = new Date(absence.dateTo);

  return currentDate >= fromDate && currentDate <= toDate ? absence.reason : '';
};

// Смена месяца вперед или назад
const changeMonth = (direction) => {
  calendarStore.currentMonth += direction;

  if (calendarStore.currentMonth < 0) {
    calendarStore.currentMonth = 11;
    calendarStore.currentYear -= 1;
  } else if (calendarStore.currentMonth > 11) {
    calendarStore.currentMonth = 0;
    calendarStore.currentYear += 1;
  }
  calendarStore.getAbsence();
};

const updateHandler = (absence) => {
  calendarStore.form = {
    id: absence.id,
    employeeId: absence.employee.id,
    dateFrom: new Date(absence.dateFrom),
    dateTo: new Date(absence.dateTo),
    reason: absence.reason,
  };

  calendarStore.mode = 'edit';
  calendarStore.addAbsenceModalView = true;
};
</script>

<style scoped>
.month-selector {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.absence-calendar {
  width: 100%;
  border-collapse: collapse;
}

.absence-calendar th,
.absence-calendar td {
  border: 1px solid #ccc;
  text-align: center;
  padding: 5px;
}

.absence-calendar th {
  background-color: #f0f0f0;
}

.absent {
  background-color: #f8d7da; /* Светло-красный цвет */
}

button {
  padding: 5px 10px;
  cursor: pointer;
}
</style>
