import axios from 'axios';
import {store} from '../index';
import {authStore} from '../auth/index';

const apiUrl = import.meta.env.VITE_API_URL;

export default {
	async checkUser(payload) {
		try {
			await axios.post(`${apiUrl}/auth`, {...payload});
			authStore().message = null;
			store().active = true;
		} catch (e) {
			authStore().message = e.response.data.message;
			console.error(e);
		}
	}
};