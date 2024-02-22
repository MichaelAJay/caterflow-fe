import { useAuthStore } from '@/stores/auth'
import type { AxiosInstance } from 'axios'
import axios from 'axios'
import { getAuthToken } from './auth0Service'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

export const createAccount = async (businessName: string) => {
  try {
    const bearerToken = await getBearerToken('http://localhost:5173/create-account')
    await axiosInstance.post(
      '/account',
      { businessName },
      { headers: { Bearer: `Bearer ${bearerToken}` } }
    )
  } catch (err) {
    console.error('axios error', err)
    throw err
  }
}

const getBearerToken = async (redirectUri?: string) => {
  try {
    const bearerToken = await getAuthToken(redirectUri)
    return bearerToken
  } catch (err) {
    console.error('DOHHH', err)
    throw err
  }
}
