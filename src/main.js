// 导入全局样式文件
import './style.css';

// 从 vue 中导入创建应用的方法
import { createApp } from 'vue';
// 从 pinia 导入创建状态管理实例的方法
import { createPinia } from 'pinia';
// 导入根组件 App.vue
import App from './App.vue';
// 导入路由配置
import router from './router.js';

// 创建 Pinia 状态管理实例
const pinia = createPinia();
// 创建 Vue 应用实例
const app = createApp(App);

// 应用使用路由插件
app.use(router);
// 应用使用 Pinia 状态管理插件
app.use(pinia);

// 将 Vue 应用挂载到 DOM 中 id 为 'app' 的元素上
app.mount('#app');