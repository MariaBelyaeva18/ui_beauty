import { defineStore } from 'pinia';
import state from './state';

export const store = defineStore('store', {
	state,
});
