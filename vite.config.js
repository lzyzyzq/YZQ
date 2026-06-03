import { defineConfig } from 'vite'      // 从 vite 导入 defineConfig 方法
import vue from '@vitejs/plugin-vue'     // 导入 Vue 插件
import tailwindcss from '@tailwindcss/vite'  // 导入 Tailwind CSS 的 Vite 插件

// https://vite.dev/config/               // Vite 配置文档链接
export default defineConfig({
  plugins: [                             // 插件配置
    vue(),                               // 启用 Vue 插件
    tailwindcss(),                       // 启用 Tailwind CSS 插件
  ],
})