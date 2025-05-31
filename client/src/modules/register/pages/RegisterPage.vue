<template>
  <section class="register">
    <div class="register_title">
      Регистрация
    </div>
    <div class="register_form">
      <v-text-field
        label="Фамилия"
        density="comfortable"
        :error="!registerStore.formValid.last_name"
        :error-messages="langs[registerStore.formErrors.last_name]"
        :model-value="registerStore.form.last_name"
        @input="registerStore.form.last_name = $event.target.value"
      />
      <v-text-field
        label="Имя"
        :error="!registerStore.formValid.name"
        :error-messages="langs[registerStore.formErrors.name]"
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
        label="Телефон (без +7)"
        density="comfortable"
        :error="!registerStore.formValid.phone"
        :error-messages="langs[registerStore.formErrors.phone]"
        :model-value="registerStore.form.phone"
        @input="registerStore.form.phone = $event.target.value"
        @keypress="onlyNumbers"
      />
      <v-select
        label="Роль"
        :items="mainStore.roles.filter((el) => el.role === 'Клиент')"
        item-title="role"
        item-value="id"
        :error="!registerStore.formValid.role"
        :error-messages="langs[registerStore.formErrors.role]"
        density="comfortable"
        :model-value="registerStore.form.role"
        @update:modelValue="registerStore.form.role = $event"
      />
      <v-text-field
        label="Логин"
        :error="!registerStore.formValid.username"
        :error-messages="langs[registerStore.formErrors.username]"
        density="comfortable"
        :model-value="registerStore.form.username"
        @input="registerStore.form.username = $event.target.value"
      />

      <div
        class="d-flex justify-end text-blue cursor-pointer"
        @click="generate()"
      >
        Сгенерировать пароль
      </div>
      <v-text-field
        label="Пароль"
        :error="!registerStore.formValid.password"
        :error-messages="langs[registerStore.formErrors.password]"
        :append-icon="pass1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="pass1 ? 'text' : 'password'"
        density="comfortable"
        :model-value="registerStore.form.password"
        @input="registerStore.form.password = $event.target.value"
        @click:append="pass1 = !pass1"
      />
      <v-text-field
        label="Повторите пароль"
        :error="!registerStore.formValid.repeatPassword"
        :error-messages="langs[registerStore.formErrors.repeatPassword]"
        :append-icon="pass2 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="pass2 ? 'text' : 'password'"
        density="comfortable"
        :model-value="registerStore.form.repeatPassword"
        @input="registerStore.form.repeatPassword = $event.target.value"
        @click:append="pass2 = !pass2"
      />
      <div
        v-if="registerStore.passError"
        class="text-red"
      >
        Пароли не совпадают
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
          @click.stop="registerStore.reset()"
        >
          Очистить
        </v-btn>
        <v-btn
          type="submit"
          style="margin-left: 10px"
          class="mt-2"
          @click.stop="registerStore.reset(); $router.push('/auth')"
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
import generatePassword from '@/utils/generatePassword';
import langs from '@/utils/langs';

const mainStore = useMainStore();
const registerStore = useRegisterStore();

const pass1 = ref(false);
const pass2 = ref(false);

const generate = () => {
  const pass = generatePassword();
  registerStore.form.password = pass;
  registerStore.form.repeatPassword = pass;
};

const onlyNumbers = (val) => {
  const keyCode = val.keyCode || val.which;
  const keyValue = String.fromCharCode(keyCode);
  const isValid = /^\d+$/.test(keyValue); // Разрешаем только цифры

  if (!isValid) {
    val.preventDefault();
    return false;
  }
  if (registerStore.form.phone?.length === 10) {
    val.preventDefault();
    return false;
  }

  return true;
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
