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
      path: '/sign-up',
      name: 'SignUp',
      component: () => import('../views/visitor/SignUpWizard.vue')
    }
  ]
})

export default router
