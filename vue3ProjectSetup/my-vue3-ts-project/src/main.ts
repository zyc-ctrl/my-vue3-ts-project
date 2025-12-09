import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index.ts' // 注意路径要匹配你的文件位置

import { createPinia } from 'pinia'

// 1. 导入 Element Plus 核心和样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 2. 导入 Element Plus 所有图标（可选）
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const pinia = createPinia()


const app = createApp(App)
app.use(ElementPlus)

// 4. 全局注册所有图标（可选，注册后可直接用 <ElIcon><User /></ElIcon>）
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 挂载 Pinia、Router
app.use(pinia)
app.use(router)
app.mount('#app')
// createApp(App).use(router).use(pinia).mount('#app')
