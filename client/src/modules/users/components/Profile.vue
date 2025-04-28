<template>
  <section class="profile">
    <div class="profile__main-info">
      <v-text-field
        label="Фамилия"
        density="comfortable"
        :readonly="!mainStore.isEdit"
        :model-value="mainStore.form.last_name"
        @input="mainStore.form.last_name = $event.target.value"
      />
      <v-row>
        <v-col cols="6">
          <v-text-field
            label="Имя"
            density="comfortable"
            :readonly="!mainStore.isEdit"
            :model-value="mainStore.form.name"
            @input="mainStore.form.name = $event.target.value"
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            label="Отчество"
            density="comfortable"
            :readonly="!mainStore.isEdit"
            :model-value="mainStore.form.middle_name"
            @input="mainStore.form.middle_name = $event.target.value"
          />
        </v-col>
      </v-row>

      <v-text-field
        label="Телефон"
        density="comfortable"
        :readonly="!mainStore.isEdit"
        :model-value="mainStore.form.phone"
        @input="mainStore.form.phone = $event.target.value"
      />

      <v-row>
        <v-col cols="6">
          <v-text-field
            label="Логин"
            density="comfortable"
            :readonly="!mainStore.isEdit"
            :model-value="mainStore.form.username"
            @input="mainStore.form.username = $event.target.value"
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            label="Пароль"
            density="comfortable"
            :readonly="!mainStore.isEdit"
            :model-value="mainStore.form.password"
            @input="mainStore.form.password = $event.target.value;"
          />
        </v-col>
      </v-row>
    </div>

    <div class="profile__additional-info">
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
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7W6mLzWzyvqjcwfWJLW1uGM6G-dAsfgtFzw&s"
          />
        </template>
      </v-img>

      <input
        ref="fileInput"
        type="file"
        class="d-none"
        @change="updateAvatarHandler"
      >

      <v-text-field
        label="Роль"
        class="mt-2"
        density="comfortable"
        :model-value="mainStore.form.role_name"
        readonly
      />
    </div>
  </section>
</template>

<script setup>

import { computed, onMounted } from 'vue';
import { useMainStore } from '@/store/mainStore';

const mainStore = useMainStore();

onMounted(() => {
  mainStore.getUserInfo();
});

const updateAvatarHandler = (event) => {
  const file = event.target.files[0];
  mainStore.updateAvatar(file);
};

const getAvatarSrc = computed(() => `${import.meta.env.VITE_API_URL}/${mainStore.avatarPath}`);

</script>

<style lang="sass" scoped>
.profile
  display: flex
  gap: 40px
  &__main-info
    flex: 1 1 auto
  &__additional-info
    .avatar
    width: 198px
    height: 198px
    border-radius: 50%
    &:hover
      filter: blur(8px)
      cursor: pointer
</style>
