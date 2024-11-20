<template>
  <div class="auth">
    <div class="auth_title">
      Авторизация
    </div>
    <div class="auth_notify">
      <v-alert
        v-if="auth.message"
        class="auth_input"
        :text="auth.message"
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
        :model-value="auth.form.username"
        @input="auth.form.username = $event.target.value"
      />
      <v-text-field
        class="auth_input"
        label="Пароль"
        density="comfortable"
        hide-details
        :model-value="auth.form.password"
        @input="auth.form.password = $event.target.value"
      />
    </div>
    <div>
      <v-btn
        type="submit"
        class="mt-2"
        @click.stop="loginButton(auth.form)"
      >
        Войти
      </v-btn>
      <v-btn
        type="submit"
        style="margin-left: 10px"
        class="mt-2"
        @click.stop="$router.push('/register')"
      >
        Регистрация
      </v-btn>
    </div>
  </div>
</template>

<script>
import { authStore } from '@/store/auth';
import { store } from '@/store';

export default {
  name: 'AuthPage',
  data() {
    return {
      auth: authStore(),
      main: store(),
    };
  },
  methods: {
    async loginButton(payload) {
      this.auth.message = null;
      await this.auth.checkUser(payload);
      window.location.reload();
    },
  },
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
