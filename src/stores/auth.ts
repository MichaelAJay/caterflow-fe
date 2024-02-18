import { Auth0Client, createAuth0Client } from "@auth0/auth0-spa-js";
import { defineStore } from "pinia";

interface AuthState {
    auth0Client: Auth0Client | null;
    isAuthenticated: boolean;
    user: unknown;
    loading: boolean;
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        auth0Client: null,
        isAuthenticated: false,
        user: undefined,
        loading: true,
    }),
    actions: {
        async initializeClient() {
            this.auth0Client = await createAuth0Client({
                domain: import.meta.env.VITE_AUTH0_DOMAIN,
                clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
                authorizationParams: {
                    redirect_uri: window.location.origin
                }
            });
            try {
                this.isAuthenticated = await this.auth0Client.isAuthenticated();
                if (this.isAuthenticated) {
                    this.user = await this.auth0Client.getUser();
                }
            } catch (err) {
                console.error('err in initializeClient');
                throw err;
            } finally {
                this.loading = false;
            }
        },
        async login() {
            await this.auth0Client?.loginWithRedirect();
        },
        logout() {
            this.auth0Client?.logout({ logoutParams: { returnTo: window.location.origin } });
        },
    },
})