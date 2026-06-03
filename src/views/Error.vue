<script setup>
// 导入 Vue 的响应式 ref 函数（虽然本例未使用，但保留引入）
import { ref } from 'vue';
// 导入 Vue Router 的 useRoute 钩子，用于获取当前路由信息
import { useRoute } from 'vue-router';

// HTTP 错误状态码映射表：键为状态码，值为英文和中文描述
const httpErrors = {
  400: {
    en: 'Bad Request',
    cn: '错误请求',
  },
  401: {
    en: 'Unauthorized',
    cn: '未授权',
  },
  402: {
    en: 'Payment Required',
    cn: '需要付款',
  },
  403: {
    en: 'Forbidden',
    cn: '禁止',
  },
  404: {
    en: 'Not Found',
    cn: '未找到',
  },
  405: {
    en: 'Method Not Allowed',
    cn: '方法不被允许',
  },
  406: {
    en: 'Not Acceptable',
    cn: '不可接受',
  },
  407: {
    en: 'Proxy Authentication Required',
    cn: '需要代理身份验证',
  },
  408: {
    en: 'Request Timeout',
    cn: '请求超时',
  },
  409: {
    en: 'Conflict',
    cn: '冲突',
  },
  410: {
    en: 'Gone',
    cn: '已消失',
  },
  411: {
    en: 'Length Required',
    cn: '需要长度',
  },
  412: {
    en: 'Precondition Failed',
    cn: '前提条件失败',
  },
  413: {
    en: 'Payload Too Large',
    cn: '负载过大',
  },
  414: {
    en: 'URI Too Long',
    cn: 'URI过长',
  },
  415: {
    en: 'Unsupported Media Type',
    cn: '不支持的媒体类型',
  },
  416: {
    en: 'Range Not Satisfiable',
    cn: '范围不满足',
  },
  417: {
    en: 'Expectation Failed',
    cn: '期望失败',
  },
  418: {
    en: "I'm a teapot",
    cn: '我是一个茶壶',
  },
  421: {
    en: 'Misdirected Request',
    cn: '错误指向的请求',
  },
  422: {
    en: 'Unprocessable Entity',
    cn: '不可处理的实体',
  },
  423: {
    en: 'Locked',
    cn: '锁定',
  },
  424: {
    en: 'Failed Dependency',
    cn: '依赖失败',
  },
  425: {
    en: 'Too Early',
    cn: '太早',
  },
  426: {
    en: 'Upgrade Required',
    cn: '需要升级',
  },
  428: {
    en: 'Precondition Required',
    cn: '需要前提条件',
  },
  429: {
    en: 'Too Many Requests',
    cn: '请求过多',
  },
  431: {
    en: 'Request Header Fields Too Large',
    cn: '请求头字段过大',
  },
  451: {
    en: 'Unavailable For Legal Reasons',
    cn: '因法律原因不可用',
  },
};

// 获取当前路由对象
const route = useRoute();
// 获取路由参数中的 errorType，若该错误码存在于映射表中则使用它，否则默认使用 404
const errorCode = httpErrors[route.params.errorType]
  ? route.params.errorType
  : '404';
// 根据 errorCode 获取对应的错误消息对象（包含英文和中文）
const errorMessage = httpErrors[errorCode];
</script>

<template>
  <!-- 错误页面主体容器，上下外边距各 20 单位 -->
  <div class="my-20">
    <!-- 错误码和描述区域，水平居中，底部间距 -->
    <div class="text-center m-2 mb-5">
      <!-- 大号粗体显示错误状态码 -->
      <h1 class="text-6xl font-bold">{{ errorCode }}</h1>
      <!-- 显示英文错误描述 -->
      <h2 class="text-2xl">{{ errorMessage.en }}</h2>
      <!-- 显示中文错误描述 -->
      <span>{{ errorMessage.cn }}</span>
    </div>
    <!-- 按钮区域，水平居中 -->
    <div class="text-center">
      <div>
        <!-- 路由链接，点击后跳转到首页 -->
        <router-link class="btn btn-primary" to="/" role="button"
          >返回首页</router-link
        >
      </div>
    </div>
  </div>
</template>