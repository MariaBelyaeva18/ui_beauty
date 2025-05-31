<template>
  <section class="profile">
    <div class="profile__main-info mr-16">
      <v-row>
        <v-col cols="4">
          <v-text-field
            label="Фамилия"
            density="comfortable"
            :loading="employeeStore.detail.loadingFlags.getDetail"
            :readonly="employeeStore.detail.mode === 'watch'"
            :model-value="employeeStore.detail.form.lastName"
            :error="!employeeStore.detail.formValid.lastName"
            :error-messages="langs[employeeStore.detail.formErrors.lastName]"
            @input="employeeStore.detail.form.lastName = $event.target.value"
          />
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="Имя"
            density="comfortable"
            :loading="employeeStore.detail.loadingFlags.getDetail"
            :readonly="employeeStore.detail.mode === 'watch'"
            :model-value="employeeStore.detail.form.name"
            :error="!employeeStore.detail.formValid.name"
            :error-messages="langs[employeeStore.detail.formErrors.name]"
            @input="employeeStore.detail.form.name = $event.target.value"
          />
        </v-col>
        <v-col cols="4">
          <v-text-field
            label="Отчество"
            density="comfortable"
            :loading="employeeStore.detail.loadingFlags.getDetail"
            :readonly="employeeStore.detail.mode === 'watch'"
            :model-value="employeeStore.detail.form.middleName"
            :error="!employeeStore.detail.formValid.middleName"
            :error-messages="langs[employeeStore.detail.formErrors.middleName]"
            @input="employeeStore.detail.form.middleName = $event.target.value"
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-text-field
            label="Телефон (без +7)"
            density="comfortable"
            :loading="employeeStore.detail.loadingFlags.getDetail"
            :readonly="employeeStore.detail.mode === 'watch'"
            :model-value="employeeStore.detail.form.phone"
            :error="!employeeStore.detail.formValid.phone"
            :error-messages="langs[employeeStore.detail.formErrors.phone]"
            @input="employeeStore.detail.form.phone = $event.target.value"
            @keypress="onlyNumbers"
          />
        </v-col>

        <v-col cols="4">
          <v-select
            label="Роль"
            :readonly="employeeStore.detail.mode === 'watch'"
            :items="employeeStore.detail.roles.filter((el) => el.role !== 'Клиент')"
            item-title="role"
            item-value="id"
            density="comfortable"
            :loading="employeeStore.detail.loadingFlags.getDetail"
            :model-value="employeeStore.detail.form.roleId"
            :error="!employeeStore.detail.formValid.roleId"
            :error-messages="langs[employeeStore.detail.formErrors.roleId]"
            @update:modelValue="employeeStore.detail.form.roleId = $event"
          />
        </v-col>
        <v-col cols="4">
          <v-combobox
            multiple
            label="Услуги"
            :loading="employeeStore.detail.loadingFlags.getDetail"
            :readonly="employeeStore.detail.mode === 'watch'"
            :model-value="employeeStore.detail.form.masterServiceIds"
            :error="!employeeStore.detail.formValid.masterServiceIds"
            :error-messages="langs[employeeStore.detail.formErrors.masterServiceIds]"
            item-title="name"
            item-value="id"
            density="comfortable"
            :return-object="false"
            :items="employeeStore.detail.services"
            @update:modelValue="employeeStore.detail.form.masterServiceIds = $event"
          />
        </v-col>
      </v-row>

      <div
        class="d-flex justify-end text-blue cursor-pointer"
        @click="generate()"
      >
        Сгенерировать пароль
      </div>
      <v-row>
        <v-col cols="6">
          <v-text-field
            label="Логин"
            density="comfortable"
            :loading="employeeStore.detail.loadingFlags.getDetail"
            :readonly="employeeStore.detail.mode === 'watch'"
            :model-value="employeeStore.detail.form.username"
            :error="!employeeStore.detail.formValid.username"
            :error-messages="langs[employeeStore.detail.formErrors.username]"
            @input="employeeStore.detail.form.username = $event.target.value"
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            label="Пароль"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            density="comfortable"
            :loading="employeeStore.detail.loadingFlags.getDetail"
            :readonly="employeeStore.detail.mode === 'watch'"
            :model-value="employeeStore.detail.form.password"
            :error="!employeeStore.detail.formValid.password"
            :error-messages="langs[employeeStore.detail.formErrors.password]"
            @input="employeeStore.detail.form.password = $event.target.value;"
            @click:append="showPassword = !showPassword"
          />
        </v-col>
      </v-row>
    </div>

    <div
      class="profile__additional-info"
    >
      <v-img
        class="avatar"
        :src="getAvatarUrl(employeeStore.detail.form.avatarFile) || getAvatarSrc"
        cover
        @click="$refs.fileInput.click();"
      >
        <template #placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular
              color="grey-lighten-4"
              indeterminate
            />
          </div>
        </template>
        <template #error>
          <v-img
            src="https://ps.w.org/wpmake-advance-user-avatar/assets/icon.svg?rev=3184986"
          />
        </template>
      </v-img>

      <input
        ref="fileInput"
        type="file"
        class="d-none"
        @change="updateAvatarHandler"
      >
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useEmployeeStore } from '@/store/employeeStore';
import langs from '@/utils/langs';
import generatePassword from '@/utils/generatePassword';
import { useMainStore } from '@/store/mainStore';

const showPassword = ref(false);

const employeeStore = useEmployeeStore();
const mainStore = useMainStore();

const updateAvatarHandler = (event) => {
  const file = event.target.files[0];
  if (employeeStore.detail.mode !== 'create') {
    employeeStore.updateAvatar(file);
    if (mainStore.form.id === employeeStore.detail.form.id) {
      mainStore.updateAvatar(file);
    }
  } else {
    employeeStore.detail.form.avatarFile = file;
  }
};

const getAvatarSrc = computed(() => `${import.meta.env.VITE_API_URL}/${employeeStore.detail.avatarPath}`);
const getAvatarUrl = (file) => {
  if (file) return URL.createObjectURL(file);
  return null;
};

const generate = () => {
  employeeStore.detail.form.password = generatePassword();
};

const onlyNumbers = (val) => {
  const keyCode = val.keyCode || val.which;
  const keyValue = String.fromCharCode(keyCode);
  const isValid = /^\d+$/.test(keyValue); // Разрешаем только цифры

  if (!isValid) {
    val.preventDefault();
    return false;
  }
  if (employeeStore.detail.form.phone.length === 10) {
    val.preventDefault();
    return false;
  }

  return true;
};
</script>

<style lang="sass" scoped>
.profile
  display: flex
  gap: 40px
  &__main-info
    flex: 1 1 auto
  &__additional-info
    .avatar
      width: 200px
      height: 200px
      border-radius: 50%
    &:hover
      filter: blur(8px)
      cursor: pointer
</style>
