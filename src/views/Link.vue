<script setup>
// 引入 Vue 的响应式 ref（虽然本组件未使用，但保留以备后续扩展）
import { ref } from 'vue';
// 引入 Vue Router 的路由钩子，用于获取当前路由信息
import { useRoute } from 'vue-router';
// 引入 Iconify 图标组件
import { Icon } from '@iconify/vue';

// 获取当前路由对象
const route = useRoute();

// 检查当前访问路径中是否包含 'linkto'（用于识别跳转页面的特殊标识）
if (route.path.indexOf('linkto') != -1) {
  // 如果包含，则先执行浏览器后退一步（回退到上一个页面）
  history.back();
  // 然后立即将页面重定向到查询参数 url 所指向的地址
  location.href = route.query.url;
}
</script>

<template>
  <!-- 错误/跳转页面的外层容器，上下外边距为 20 单位 -->
  <div class="my-20">
    <!-- 卡片组件，固定宽度 72 单位，水平居中，带有边框 -->
    <div class="card card-border w-72 mx-auto">
      <div class="card-body">
        <!-- 卡片头部：标题和警示徽章，水平两端对齐 -->
        <div class="flex justify-between">
          <h2 class="text-xl font-bold">跳转至:</h2>
          <div class="badge badge-soft badge-warning">
            <!-- 警示图标 -->
            <icon icon="mingcute:warning-fill"></icon>注意安全
          </div>
        </div>
        <!-- 卡片主要内容：显示即将跳转的 URL -->
        <div class="py-5">
          <p class="truncate text-base-content/90">
            {{ $route.query.url }}
          </p>
        </div>
        <!-- 卡片底部操作区：按钮右对齐 -->
        <div class="card-actions justify-end">
          <!-- “继续”按钮，点击后在新标签页打开 query 参数中的 url -->
          <a :href="$route.query.url" target="_blank" class="btn btn-primary"
            >继续</a
          >
        </div>
      </div>
    </div>
  </div>
</template>