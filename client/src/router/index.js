import {createRouter, createWebHistory} from 'vue-router';

import AuthPage from '@/modules/auth/pages/AuthPage.vue';
import UsersPage from '@/modules/users/pages/UsersPage.vue';
import RegisterPage from '@/modules/register/pages/RegisterPage.vue';

const routes = [
	{ path: '/', redirect: {path: '/auth'} },
	{ path: '/auth', component: AuthPage },
	{ path: '/register', component: RegisterPage },
	{ path: '/users', component: UsersPage },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
