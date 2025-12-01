import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.ts' // 注意路径要匹配你的文件位置

import { createPinia } from 'pinia'
const pinia = createPinia()
createApp(App).use(router).use(pinia).mount('#app')
