<script setup>
// 从 Vue 核心导入 ref 响应式函数
import { ref } from 'vue';
// 导入工具函数：formatter（数字格式化）、时间戳格式化、时长格式化、toast提示
import {
  formatter,
  formatTimestamp,
  formatTime,
  toast,
} from '../../modules/index.js';
// 导入封装好的 B 站 API 请求模块（axios 实例已配置基础 URL）
import { axios } from '../../modules/server/bilibili.js';
// 导入 Iconify 图标组件
import { Icon } from '@iconify/vue';

// 存储视频列表数据的响应式变量（初始为 undefined）
const videos = ref();
// 轮播图数据：图片地址和点击跳转的目标链接
const carousel = [
  {
    image: 'https://www.dmoe.cc/random.php',      // 随机二次元图片接口
    href: 'https://www.dmoe.cc/random.php',       // 点击后同样跳转到该接口（可自定义）
  },
  {
    image: 'https://storage.mcwxt.top/assets/img/IMG_20250725_004145.jpg',
    href: 'https://github.com/mcwxt/Blog',        // 点击跳转到 GitHub 仓库
  },
];
// 调用 B 站 API 获取视频归档相关数据（例如最新投稿）
axios
  .get('/video/archive/related')
  .then((response) => (videos.value = JSON.parse(response.data).data)) // 解析 JSON 并提取 data 字段
  .catch((error) => {
    // 请求失败时弹出错误提示
    toast({
      type: 'error',
      content: error.message,
    });
  });
</script>

<template>
  <div>
    <!-- 轮播图区域：圆角、外边距、宽高比 16:9 -->
    <div class="carousel rounded-md m-2 aspect-16/9">
      <!-- 每个轮播项为一个路由链接，点击后会跳转到 /link 页面，携带目标 url 查询参数 -->
      <router-link
        class="carousel-item w-full"
        v-for="item in carousel"
        :to="{ path: '/link', query: { url: item.href } }">
        <!-- 图片覆盖整个容器，保持覆盖裁剪 -->
        <img class="object-cover w-full" :src="item.image" alt="" />
      </router-link>
    </div>

    <!-- 仅当 videos 有数据时才渲染视频网格 -->
    <template v-if="videos">
      <!-- 响应式网格布局：不同屏幕宽度下显示不同列数，间隙 2，水平居中，左右内边距 -->
      <div
        class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 justify-items-center px-2">
        <!-- 每个视频卡片为一个路由链接，点击跳转到对应视频播放页（动态路由参数 bvid） -->
        <router-link
          class="w-44 my-2 hover:bg-zinc-200 group cursor-pointer flex flex-col gap-2 transition active:scale-105"
          v-for="item in videos"
          :to="'/video/' + item.bvid">
          <!-- 视频封面容器：宽高比 4:3，相对定位，圆角溢出隐藏 -->
          <div class="aspect-4/3 relative rounded-lg overflow-hidden">
            <!-- 封面图片，覆盖容器大小 -->
            <img class="object-cover size-full" :src="item.pic" alt="" />
            <!-- 视频时长标签：位于右下角，半透明黑底白字，圆角小框 -->
            <div
              class="m-2 p-1 absolute bottom-0 end-0 bg-black/50 text-white text-xs rounded-sm">
              {{ formatTime(item.duration) }}   <!-- 格式化视频时长（秒 -> mm:ss） -->
            </div>
          </div>
          <!-- 视频信息区域 -->
          <div class="p-2">
            <!-- 标题，最多显示两行，超出省略（使用 .truncate-wrap 配合 CSS 变量 --line） -->
            <div class="">
              <h3 class="truncate-wrap text-md" style="--line: 2">
                {{ item.title }}
              </h3>
            </div>
            <!-- 统计数据行：播放量、弹幕数、发布日期 -->
            <div class="flex text-xs text-gray-600 my-1">
              <!-- 播放量图标+数字 -->
              <div class="flex-none mr-2 flex items-center">
                <icon icon="mingcute:play-circle-fill"></icon>
                <div>
                  {{ formatter.format(item.stat.view) }}   <!-- 格式化数字（如 12345 -> 1.2万） -->
                </div>
              </div>
              <!-- 弹幕数图标+数字 -->
              <div class="flex-auto flex items-center">
                <icon icon="mingcute:danmaku-fill"></icon>
                <div>
                  {{ formatter.format(item.stat.danmaku) }}
                </div>
              </div>
              <!-- 发布日期（时间戳转日期字符串） -->
              <div class="flex-1 text-nowrap">
                {{ formatTimestamp(item.pubdate) }}
              </div>
            </div>
            <!-- 底部：UP主名称和更多操作图标 -->
            <div class="flex text-sm text-gray-600">
              <p class="flex-1">
                {{ item.owner.name }}
              </p>
              <icon class="flex-none m-1" icon="mingcute:more-2-fill"></icon>
            </div>
          </div>
        </router-link>
      </div>
    </template>
  </div>
</template>