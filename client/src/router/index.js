import { createRouter, createWebHistory } from 'vue-router';

import AuthPage from '@/modules/auth/pages/AuthPage.vue';
import UsersPage from '@/modules/users/pages/UsersPage.vue';
import StoragePage from '@/modules/storage/pages/StoragePage.vue';
import ServicesPage from '@/modules/services/pages/ServicesPage.vue';
import RegisterPage from '@/modules/register/pages/RegisterPage.vue';

const routes = [
  { path: '/', redirect: { path: '/auth' } },
  { path: '/auth', name: 'auth', component: AuthPage },
  { path: '/users', name: 'users', component: UsersPage },
  { path: '/storage', name: 'storage', component: StoragePage },
  { path: '/register', name: 'register', component: RegisterPage },
  { path: '/services', name: 'services', component: ServicesPage },
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
