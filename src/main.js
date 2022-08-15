import { createApp } from 'vue'
import App from './App.vue'

import pinia from './store'
import router from './router'

import '~/assets/styles/index.scss'

createApp(App).use(pinia).use(router).mount('#app')
 