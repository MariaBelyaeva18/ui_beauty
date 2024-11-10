<template>
  <v-sheet
    class="mx-auto"
    max-width="30%"
  >

    <v-list nav="">
      <v-form
        @submit.prevent
        style="margin-top: 20px;"
        ref="filters"
      >

        <div class="filt">
          <v-text-field
            density="comfortable"
            label="Age from"
            @update:modelValue="store.filters.lowAge = $event"
          ></v-text-field>

          <v-text-field
            density="comfortable"
            label="Age to"
            @update:modelValue="store.filters.highAge = $event"
          ></v-text-field>
        </div>
        
          <v-select
            :items="['Male', 'Female']"
            density="comfortable"
            label="Gender"
            @update:modelValue="store.filters.userGender = $event"
          ></v-select>
        
        <div class="filt">
          <v-btn
            @click="this.store.getList()"
          >find</v-btn>

          <v-btn
            style="margin-left: 10px;"
            @click="filter"
          >reset</v-btn>
        </div>
      </v-form>
    </v-list>
  </v-sheet>
</template>

<style scoped>
.filt {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>

<script>
import { useStore } from "@/store/actions"

export default {
	data() {
		return {
			store: useStore(),
		}
	},
	methods: {
		filter() {
			this.$refs.filters.reset() 
			this.store.getList()
		}
	}
}
</script>
