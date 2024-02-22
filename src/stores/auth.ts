import type { User } from '@auth0/auth0-spa-js'
import { defineStore } from 'pinia'

interface AuthState {
  isAuthenticated: boolean
  bearerToken: string | null
  user: User | undefined
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuthenticated: false,
    bearerToken: null,
    user: undefined
  }),
  actions: {
    setIsAuthenticated() {
      this.isAuthenticated = true
    },
    setToken(token: string) {
      this.bearerToken = token
    },
    setUser(user: User | undefined) {
      this.user = user
    },
    clearAuth() {
      this.user = undefined
      this.bearerToken = null
      this.isAuthenticated = false
    }
  }
})
