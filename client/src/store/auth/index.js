import { defineStore } from 'pinia';
import state from './state';
import actions from './actions';

export const authStore = defineStore('authStore', {
	actions,
	state,
});
