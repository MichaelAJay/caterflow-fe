import type { AxiosInstance } from 'axios'
import axios from 'axios'
import { getAuthToken } from './firestoreAuth'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

axiosInstance.interceptors.request.use(async (config) => {
  const token = await getAuthToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const createUser = async () => {
  try {
    // This method is used to maintain parity with OAuth 2.0 provider and uses the provided token
    await axiosInstance.post('/user')
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const verifyEmail = async () => {
  try {
    await axiosInstance.patch('/user/verify-email')
  } catch (err) {
    console.error(err)
    throw err
  }
}

export const createAccount = async (name: string) => {
  try {
    await axiosInstance.post('/account', { name })
  } catch (err) {
    console.error('axios error', err)
    throw err
  }
}

export const apiHealthCheck = async (checkPublicHealth = false) => {
  try {
    const url = checkPublicHealth ? '/app/health/public' : '/app/health'
    await axiosInstance.get(url)
    return true
  } catch (err) {
    return false
  }
}

export const isUserAssociatedWithAccount = async (): Promise<boolean> => {
  try {
    const { data } = await axiosInstance.get('user/account-status')
    return data && data.hasAccount === true
  } catch (err) {
    console.error('isUserAssociatedWithAccount error', err)
    return false
  }
}
