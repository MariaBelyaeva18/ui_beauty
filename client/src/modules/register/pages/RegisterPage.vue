<template>
  <section class="register">
    <div class="register_title">Регистрация</div>
    <div class="register_form">
      <v-text-field
          class="auth_input"
          label="last_name"
          density="comfortable"
          :model-value="register.form.last_name"
          @input="register.form.last_name = $event.target.value"
      ></v-text-field>
      <v-text-field
          class="auth_input"
          label="name"
          :rules="rules"
          density="comfortable"
          :model-value="register.form.name"
          @input="register.form.name = $event.target.value"
      ></v-text-field>
      <v-text-field
          class="auth_input"
          label="middle_name"
          density="comfortable"
          :model-value="register.form.middle_name"
          @input="register.form.middle_name = $event.target.value"
      ></v-text-field>
      <v-text-field
          class="auth_input"
          label="phone"
          density="comfortable"
          :model-value="register.form.phone"
          @input="register.form.phone = $event.target.value"
      ></v-text-field>
      <v-text-field
          class="auth_input"
          label="role"
          :rules="rules"
          density="comfortable"
          :model-value="register.form.role"
          @input="register.form.role = $event.target.value"
      ></v-text-field>
      <v-text-field
          class="auth_input"
          label="username"
          :rules="rules"
          density="comfortable"
          :model-value="register.form.username"
          @input="register.form.username = $event.target.value"
      ></v-text-field>
      <v-text-field
          class="auth_input"
          label="password"
          :rules="rules"
          density="comfortable"
          :model-value="register.form.password"
          @input="register.form.password = $event.target.value"
      ></v-text-field>
      <v-text-field
          class="auth_input"
          label="repeatPassword"
          :rules="rules"
          density="comfortable"
          :model-value="register.form.repeatPassword"
          @input="register.form.repeatPassword = $event.target.value"
      ></v-text-field>
      <div>
        <v-btn
            type="submit"
            class="mt-2"
        >Сохранить</v-btn>
        <v-btn
            type="submit"
            style="margin-left: 10px"
            class="mt-2"
            @click.stop="this.reset()"
        >Очистить</v-btn>
        <v-btn
            type="submit"
            style="margin-left: 10px"
            class="mt-2"
            @click.stop="this.$router.push('/auth')"
        >Отмена</v-btn>
      </div>
    </div>
  </section>
</template>

<script>
import {registerStore} from '@/store/register';
import {store} from '@/store';

export default {
	name: 'RegisterPage',
	data () {
		return {
			register: registerStore(),
			main: store(),
			rules: [(value) => !!value || 'Это обязательное поле.'],
		};
	},
	methods: {
		reset() {
			this.register.form = {
				name: null,
				middle_name: null,
				last_name: null,
				username: null,
				password: null,
				repeatPassword: null,
				phone: null,
				role: null,
			};
		},
	}
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