import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
export default {
  /**
	* Выведение списка пользователей
	*/
  async getList() {
    const { data: { data } } = await axios.get(`${apiUrl}/roles`);
    this.roles = data;
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
};
