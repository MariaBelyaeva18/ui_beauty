import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export default {
	async createUser(payload) {
		try {
			await axios.post(`${apiUrl}/users/`, {...payload});
		} catch (e) {
			console.error(e);
		}
	}
};