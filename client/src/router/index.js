import { createRouter, createWebHistory } from 'vue-router';

import AuthPage from '@/modules/auth/pages/AuthPage.vue';
import UsersPage from '@/modules/users/pages/UsersPage.vue';
import StoragePage from '@/modules/storage/pages/StoragePage.vue';
import ServicesPage from '@/modules/services/pages/ServicesPage.vue';
import RegisterPage from '@/modules/register/pages/RegisterPage.vue';
import EmployeePage from '@/modules/employee/registry/pages/EmployeePage.vue';
import EmployeeDetailPage from '@/modules/employee/detail/pages/EmployeeDetailPage.vue';
import CalendarPage from '@/modules/calendar/pages/CalendarPage.vue';
import DocsPage from '@/modules/docs/pages/DocsPage.vue';
import OrdersPage from '@/modules/orders/pages/OrdersPage.vue';

const routes = [
  { path: '/', redirect: { path: '/auth' } },
  { path: '/auth', name: 'auth', component: AuthPage },
  { path: '/users', name: 'users', component: UsersPage },
  { path: '/storage', name: 'storage', component: StoragePage },
  { path: '/register', name: 'register', component: RegisterPage },
  { path: '/services', name: 'services', component: ServicesPage },
  { path: '/calendar', name: 'calendar', component: CalendarPage },
  { path: '/employee', name: 'employee', component: EmployeePage },
  { path: '/docs', name: 'docs', component: DocsPage },
  { path: '/employee/:employeeId', name: 'employeeDetail', component: EmployeeDetailPage },
  { path: '/orders', name: 'orders', component: OrdersPage },
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
