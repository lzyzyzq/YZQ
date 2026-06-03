<script setup>
// 从 Vue 核心导入 ref 响应式函数
import { ref } from 'vue';
// 导入工具函数：数字格式化、时间戳格式化、时长格式化
import { formatter, formatTimestamp, formatTime } from '../../modules/index.js';
// 导入封装好的 B 站 API 请求模块
import { axios } from '../../modules/server/bilibili.js';
// 导入 Vue Router 的 useRoute 钩子，用于获取当前路由参数
import { useRoute } from 'vue-router';
// 导入 Iconify 图标组件
import { Icon } from '@iconify/vue';

// 从路由参数中获取视频的 bvid（B 站视频唯一标识）
const bvid = useRoute().params.bvid;
// 存储视频详情数据的响应式变量（初始为 undefined）
const video = ref();

// 调用 B 站 API 获取视频详情信息
axios
  .get('/video/view?bvid=' + bvid)
  .then((response) => (video.value = JSON.parse(response.data).data)) // 解析 JSON 并提取 data 字段
  .catch((error) => alert(error)); // 请求失败时弹出错误提示
</script>

<template>
  <div>
    <!-- B 站视频播放器 iframe 嵌入 -->
    <iframe
      class="aspect-16/9 w-full"                    <!-- 宽高比 16:9，宽度占满父容器 -->
      :src="'https://player.bilibili.com/player.html?bvid=' + bvid" <!-- 动态拼接播放器 URL -->
      scrolling="no"                                 <!-- 禁止滚动条 -->
      border="0"                                     <!-- 边框宽度为 0 -->
      frameborder="no"                               <!-- 无边框（兼容老旧浏览器） -->
      framespacing="0"                               <!-- 无间距 -->
      allowfullscreen="true">                        <!-- 允许全屏 -->
    </iframe>
  </div>

  <!-- 当 video 数据加载成功后，显示视频详情信息 -->
  <template v-if="video">
    <div class="p-2">
      <!-- 视频标题 -->
      <h2 class="text-lg">{{ video.title }}</h2>

      <!-- 视频统计数据：播放量、弹幕数、发布时间 -->
      <div class="flex text-sm text-gray-600 m-2">
        <span class="mr-4">
          <icon class="inline" icon="mingcute:play-circle-fill"></icon>
          {{ formatter.format(video.stat.view) }}   <!-- 格式化播放量（如 12345 -> 1.2万） -->
        </span>
        <span class="mr-4">
          <icon class="inline" icon="mingcute:danmaku-fill"></icon>
          {{ formatter.format(video.stat.danmaku) }} <!-- 格式化弹幕数 -->
        </span>
        <span class="mr-4">{{ formatTimestamp(video.pubdate) }}</span> <!-- 发布时间戳转日期 -->
      </div>

      <!-- 视频辅助信息：bvid 和描述 -->
      <div class="text-xs text-base-content/80 m-2">
        <span>{{ video.bvid }}</span><br />
        <p class="mt-2">{{ video.desc }}</p> <!-- 视频描述文本 -->
      </div>
    </div>
  </template>
</template>