<template>
  <section>
    <header class="text-h4 d-flex justify-space-between">
      <b>Beauty help</b>
      <button @click="authStore.logout()">
        logout
      </button>
    </header>

    <slot />
  </section>
</template>

<script setup>
import { useAuthStore } from '@/store/authStore';

const authStore = useAuthStore();
</script>

<style>
header {
  background-color: #C2B9FCA9;
  height: 70px;
  font-size: 26pt;
  display: flex;
  align-items: center;
  padding: 0 40px;
}
</style>
