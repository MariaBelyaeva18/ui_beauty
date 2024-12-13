<template>
  <component :is="templates[getLayout]">
    <router-view />
  </component>
</template>

<script setup>
import { computed, onMounted, shallowRef } from 'vue';
import UsersLayout from './layout/UsersLayout.vue';
import NotAuthorizedLayout from '@/layout/NotAuthorizedLayout.vue';
import { useAuthStore } from '@/store/authStore';

const authStore = useAuthStore();

const templates = shallowRef({
  UsersLayout,
  NotAuthorizedLayout,
});

const getLayout = computed(() => {
  if (authStore.isAuth) {
    return 'UsersLayout';
  }
  return 'NotAuthorizedLayout';
});

onMounted(() => {
  authStore.isAuth = !!localStorage.getItem('user');
});
</script>
