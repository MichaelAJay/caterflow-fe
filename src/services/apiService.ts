import type { AxiosInstance } from 'axios'
import axios from 'axios'
import { getAuthToken } from './firestoreAuth';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    };
    return config;
  }
)

export const createAccount = async (businessName: string) => {
  try {
    await axiosInstance.post('/account', { businessName });
  } catch (err) {
    console.error('axios error', err)
    throw err
  }
}
