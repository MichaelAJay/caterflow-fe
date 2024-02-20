import type { AxiosInstance } from 'axios'
import type { ICreateAccountPayload } from './interfaces/request/create-account.body'
import axios from 'axios'

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

export async function createAccount(data: ICreateAccountPayload) {
  try {
    

    await axiosInstance.post('/account', data)
  } catch (err) {
    console.error('axios error')
    throw err
  }
}
