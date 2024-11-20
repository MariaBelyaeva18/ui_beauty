import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export default {
  async checkUser(payload) {
    try {
      const { data: { data } } = await axios.post(`${apiUrl}/auth`, { ...payload });
      this.message = null;
      localStorage.setItem('user', JSON.stringify(data));
    } catch (e) {
      this.message = e.response.data.message;
      console.error(e);
    }
  },

  async logout() {
    try {
      localStorage.setItem('user', null);
    } catch (e) {
      console.error(e);
    } finally {
      window.location.reload();
    }
  },
};
