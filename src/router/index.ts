import { createRouter, createWebHistory } from 'vue-router'
import VisitorHome from '../views/visitor/VisitorHome.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: VisitorHome
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/create-account',
      name: 'CreateAccount',
      component: () => import('@/views/visitor/CreateAccount.vue')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/user/UserHome.vue')
    }
  ]
})

export default router
