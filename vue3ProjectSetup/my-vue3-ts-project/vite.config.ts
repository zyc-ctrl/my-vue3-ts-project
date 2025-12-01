import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 配置 mock 插件
    viteMockServe({
      // mock 文件目录（默认 src/mock）
      mockPath: 'src/mock',
      // 开发环境启用 mock
      localEnabled: true,
      // 生产环境是否启用（建议关闭）
      prodEnabled: false,
      // 支持 TS 文件
      supportTs: true,
      // 自动注入 mock API（无需手动引入）
      injectCode: `
        import { setupProdMockServer } from './mockProdServer';
        setupProdMockServer();
      `,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
