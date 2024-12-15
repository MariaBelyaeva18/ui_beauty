<template>
  <section class="profile">
    <div class="profile__main-info">
      <v-text-field
        label="Фамилия"
        density="comfortable"
        :loading="employeeStore.detail.loadingFlags.getDetail"
        :readonly="employeeStore.detail.mode === 'watch'"
        :model-value="employeeStore.detail.form.lastName"
        @input="employeeStore.detail.form.lastName = $event.target.value"
      />
      <v-row>
        <v-col cols="6">
          <v-text-field
            label="Имя"
            density="comfortable"
            :loading="employeeStore.detail.loadingFlags.getDetail"
            :readonly="employeeStore.detail.mode === 'watch'"
            :model-value="employeeStore.detail.form.name"
            @input="employeeStore.detail.form.name = $event.target.value"
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            label="Отчество"
            density="comfortable"
            :loading="employeeStore.detail.loadingFlags.getDetail"
            :readonly="employeeStore.detail.mode === 'watch'"
            :model-value="employeeStore.detail.form.middleName"
            @input="employeeStore.detail.form.middleName = $event.target.value"
          />
        </v-col>
      </v-row>

      <v-text-field
        label="Телефон"
        density="comfortable"
        :loading="employeeStore.detail.loadingFlags.getDetail"
        :readonly="employeeStore.detail.mode === 'watch'"
        :model-value="employeeStore.detail.form.phone"
        @input="employeeStore.detail.form.phone = $event.target.value"
      />

      <v-row>
        <v-col cols="6">
          <v-text-field
            label="Логин"
            density="comfortable"
            :loading="employeeStore.detail.loadingFlags.getDetail"
            :readonly="employeeStore.detail.mode === 'watch'"
            :model-value="employeeStore.detail.form.username"
            @input="employeeStore.detail.form.username = $event.target.value"
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            label="Пароль"
            density="comfortable"
            :loading="employeeStore.detail.loadingFlags.getDetail"
            :readonly="employeeStore.detail.mode === 'watch'"
            :model-value="employeeStore.detail.form.password"
            @input="employeeStore.detail.form.password = $event.target.value;"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-select
            class="mt-4"
            label="Роль"
            :readonly="employeeStore.detail.mode === 'watch'"
            :items="employeeStore.detail.roles"
            item-title="role"
            item-value="id"
            density="comfortable"
            :loading="employeeStore.detail.loadingFlags.getDetail"
            :model-value="employeeStore.detail.form.roleId"
            @update:modelValue="employeeStore.detail.form.roleId = $event"
          />
        </v-col>
        <v-col cols="6">
          <v-combobox
            class="mt-4"
            multiple
            label="Услуги"
            :loading="employeeStore.detail.loadingFlags.getDetail"
            :readonly="employeeStore.detail.mode === 'watch'"
            :model-value="employeeStore.detail.form.masterServiceIds"
            item-title="name"
            item-value="id"
            density="comfortable"
            :return-object="false"
            :items="employeeStore.detail.services"
            @update:modelValue="employeeStore.detail.form.masterServiceIds = $event"
          />
        </v-col>
      </v-row>
      <v-file-input
        v-if="employeeStore.detail.mode === 'create'"
        label="Файл аватарки"
        :loading="employeeStore.detail.loadingFlags.getDetail"
        :model-value="employeeStore.detail.form.avatarFile"
        prepend-icon="mdi-camera"
        variant="filled"
        @update:modelValue="employeeStore.detail.form.avatarFile = $event;"
      />
    </div>

    <div
      v-if="employeeStore.detail.mode !=='create'"
      class="profile__additional-info"
    >
      <v-img
        class="avatar"
        :src="getAvatarSrc"
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

import { computed } from 'vue';
import { useEmployeeStore } from '@/store/employeeStore';

const employeeStore = useEmployeeStore();

const updateAvatarHandler = (event) => {
  const file = event.target.files[0];
  employeeStore.updateAvatar(file);
};

const getAvatarSrc = computed(() => `${import.meta.env.VITE_API_URL}/${employeeStore.detail.avatarPath}`);

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
