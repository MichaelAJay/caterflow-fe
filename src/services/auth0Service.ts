import { Auth0Client, createAuth0Client } from '@auth0/auth0-spa-js'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'

let auth0ClientInstance: Auth0Client | null = null

export const getAuth0Client = async (redirectUri?: string) => {
  try {
    if (!auth0ClientInstance) {
      auth0ClientInstance = await createAuth0Client({
        domain: import.meta.env.VITE_AUTH0_DOMAIN,
        clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
        authorizationParams: {
          redirect_uri: redirectUri || window.location.origin
        }
      })
    }
    return auth0ClientInstance
  } catch (err) {
    console.error('getAuth0Client err', err)
    throw err
  }
}

export const signup = async (redirectUri: string) => {
  const auth0Client = await getAuth0Client()
  console.log('In auth0 service before loginWithRedirect')
  await auth0Client.loginWithRedirect({
    authorizationParams: { redirect_uri: redirectUri, screen_hint: 'signup' }
  })
  console.log('In auth0 service after loginWithRedirect')
}

export const loginUser = async (redirectUri: string) => {
  try {
    const auth0Client = await getAuth0Client()
    await auth0Client.loginWithRedirect({
      authorizationParams: {
        redirect_uri: redirectUri
      }
    })
  } catch (err) {
    console.error('whoops', err)
    throw err
  }
}

// Should be checked in component which was redirected to
export const shouldHandleAuth0RedirectCallback = () => {
  return window.location.search.includes('code=') && window.location.search.includes('state=');
}

// Should only be called if shouldHandleAuth0RedirectCallback returns true
export const handleAuth0RedirectCallback = async () => {
  try {
    const auth0Client = await getAuth0Client()
    console.log('handleAuth0RedirectCallback after getAuth0Client')
    await auth0Client.handleRedirectCallback()
    console.log('handleAuth0RedirectCallback after handleRedirectCallback')
    await setAuthStore(auth0Client)

    // Clear auth query params
    const newUrl = window.location.pathname
    console.log('newUrl', newUrl)
    window.history.replaceState(null, '', newUrl)

    console.log('Handled')
  } catch (err) {
    // If a page is refreshed

    // eslint-disable-next-line no-debugger
    debugger
    console.error('Error handling Auth0 redirect callback:', err)
    router.push({ name: 'home' })
  }
}

export const handleInitialAuthentication = async () => {
  try {
    const auth0Client = await getAuth0Client()
    await setAuthStore(auth0Client)
  } catch (err) {
    console.error('err in auth0 service handleAuthentication', err)
  }
}

export const getAuthToken = async (redirectUri?: string) => {
  let auth0Client
  try {
    auth0Client = await getAuth0Client()
    await setAuthStore(auth0Client)
  } catch (err) {
    console.error('Error obtaining token silently', err)
    if (auth0Client) {
      if (redirectUri) {
        await auth0Client.loginWithRedirect({ authorizationParams: { redirect_uri: redirectUri } })
      } else {
        await auth0Client.loginWithRedirect()
      }
    }
    return null
  }
}

/**
 * If the client is not logged in, this will fail gracefully. State will not be set, but the error will be handled (ignored)
 */
const setAuthStore = async (auth0Client: Auth0Client) => {
  try {
    const authStore = useAuthStore()
    const token = await auth0Client.getTokenSilently()
    const user = await auth0Client.getUser()
    authStore.setToken(token)
    authStore.setUser(user)
    authStore.setIsAuthenticated()
    console.log('auth store set')
  } catch (err: any) {
    // Throw any error that is NOT 'login_required'
    if (err.error !== 'login_required') {
      console.error('setTokenAndUser error', err.message)
      throw err
    }
    // If err.error IS 'login_required', this is the expected case when a user is not logged in
    // It may be ignored
  }
}
