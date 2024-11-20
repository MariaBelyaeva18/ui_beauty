<template>
  <section class="register">
    <div class="register_title">
      Регистрация
    </div>
    <div class="register_form">
      <v-text-field
        label="Фамилия"
        density="comfortable"
        :model-value="register.form.last_name"
        @input="register.form.last_name = $event.target.value"
      />
      <v-text-field
        label="Имя"
        :rules="rules"
        density="comfortable"
        :model-value="register.form.name"
        @input="register.form.name = $event.target.value"
      />
      <v-text-field
        label="Отчество"
        density="comfortable"
        :model-value="register.form.middle_name"
        @input="register.form.middle_name = $event.target.value"
      />
      <v-text-field
        label="Номер телефона"
        density="comfortable"
        :model-value="register.form.phone"
        @input="register.form.phone = $event.target.value"
      />
      <v-select
        label="Роль"
        :items="main.roles"
        item-title="role"
        item-value="id"
        :rules="rules"
        density="comfortable"
        :model-value="register.form.role"
        @update:modelValue="register.form.role = $event"
      />
      <v-text-field
        label="Логин"
        :rules="rules"
        density="comfortable"
        :model-value="register.form.username"
        @input="register.form.username = $event.target.value"
      />
      <div class="d-flex ga-2">
        <v-text-field
          label="Пароль"
          :rules="rules"
          density="comfortable"
          :model-value="register.form.password"
          @input="register.form.password = $event.target.value"
        />
        <v-text-field
          label="Повторите пароль"
          :rules="rules"
          density="comfortable"
          :model-value="register.form.repeatPassword"
          @input="register.form.repeatPassword = $event.target.value"
        />
      </div>
      <div>
        <v-btn
          type="submit"
          class="mt-2"
          @click="register.createUser(register.form)"
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

<script>
import { registerStore } from '@/store/register';
import { store } from '@/store';

export default {
  name: 'RegisterPage',
  data() {
    return {
      register: registerStore(),
      main: store(),
      rules: [(value) => !!value || 'Это обязательное поле.'],
    };
  },
  mounted() {
    this.main.getList();
  },
  methods: {
    reset() {
      this.register.form = {
        name: null,
        middle_name: null,
        last_name: null,
        username: null,
        password: null,
        repeatPassword: null,
        phone: null,
        role: null,
      };
    },
  },
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
