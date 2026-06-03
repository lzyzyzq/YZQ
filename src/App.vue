<script setup>
// 从 Vue 核心导入响应式 ref 函数
import { ref } from 'vue';
// 从 vue-router 导入路由链接和路由视图组件
import { RouterLink, RouterView } from 'vue-router';
// 导入 Iconify 图标组件
import { Icon } from '@iconify/vue';
// 导入工具函数：验证 token 和显示 toast 提示
import { validateToken, toast } from './modules/index.js';
// 导入主题状态管理 store
import { useThemeStore } from './stores/theme.js';
// 导入用户认证状态管理 store
import { useAuthStore } from './stores/auth.js';
// 导入导航栏组件
import NavBar from './components/NavBar.vue';
// 导入抽屉侧边栏组件
import DrawerSide from './components/DrawerSide.vue';

// 获取认证 store 实例
const auth = useAuthStore();
// 获取主题 store 实例
const theme = useThemeStore();
// 设置 HTML 根元素的 data-theme 属性，值为当前主题名称
document.documentElement.setAttribute('data-theme', theme.current);

// 需要被 keep-alive 缓存的路由组件名称列表（匹配路由的 name 字段）
const include = ['Home', 'Discussions', 'DownloadMinecraft'];

// 底部社交链接数据：类型、图标、显示文本、跳转地址
const link = [
  {
    type: 'BiliBili',
    icon: 'mingcute:bilibili-fill',
    content: 'MCWXT',
    location: '//space.bilibili.com/3493283118451294',
  },
  {
    type: 'QQ',
    icon: 'mingcute:qq-fill',
    content: '511742399',
    location: '//qm.qq.com/q/gBKqTOtgDm',
  },
  {
    type: 'VX',
    icon: 'mingcute:wechat-fill',
    content: 'MCtang5201314',
    location: '//u.wechat.com/EJKj9AIHxC0UTv-gIzoRCbI',
  },
  {
    type: 'Email',
    icon: 'mingcute:mail-send-fill',
    content: 'mail@kkazj
.top',
    location: '511742399@qq.com',
  },
  {
    type: 'Github',
    icon: 'mingcute:github-fill',
    content: '空空爱追剧',
    location: '//github.com/YZQ',
  },
  {
    type: 'Telegram',
    icon: 'mingcute:telegram-fill',
    content: '空空爱追剧',
    location: '//t.me/YZQ',
  },
];

// 存储全局 toast 消息的响应式数组
const toasts = ref([]);
// 监听自定义事件 'toast'，用于接收全局弹出的提示信息
document.addEventListener('toast', (e) => {
  // 根据提示类型设置对应的图标
  e.detail.data.icon = {
    info: 'mingcute:information-line',
    success: 'mingcute:check-circle-line',
    warning: 'mingcute:warning-line',
    error: 'mingcute:close-circle-line',
  }[e.detail.data.type];
  // 将新消息推入 toasts 数组
  toasts.value.push(e.detail.data);
  // 1.5 秒后自动移除该消息
  setTimeout(() => {
    toasts.value = toasts.value.filter(
      (item) => item.content !== e.detail.data.content,
    );
  }, 1500);
});

// 如果用户处于登录状态，则验证 token 是否过期
if (auth.isLogin) {
  validateToken().then((valid) => {
    if (!valid) {
      // token 无效则执行登出操作
      auth.logout();
      // 显示错误提示
      toast({
        type: 'error',
        content: '登录过期，请重新登录',
      });
    }
  });
}
</script>

<template>
  <!-- 使用 daisyUI 抽屉布局，在中等屏幕以上默认打开侧边栏 -->
  <div class="drawer md:drawer-open">
    <!-- 抽屉开关复选框，与 drawer-side 联动 -->
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <!-- 抽屉主要内容区域 -->
    <div class="drawer-content">
      <!-- 固定高度的头部区域 -->
      <header class="h-16">
        <!-- 导航栏组件，固定定位在左上角 -->
        <nav-bar class="fixed left-0 top-0 z-50"></nav-bar>
        <!-- Toast 提示容器，位于顶部中央，带有上边距避免遮挡导航栏 -->
        <div class="toast toast-top toast-center z-40 mt-16">
          <!-- 遍历 toasts 数组显示每条消息，根据 type 动态添加 alert-* 类 -->
          <div
            role="alert"
            class="alert"
            :class="`alert-${item.type}`"
            v-for="item in toasts">
            <icon class="text-xl" :icon="item.icon"></icon>
            <span>{{ item.content }}</span>
          </div>
        </div>
      </header>
      <!-- 主要内容区域 -->
      <main>
        <!-- 路由视图，并利用 keep-alive 缓存指定组件 -->
        <router-view v-slot="{ Component }">
          <keep-alive :include="include">
            <!-- 动态渲染当前路由组件，附加一个类名为路由名称 -->
            <component :class="$route.name" :is="Component"></component>
          </keep-alive>
        </router-view>
      </main>
      <!-- 分割线 -->
      <div class="border-t border-base-300 mx-8 mt-8"></div>
      <!-- 页脚区域 -->
      <footer class="footer bg-base-100 text-base-content p-10">
        <aside>
          <span class="text-2xl font-bold">空空爱追剧</span>
          <p>感谢访问我的博客！</p>
          <br />
          <p>
            <!-- 动态显示版权年份，从 2023 到当前年份 -->
            Copyright © 2023 - {{ new Date().getFullYear() }} All right reserved
            by 空空爱追剧
          </p>
          <p>
            <!-- 萌 ICP 备案链接 -->
            <a href="https://icp.gov.moe/?keyword=20250684" target="_blank"
              >穿ICP备20250685号</a
            ><span class="mx-2 text-base-content/80">|</span
            ><a
              style="text-decoration: none; color: #51c4d3"
              href="https://travel.moe/go.html"
              title="异次元之旅-跃迁-我们一起去萌站成员的星球旅行吧！"
              target="_blank"
              ><img
                class="inline me-1"
                src="https://travel.moe/images/icon/icon64.png"
                style="width: 22px; height: 22px" />异次元之旅</a
            >
          </p>
        </aside>
        <nav>
          <h6 class="footer-title">感谢</h6>
          <ul>
            <li><a href="https://vite.dev">Vite</a></li>
            <li><a href="https://www.w3.org">W3C</a></li>
            <li><a href="https://www.mozilla.org">Mozilla</a></li>
          </ul>
        </nav>
        <!-- 社交图标导航栏，自动根据 link 数据渲染图标链接 -->
        <nav
          class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a
            class="text-xl text-base-content/80"
            target="_blank"
            v-for="item in link"
            :title="item.content"
            :href="item.location">
            <icon :icon="item.icon"></icon>
          </a>
        </nav>
      </footer>
    </div>
    <!-- 抽屉侧边栏组件（菜单内容） -->
    <drawer-side class="z-100"></drawer-side>
  </div>
</template>

<style scoped></style>