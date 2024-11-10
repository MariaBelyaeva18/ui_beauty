<template>
  <Filters />
  <UserForm
    :view="store.viewModal"
    :title="store.isEdit ? 'Edit user' : 'New user'"
  />
  {{ test }}
  <UserTable />
</template>

<script setup>
import UserForm from '@/modules/users/components/UserForm.vue';
import UserTable from '@/modules/users/components/UserTable.vue';
import Filters from '@/modules/users/components/UserFilters.vue';
</script>

<script>
import { useStore } from '@/store/actions';
import {authStore} from '@/store/auth';

export default {
	data () {
		return {
			store: useStore(),
			test: authStore(),
		};
	},
};
</script>