import type { AxiosInstance } from 'axios'
import axios from 'axios'
import { getAuthToken } from './auth0Service'
import type { AxiosRequestConfig } from 'node_modules/axios/index.cjs'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

const sendRequest = async (config: AxiosRequestConfig<any>)  => {
  const bearerString = `Bearer ${await getBearerToken()}`

  if (config.headers) {
    config.headers['Authorization'] = bearerString;
  } else {
    config.headers = { 'Authorization': bearerString }
  }

  console.log(bearerString);
  axiosInstance.request(config as any);
}

export const resendVerificationEmail = async () => {
  try {
    await sendRequest({
      method: 'POST',
      url: '/user/resend-email',
    })
  } catch (err) {
    console.error('Err in resendVerificationEmail');
    throw err;
  }
}

export const createAccount = async (businessName: string) => {
  try {
    await sendRequest({
      method: 'POST',
      url: '/account',
      data: { businessName }
    })
  } catch (err) {
    console.error('axios error', err)
    throw err
  }
}

const getBearerToken = async (redirectUri?: string) => {
  try {
    const bearerToken = await getAuthToken(redirectUri);
    return bearerToken;
  } catch (err) {
    console.error('DOHHH', err)
    throw err
  }
}
