<template>
  <div class="auth">
    <div class="auth_title">
      Авторизация
    </div>
    <div class="auth_notify">
      <v-alert
        v-if="authStore.message"
        class="auth_input"
        :text="authStore.message"
        density="compact"
        :icon="false"
        type="error"
        variant="tonal"
      />
    </div>
    <div class="mb-4">
      <v-text-field
        class="auth_input"
        label="Логин"
        density="comfortable"
        hide-details
        :model-value="authStore.form.username"
        @input="authStore.form.username = $event.target.value"
        @keydown.enter="loginButton(authStore.form)"
      />
      <v-text-field
        class="auth_input"
        label="Пароль"
        density="comfortable"
        hide-details
        :model-value="authStore.form.password"
        @input="authStore.form.password = $event.target.value"
        @keydown.enter="loginButton(authStore.form)"
      />
    </div>
    <div>
      <v-btn
        type="submit"
        class="mt-2"
        @click.stop="loginButton(authStore.form)"
      >
        Войти
      </v-btn>
      <v-btn
        type="submit"
        style="margin-left: 10px"
        class="mt-2"
        @click="$router.push('/register')"
      >
        Регистрация
      </v-btn>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/store/authStore';

const authStore = useAuthStore();

const loginButton = async (payload) => {
  authStore.message = null;
  await authStore.checkUser(payload);
};

</script>

<style lang="sass" scoped>
.auth
  width: 100%
  display: flex
  flex-direction: column
  margin-top: 24vh
  align-items: center
  &_title
    width: 460px
    font-size: 28px
    margin-bottom: 4px
  &_input
    width: 460px
    margin-bottom: 0
  &_notify
    height: 50px
</style>
