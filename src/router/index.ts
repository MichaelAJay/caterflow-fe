import { createRouter, createWebHistory } from 'vue-router'
import VisitorUserSwitch from '@/components/VisitorUserSwitch.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: VisitorUserSwitch
    },
    {
      path: '/sign-up',
      name: 'Sign Up',
      component: () => import('@/views/visitor/SignUp.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/visitor/LogIn.vue')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/user/UserHome.vue')
    },
    {
      path: '/get-started',
      name: 'VisitorHome',
      component: () => import('@/views/visitor/VisitorHome.vue')
    },
    {
      path: '/verify-email',
      name: 'Verify Email',
      component: () => import('@/views/user/VerifyEmail.vue')
    },
    {
      path: '/create-account',
      name: 'Create Account',
      component: () => import('@/views/user/CreateAccount.vue')
    },
    {
      path: '/integrations',
      name: 'Integration Home',
      component: () => import('@/views/user/Integrations/IntegrationHome.vue')
    }
  ]
})

export default router
