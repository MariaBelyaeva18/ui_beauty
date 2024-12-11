<template>
  <section class="register">
    <div class="register_title">
      Регистрация
    </div>
    <div class="register_form">
      <v-text-field
        label="Фамилия"
        density="comfortable"
        :model-value="registerStore.form.last_name"
        @input="registerStore.form.last_name = $event.target.value"
      />
      <v-text-field
        label="Имя"
        :rules="rules"
        density="comfortable"
        :model-value="registerStore.form.name"
        @input="registerStore.form.name = $event.target.value"
      />
      <v-text-field
        label="Отчество"
        density="comfortable"
        :model-value="registerStore.form.middle_name"
        @input="registerStore.form.middle_name = $event.target.value"
      />
      <v-text-field
        label="Номер телефона"
        density="comfortable"
        :model-value="registerStore.form.phone"
        @input="registerStore.form.phone = $event.target.value"
      />
      <v-select
        label="Роль"
        :items="mainStore.roles"
        item-title="role"
        item-value="id"
        :rules="rules"
        density="comfortable"
        :model-value="registerStore.form.role"
        @update:modelValue="registerStore.form.role = $event"
      />
      <v-text-field
        label="Логин"
        :rules="rules"
        density="comfortable"
        :model-value="registerStore.form.username"
        @input="registerStore.form.username = $event.target.value"
      />
      <div class="d-flex ga-2">
        <v-text-field
          label="Пароль"
          :rules="rules"
          density="comfortable"
          :model-value="registerStore.form.password"
          @input="registerStore.form.password = $event.target.value"
        />
        <v-text-field
          label="Повторите пароль"
          :rules="rules"
          density="comfortable"
          :model-value="registerStore.form.repeatPassword"
          @input="registerStore.form.repeatPassword = $event.target.value"
        />
      </div>
      <div>
        <v-btn
          type="submit"
          class="mt-2"
          @click="registerStore.createUser(registerStore.form)"
        >
          Сохранить
        </v-btn>
        <v-btn
          type="submit"
          style="margin-left: 10px"
          class="mt-2"
          @click.stop="reset()"
        >
          Очистить
        </v-btn>
        <v-btn
          type="submit"
          style="margin-left: 10px"
          class="mt-2"
          @click.stop="$router.push('/auth')"
        >
          Отмена
        </v-btn>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useMainStore } from '@/store/mainStore';
import { useRegisterStore } from '@/store/registerStore';

const mainStore = useMainStore();
const registerStore = useRegisterStore();

const rules = ref([(value) => !!value || 'Это обязательное поле.']);

const reset = () => {
  registerStore.form = {
    name: null,
    middle_name: null,
    last_name: null,
    username: null,
    password: null,
    repeatPassword: null,
    phone: null,
    role: null,
  };
};
</script>

<style lang="sass" scoped>
.register
  width: 100%
  display: flex
  flex-direction: column
  margin-top: 12vh
  align-items: center
  &_title
    width: 460px
    font-size: 28px
    margin-bottom: 30px
  &_form
    width: 460px
</style>
