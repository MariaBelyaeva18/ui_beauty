import { createRouter, createWebHistory } from 'vue-router';

import AuthPage from '@/modules/auth/pages/AuthPage.vue';
import UsersPage from '@/modules/users/pages/UsersPage.vue';
import RegisterPage from '@/modules/register/pages/RegisterPage.vue';
import StoragePage from '@/modules/storage/pages/StoragePage.vue';

const routes = [
  { path: '/', redirect: { path: '/auth' } },
  { path: '/auth', name: 'auth', component: AuthPage },
  { path: '/register', name: 'register', component: RegisterPage },
  { path: '/users', name: 'users', component: UsersPage },
  { path: '/storage', name: 'storage', component: StoragePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // проверяем, активен ли пользователь
  const isActive = !!localStorage.getItem('user');

  // если пользователь активен, отправляем на host
  if (!isActive && !['auth', 'register'].includes(to.name)) {
    next({ name: 'auth' });
    return;
  }

  // если пользователь активен, отправляем на host
  if (isActive && to.name === 'auth') {
    next({ name: 'users' });
    return;
  }

  next();
});
export default router;
