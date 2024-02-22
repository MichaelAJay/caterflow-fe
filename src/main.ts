import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { handleInitialAuthentication } from './services/auth0Service'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// Attempt to refresh or rerieve tokens silently on app startup
await handleInitialAuthentication()
