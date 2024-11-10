<template>
  <v-layout>
    <v-navigation-drawer
      :model-value="store.viewModal"
      temporary=""
      style="width: 400px"
      location="right"
      @update:model-value="store.viewModal = $event"
      @update:modelValue="this.reset()"
    >
      <v-list-item :title="title"></v-list-item>

      <v-list nav="">
        <v-form @submit.prevent ref="form">
          <v-text-field
            label="Name"
            density="comfortable"
            :model-value="store.form.name"
            :rules="rules"
            @input="store.form.name = $event.target.value"
          ></v-text-field>

          <v-text-field
            label="Surname"
            density="comfortable"
            :model-value="store.form.surname"
            :rules="rules"
            @input="store.form.surname = $event.target.value"
          ></v-text-field>

          <v-select
            v-model="store.form.gender"
            :items="['Male', 'Female']"
            density="comfortable"
            label="Gender"
            :rules="rules"
          ></v-select>

          <v-text-field
            label="Date of birth"
            type="date"
            :max="maxDate"
            :model-value="store.form.birth"
            :rules="dateRule"
            @input="store.form.birth = $event.target.value"
          ></v-text-field>

          <v-btn
            type="submit"
            class="mt-2"
            :loading="loading"
            @click.stop="this.submitItem()"
            >Submit</v-btn
          >
          <v-btn
            type="submit"
            style="margin-left: 10px"
            class="mt-2"
            @click.stop="this.reset()"
            >Reset</v-btn
          >
        </v-form>
      </v-list>
    </v-navigation-drawer>
  </v-layout>
</template>

<script>
import { useStore } from "@/store/actions"

export default {
	data() {
		return {
			store: useStore(),
			rules: [
				(value) => {
					if (value) return true
					return "You must enter data."
				},
			],
			dateRule: [
				(value) => {
					if (value) return true
					return "You must enter data."
				},
				(v) => v <= this.calculateMaxDate() || "Date must be in the past",
			],
			maxDate: this.calculateMaxDate(),
			loading: false,
		}
	},

	props: {
		title: String,
	},

	methods: {
		async submitItem() {
			try {
				if (this.store.isEdit === false) {
					await this.store.saveData()
					this.loading = true
				} else if (this.store.isEdit === true) {
					await this.store.updData()
				}
				await this.store.getList()
				this.store.viewModal = false
				this.loading = false
				this.reset()
			} catch (e) {
				this.store.viewModal = true
				this.loading = false
			}
		},

		reset() {
			this.$refs.form.reset()
			this.store.form = {
				name: "",
				surname: "",
				gender: "",
				birth: "",
			}
		},
		calculateMaxDate() {
			return new Date().toISOString().split("T")[0]
		},
	},
}
</script>
z