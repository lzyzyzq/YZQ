// 从 vue-router 导入创建路由和 HTML5 历史模式所需的方法
import { createRouter, createWebHistory } from 'vue-router';
// 导入静态组件（非懒加载）
import Home from './views/Home.vue';
import Link from './views/Link.vue';
import Error from './views/Error.vue';

// 定义路由表
const routes = [
  {
    path: '/',                // 访问路径
    name: 'Home',            // 路由名称（用于编程式导航）
    component: Home,         // 对应的组件
    meta: {                  // 路由元信息（可存放任意自定义数据）
      title: '首页',         // 页面标题
    },
  },
  {
    path: '/link',
    name: 'Link',
    component: Link,
    meta: {
      title: '跳转链接',
    },
  },
  {
    // 通配符路由：匹配所有未定义的路径（必须放在路由表最后）
    path: '/:pathMatch(.*)*',
    name: 'Error',
    component: Error,
    meta: {
      title: '未找到',
    },
  },
  {
    path: '/video',
    name: 'Videos',
    // 懒加载：只有访问该路由时才加载对应组件（优化首屏加载速度）
    component: () => import('./views/video/Home.vue'),
    meta: {
      title: '视频',
    },
  },
  {
    path: '/video/:bvid',    // 动态路由参数 :bvid（例如 /video/BV123456）
    name: 'Video',
    component: () => import('./views/video/Player.vue'),
    meta: {
      title: '视频',
    },
  },
  {
    path: '/discussions',
    name: 'Discussions',
    component: () => import('./views/discussion/Home.vue'),
    meta: {
      title: '讨论',
    },
  },
  {
    path: '/discussions/:number',   // 动态参数 :number（讨论编号）
    name: 'Discussion',
    component: () => import('./views/discussion/Discussion.vue'),
    meta: {
      title: '讨论',
    },
  },
  {
    path: '/mc/download',
    name: 'DownloadMinecraft',
    component: () => import('./views/mc/Download.vue'),
    meta: {
      title: '数据整合测试版下载',
    },
  },
  {
    path: '/logs/release',
    name: 'Release',
    component: () => import('./views/log/Release.vue'),
    meta: {
      title: '版本日志',
    },
  },
  {
    path: '/logs/commits',
    name: 'Commits',
    component: () => import('./views/log/Commits.vue'),
    meta: {
      title: '更新日志',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('./views/login/Login.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/login/oauth',
    name: 'Oauth',
    component: () => import('./views/login/Oauth.vue'),
    // 路由独享守卫：在进入该路由前进行条件判断
    beforeEnter: (to) =>
      // 如果查询参数 state 等于 'MCWXT' 且存在 code，则允许进入；否则重定向到登录页
      (to.query.state == 'MCWXT' && to.query.code && true) || {
        path: '/login',
      },
    meta: {
      title: '授权',
    },
  },
];

// 创建路由实例
const router = createRouter({
  // 使用 HTML5 History 模式（需要后端支持，否则会 404）
  history: createWebHistory(),
  routes,               // 简写 routes: routes
  // 控制页面滚动行为
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // 如果浏览器记录了上次滚动位置（例如点击前进/后退），则恢复到该位置
      return savedPosition;
    } else {
      // 否则滚动到页面顶部
      return { top: 0 };
    }
  },
});

// 全局前置守卫（每次路由跳转前都会执行）
router.beforeEach((to, from, next) => {
  // 动态设置页面标题：如果当前路由有 meta.title，则显示 "MCWXT|标题"，否则显示默认标题
  document.title = to.meta.title ? 'MCWXT|' + to.meta.title : '空空爱追剧的个人博客';
  next(); // 必须调用 next() 才能继续跳转
});

// 导出路由实例供 main.js 注入到 Vue 应用
export default router;