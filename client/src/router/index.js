import {createRouter, createWebHistory, isNavigationFailure} from 'vue-router';
import {store} from '../store/index';

import staticRoutes from './staticRoutes';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		...staticRoutes(),
		{
			path: '/',
			redirect: () => ({ path: '/auth' }),
		},
	],
});

/** Ловлю ошибки дубликатов */
const originalPush = router.push;
router.push = function push(location, onResolve, onReject) {
	if (onResolve || onReject) {
		return originalPush.call(this, location, onResolve, onReject);
	}

	return originalPush.call(this, location).catch((err) => {
		if (isNavigationFailure(err)) {
			return err;
		}

		return Promise.reject(err);
	});
};

router.beforeEach((to, from, next) => {
	const loadLocal = JSON.parse(localStorage.getItem('loading'));

	if (loadLocal && from.name) {
		return;
	}

	// проверяем, активен ли пользователь
	const isActive = store.active;
	console.log(isActive);

	// если пользователь активен, отправляем на host
	if (isActive && to.name === 'login') {
		next({ name: 'users' });
		return;
	}

	next();
});
export default router;
