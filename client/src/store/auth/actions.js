import axios from 'axios';
import {store} from '../index';

const apiUrl = import.meta.env.VITE_API_URL;

export default {
	async checkUser(payload) {
		try {
			await axios.post(`${apiUrl}/auth`, {...payload});
			store.active = true;
		} catch (e) {
			console.error(e);
		}
	}
};