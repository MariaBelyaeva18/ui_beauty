<template>
  <section class="users-page">
    <Profile class="mt-4" />

    <v-btn
      class="d-block ml-auto"
      icon="mdi-pencil"
      size="x-large"
      :disabled="mainStore.isEdit"
      title="Редактировать"
      @click="mainStore.isEdit = true"
    />
    <v-btn
      v-if="mainStore.isEdit"
      size="x-large"
      color="blue-darken-4"
      :loading="saving"
      @click="saveHandler"
    >
      Сохранить
    </v-btn>
  </section>
</template>

<script setup>

import { ref } from 'vue';
import { useMainStore } from '@/store/mainStore';
import Profile from '@/modules/users/components/Profile.vue';

const mainStore = useMainStore();

const saving = ref(false);

const saveHandler = async () => {
  saving.value = true;
  await mainStore.updateUserInfo();
  saving.value = false;
  mainStore.isEdit = false;
};
</script>

<style lang="sass" scoped>
.users-page
  padding: 20px 40px
</style>
