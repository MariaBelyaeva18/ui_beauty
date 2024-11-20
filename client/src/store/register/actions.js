import axios from 'axios';
import router from '@/router';

const apiUrl = import.meta.env.VITE_API_URL;

export default {
  async createUser(form) {
    try {
      await axios.post(`${apiUrl}/auth/register`, { ...form });
      router.push('/auth');
    } catch (e) {
      console.error(e);
    }
  },
};
