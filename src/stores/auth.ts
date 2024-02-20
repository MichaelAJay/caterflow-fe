import { Auth0Client, createAuth0Client } from '@auth0/auth0-spa-js'
import { defineStore } from 'pinia'
import router from '../router'
import { getAuth0Client } from '@/services/auth0Service'

interface AuthState {
  auth0Client: Auth0Client | null
  isAuthenticated: boolean
  user: unknown
  loading: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    auth0Client: null,
    isAuthenticated: false,
    user: undefined,
    loading: true
  }),
  actions: {
    async initializeClient() {
      this.auth0Client = await getAuth0Client();
      try {
        this.isAuthenticated = await this.auth0Client.isAuthenticated()
        if (this.isAuthenticated) {
          router.push({ name: 'about' }).catch((reason) => {
            console.error(reason)
            throw reason
          })
          this.user = await this.auth0Client.getUser()
        } else {
          router.push({ name: 'home' })
        }
      } catch (err) {
        console.error('err in initializeClient')
        throw err
      } finally {
        this.loading = false
      }
    },
    async login() {
      await this.auth0Client?.loginWithRedirect()
    },
    logout() {
      this.auth0Client?.logout({ logoutParams: { returnTo: window.location.origin } })
    }
  }
})
