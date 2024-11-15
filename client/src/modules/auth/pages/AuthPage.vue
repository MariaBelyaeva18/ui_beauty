<template>
  <v-text-field
    label="Username"
    density="comfortable"
    :model-value="store.form.username"
    @input="store.form.username = $event.target.value"
  ></v-text-field>

  <v-text-field
    label="Password"
    density="comfortable"
    :model-value="store.form.password"
    @input="store.form.password = $event.target.value"
  ></v-text-field>
  <v-btn
    type="submit"
    class="mt-2"
    @click.stop="loginButton(store.form)"
  >Submit</v-btn>
  <v-btn
    type="submit"
    style="margin-left: 10px"
    class="mt-2"
    @click.stop="this.reset()"
  >Reset</v-btn>
  <v-alert
    v-if="store.message"
    :text="store.message"
    title="ERROR"
    type="error"
    variant="tonal"
  ></v-alert>
</template>

<script setup>
</script>

<script>
import {authStore} from '@/store/auth';

export default {
	data () {
		return {
			store: authStore(),
		};
	},
	methods: {
		reset() {
			this.store.form = {
				username: null,
				password: null,
			};
		},
		async loginButton(payload) {
			await this.store.checkUser(payload);
			// await this.$router.push('/users');
		},
	}
};
</script>