import { Auth0Client, createAuth0Client, type Auth0ClientOptions } from '@auth0/auth0-spa-js'
import type { AxiosInstance } from 'axios'
import axios from 'axios'

let auth0ClientInstance: Auth0Client | null = null
const auth0ClientOptions: Auth0ClientOptions = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  authorizationParams: {
    redirect_uri: window.location.origin
  }
}

export const getAuth0Client = async () => {
  if (!auth0ClientInstance) {
    auth0ClientInstance = await createAuth0Client(auth0ClientOptions)
  }
  return auth0ClientInstance
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `https://${auth0ClientOptions.domain}/`
})

export const handleSignUp = async (email: string, password: string, name: string) => {
  try {
    await axiosInstance.post('dbconnections/signup', {
      client_id: auth0ClientOptions.clientId,
      email,
      password,
      name,
      connection: import.meta.env.VITE_AUTH0_DB_CONN_NAME
    })
    console.log('Signup successful')
  } catch (err) {
    console.error('Big error on handleSignUp uh oh')
    throw err
  }
}

export const loginUser = async (email: string, password: string) => {
    try {
      console.log('auth0Service.loginUser', email, password)
        const auth0Client = await getAuth0Client();
        await auth0Client.loginWithRedirect({
          authorizationParams: {
            redirect_uri: 'http://somewhereortheother'
          }
        })
    } catch (err) {
        console.error('whoops', err);
        throw err;
    }
}


