import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue'),
    },
    {
      path: '/item/:id',
      name: 'item',
      component: () => import('../views/TheProductView.vue'),
      props: true,
    },
    {
      path: '/add-item',
      name: 'add-item',
      component: () => import('../views/AddNewItemView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/TheLogginView.vue'),
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    return { top: 0 };
  },
})

router.beforeEach((to) => {

  const authStore = useAuthStore();

  authStore.getAuthToken();

  if (to.meta.requiresAuth && !authStore.isLoggedIn()) return '/login';
})

export default router
