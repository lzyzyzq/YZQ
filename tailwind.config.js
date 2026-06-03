/** @type {import('tailwindcss').Config} */
export default {
  content: [               // 内容：告诉 Tailwind 哪些文件中使用了类名
    "./index.html",        // 扫描根目录的 index.html
    "./src/**/*.{vue,js,ts,jsx,tsx}",  // 扫描 src 文件夹下所有 .vue、.js、.ts、.jsx、.tsx 文件
  ],
  theme: {                 // 主题：用于自定义设计系统（颜色、字体、间距等）
    extend: {},            // 扩展：在默认主题基础上添加新样式，而不覆盖原有配置
  },
  plugins: [],             // 插件：引入第三方 Tailwind 插件（如表单、排版等）
}