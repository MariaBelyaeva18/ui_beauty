import { defineStore } from 'pinia';
import state from './state';
import actions from './actions';

export const registerStore = defineStore('registerStore', {
	actions,
	state,
});
