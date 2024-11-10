export default () => [
	{
		path: '/auth',
		name: 'auth',
		component: '../modules/auth/pages/AuthPage',
	},
	{
		path: '/users',
		name: 'users',
		title: 'Users',
		component: '../modules/users/pages/UsersPage.vue',
	},
];
