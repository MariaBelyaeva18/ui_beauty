<template>
  <section>
    <header class="text-h4">
      <b>Beauty help</b>
      <button @click="auth.logout()">
        logout
      </button>
    </header>

    <slot />
  </section>
</template>

<script>
import { authStore } from '@/store/auth';

export default {
  name: 'UsersLayout',
  data: () => ({
    auth: authStore(),
  }),
};
</script>

<style>
header {
  background-color: #C2B9FCA9;
  height: 70px;
  font-size: 26pt;
  display: flex;
  align-items: center;
  padding-left: 40px;
}
</style>
