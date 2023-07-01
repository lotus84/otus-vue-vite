import { createRouter, createWebHistory } from 'vue-router'
import { isLoggedIn } from '../utils/index'
import HomeView from '../views/HomeView.vue'

const ifNotAuthenticated = (to, from, next) => {
  if (!isLoggedIn()) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (isLoggedIn()) {
    next()
    return
  }
  next('/login')
}

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
      path: '/add-item',
      name: 'add-item',
      component: () => import('../views/AddNewItemView.vue'),
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/TheLoggin.vue'),
      beforeEnter: ifNotAuthenticated,
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    return { top: 0 };
  },
})

export default router
