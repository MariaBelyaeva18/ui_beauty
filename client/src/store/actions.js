import { defineStore } from 'pinia';
import axios from 'axios';
console.log(import.meta.env);
const apiUrl = import.meta.env.VITE_API_URL;
export const useStore = defineStore('uStore', {
	state: () => ({
		users: [],
		viewModal: false,
		isEdit: false,
		userEditId: null,
		filters: {
			userGender: null,
			lowAge: null,
			highAge: null,
		},
		meta: {
			sort: '',
			sortBy: 'age',
		},
		form: {
			name: '',
			surname: '',
			gender: '',
			birth: '',
		},
	}),

	actions: {
		/**
		 * Выведение списка пользователей
		 */
		async getList() {
			const data = await axios.get(`${apiUrl}/users`, {
				params : {
					filter: this.filters,
					meta: this.meta,
				},
			});

			this.users = data.data;
		},

		/**
		 * Добавление пользователя
		 */
		async saveData() {
			await axios.post(`${apiUrl}/users/list`, this.form);
			await this.getList();
		},

		/**
		 * Обновление данных пользователя
		 */
		async updData() {
			await axios.patch(`${apiUrl}/users/${this.userEditId}`, this.form);
			await this.getList();
		},

		/**
		 * Удаление пользователя
		 * @param id - ID пользователя
		 */
		async delOne(id) {
			await axios.delete(`${apiUrl}/users/${id}`);
			await this.getList();
		},
	},
});


