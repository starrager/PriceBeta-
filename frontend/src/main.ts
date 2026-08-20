import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import App from './App.vue'
import router from './router/router.ts'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast,{
    position:'bottom-right',
    timeout:3000,
    closeOnClick:true,
    pauseOnHover:true,
})
app.mount('#app')