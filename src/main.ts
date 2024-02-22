import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { handleInitialAuthentication } from './services/auth0Service'

const app = createApp(App)

app.use(createPinia())
// Attempt to refresh or retieve tokens silently on app startup
await handleInitialAuthentication()
app.use(router)

app.mount('#app')
