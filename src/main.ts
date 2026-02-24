import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { logError } from './utils/logger'
import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()

app.config.errorHandler = (err, instance, info) => {
  logError('Uncaught component error', err as Error, {
    component: instance?.$options.name || 'Unknown',
    lifecycleHook: info
  })
}

app.use(pinia).use(router).mount('#app')
