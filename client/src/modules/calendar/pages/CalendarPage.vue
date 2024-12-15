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
        <h2>{{ monthNames[currentMonth] }} {{ currentYear }}</h2>
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
            <td>{{ absence.name }}</td>
            <!-- Даты с проверкой на отсутствие -->
            <td
              v-for="day in daysInMonth"
              :key="day"
              :class="{ 'absent': isAbsent(absence, currentYear, currentMonth, day) }"
              :title="getAbsenceReason(absence, currentYear, currentMonth, day)"
            />
          </tr>
        </tbody>
      </table>
    </div>
    <UpsertCalendarModal />
  </section>
</template>

<script>
import { useCalendarStore } from '@/store/calendarStore';
import UpsertCalendarModal from '@/modules/calendar/components/UpsertCalendarModal.vue';

export default {
  components: { UpsertCalendarModal },
  data() {
    return {
      calendarStore: useCalendarStore(),
      currentMonth: new Date().getMonth(), // Текущий месяц (0 - январь)
      currentYear: new Date().getFullYear(), // Текущий год
      monthNames: [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
      ],
    };
  },
  computed: {
    // Получение количества дней в текущем месяце
    daysInMonth() {
      const totalDays = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
      return Array.from({ length: totalDays }, (_, i) => i + 1);
    },
  },
  mounted() {
    this.calendarStore.getAbsence();
  },
  methods: {
    // Форматирование дня в двузначный вид
    formatDay(day) {
      return day.toString().padStart(2, '0');
    },
    // Проверка на попадание дня в диапазон отсутствия
    isAbsent(absence, year, month, day) {
      const currentDate = new Date(year, month, day); // Текущая дата в календаре

      const fromDate = new Date(absence.dateFrom);
      const toDate = new Date(absence.dateTo);

      return currentDate >= fromDate && currentDate <= toDate;
    },
    // Получение причины отсутствия для конкретного дня
    getAbsenceReason(absence, year, month, day) {
      const currentDate = new Date(year, month, day); // Текущая дата в календаре

      const fromDate = new Date(absence.dateFrom);
      const toDate = new Date(absence.dateTo);

      return currentDate >= fromDate && currentDate <= toDate ? absence.reason : '';
    },
    // Смена месяца вперед или назад
    changeMonth(direction) {
      this.currentMonth += direction;

      if (this.currentMonth < 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else if (this.currentMonth > 11) {
        this.currentMonth = 0;
        this.currentYear++;
      }
    },
  },
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
