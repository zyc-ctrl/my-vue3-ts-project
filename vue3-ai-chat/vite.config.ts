import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 新增：跨域代理配置（解决通义千问/OpenAI 跨域）
  server: {
    proxy: {
      '/api/dashscope': {
        target: 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
        changeOrigin: true, // 关键：模拟请求来源，解决跨域
        rewrite: (path) => path.replace(/^\/api\/dashscope/, ''), // 去掉前缀，转发到目标 URL
        headers: { 'Content-Type': 'application/json' }
      }
    }
  }
});