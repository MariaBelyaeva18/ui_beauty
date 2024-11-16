import AuthPage from '@/modules/auth/pages/AuthPage.vue';
import UsersPage from '@/modules/users/pages/UsersPage.vue';

export default () => [
	{
		path: '/auth',
		name: 'auth',
		title: 'AUTH',
		component: AuthPage,
	},
	{
		path: '/users',
		name: 'users',
		title: 'Users',
		component: UsersPage,
	},
];
