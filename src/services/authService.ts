import { Auth0Client, createAuth0Client } from "@auth0/auth0-spa-js";
import { onMounted, reactive } from "vue";

type User = Record<string, any>;

interface AuthState {
    auth0Client: Auth0Client | null;
    isAuthenticated: boolean;
    user: User | undefined;
    loading: boolean;
}

const state = reactive<AuthState>({
    auth0Client: null,
    isAuthenticated: false,
    user: undefined,
    loading: true,
})

export const useAuth = () => {
    onMounted(async () => {
        // Initialize the Auth0 client
        state.auth0Client = await createAuth0Client({
            domain: import.meta.env.VITE_AUTH0_DOMAIN,
            clientId: import.meta.env.VITE_AUTH0_DOMAIN
        })

        // Check if the user is authenticated
        try {
            // Handle the authentication token if present
            const isAuthenticated = await state.auth0Client.isAuthenticated();
            state.isAuthenticated = isAuthenticated;

            if (isAuthenticated) {
                // Load the user profile if authenticated
                const user = await state.auth0Client.getUser();
                state.user = user;
            }
        } catch (err) {
            console.error('Authentication check failed', err);
        } finally {
            state.loading = false;
        }
    })

    const login = async () => {
        await state.auth0Client?.loginWithRedirect({
            authorizationParams: {
                redirect_uri: 'http://localhost:5173/'
            }
        });
    };

    const logout = () => {
        state.auth0Client?.logout({
            logoutParams: {
                returnTo: 'http://localhost:5173/'
            }            
        });
    };

    return { ...state, login, logout };
}