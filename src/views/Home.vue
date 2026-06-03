<script setup>
// 从 Vue 核心导入 ref 响应式函数
import { ref } from 'vue';
// 导入封装好的 axios、toast 提示、彩蛋工具
import { axios, toast, easterEgg } from '../modules/index.js';
// 导入主题状态管理
import { useThemeStore } from '../stores/theme.js';
// 导入友链卡片子组件
import LinkCard from '../components/LinkCard.vue';
// 导入渐变文字子组件
import GradientText from '../components/GradientText/GradientText.vue';

// 获取主题 store 实例
const theme = useThemeStore();
// 存储友链数据的响应式数组（从 GitHub Issues 获取）
const issuesFriendLink = ref();

// 调用 API 获取友链数据（该接口返回 JSON 字符串，需 parse）
axios
  .get('https://api.mcwxt.top/issues/friendlink')
  .then((response) => JSON.parse(response.data))
  .then((data) => {
    const _issuesFriendLink = [];                     // 临时数组
    data.map((value, key) => {
      // 如果 issue 状态为 closed（已关闭），则跳过
      if (value.issue_state === 'closed') {
        return;
      }
      // 构建友链对象：标题、简介、链接、图标
      _issuesFriendLink[key] = {};
      _issuesFriendLink[key].title = value.site_title;
      _issuesFriendLink[key].brief = value.site_brief;
      _issuesFriendLink[key].url = value.site_url;
      _issuesFriendLink[key].icon = value.site_icon;
    });
    // 将处理后的数据赋值给响应式变量
    issuesFriendLink.value = _issuesFriendLink;
  })
  .catch(
    () =>
      // 如果请求失败，显示一个默认的错误提示友链
      (issuesFriendLink.value = [
        {
          title: '出问题啦',
          url: 'https://github.com/MCWXT/Blog/issues',
          icon: 'https://img.icons8.com/?size=100&id=k0I9K7HGGgQY&format=png&color=000000',
          brief: '提交错误',
        },
      ]),
  );
</script>

<template>
  <div>
    <!-- 顶部背景图：固定宽高比 20:7，背景图片居中覆盖不重复 -->
    <div
      class="bg-[url(/img/background.jpg)] bg-cover bg-no-repeat bg-center aspect-20/7"></div>
    <!-- 头像、昵称、粉丝数据区域，flex 布局 -->
    <div class="flex">
      <!-- 左侧：头像和昵称 -->
      <div>
        <!-- 头像容器：相对定位，高度 8rem，向上偏移 -0.5rem 实现叠盖背景效果 -->
        <div class="avatar ms-2 relative" style="height: 8rem; top: -0.5rem">
          <!-- 圆形头像，点击时触发彩蛋效果：调用主题切换方法 -->
          <img
            class="rounded-full"
            @click="easterEgg.click(() => theme.toggleTheme())"
            src="/img/logo.png"
            alt="" />
        </div>
        <!-- 昵称区域：宽度 8rem，水平居中 -->
        <div class="text-center ms-2" style="width: 8rem">
          <!-- 渐变文字组件，根据深/浅色主题动态设置渐变色 -->
          <GradientText
            :colors="
              theme.isDark()
                ? ['#ffffff', '#ededed', '#cfcfcf']
                : ['#000000', '#1a1a1a', '#858585']
            "
            :animation-speed="3"
            :show-border="false"
            class-name="your-custom-class"
            class="text-4xl rounded-none w-36">
            MCWXT
          </GradientText>
        </div>
      </div>
      <!-- 右侧：粉丝/关注/获赞统计数据及关注按钮 -->
      <div class="p-2">
        <div class="my-4">
          <!-- 三个统计卡片行 -->
          <div class="stats mb-2">
            <div class="stat px-3 py-2">
              <span class="stat-value text-xl">4527</span>
              <span class="stat-title text-xs mx-auto">粉丝</span>
            </div>
            <div class="stat px-3 py-2">
              <span class="stat-value text-xl">88</span>
              <span class="stat-title text-xs mx-auto">关注</span>
            </div>
            <div class="stat px-3 py-2">
              <span class="stat-value text-xl">3.6万</span>
              <span class="stat-title text-xs mx-auto">获赞</span>
            </div>
          </div>
          <!-- 关注按钮（外链到 B 站空间） -->
          <div class="text-center">
            <a
              class="btn btn-neutral btn-sm w-48"
              href="https://m.bilibili.com/space/3493283118451294"
              ><span class="text-light">关注</span></a
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 个人简介文字区域 -->
    <div>
      <div class="p-2 text-sm">
        <span
          >努力成为一个大UP主ing。感谢您来我的博客站，本人也参与开发：DMX梦幻服，<a
            href="//remcbbs.top/"
            >REmcbbs论坛</a
          >……也欢迎大家来我其他开发的站点</span
        >
      </div>
    </div>
    <!-- 页面内部导航标签：视频、讨论 -->
    <div>
      <ul class="border-y border-base-300 py-1">
        <li class="inline mx-3">
          <router-link class="link" to="/video">视频</router-link>
        </li>
        <li class="inline mx-3">
          <router-link class="link" to="/discussions">讨论</router-link>
        </li>
      </ul>
    </div>
    <!-- 友链区域 -->
    <div>
      <div>
        <!-- 友链标题：图标 + 文字 -->
        <div class="m-2">
          <icon class="text-3xl me-1" icon="mingcute:link-2-line"></icon>
          <h2 class="inline">友链</h2>
        </div>
        <!-- 友链卡片列表，flex 换行布局，循环 issuesFriendLink 数据 -->
        <div class="flex justify-md-start justify-center flex-wrap">
          <link-card
            class="mx-2 my-1 border border-base-200"
            v-for="item in issuesFriendLink"
            :href="item.url"
            :title="item.title"
            :icon="item.icon"
            :content="item.brief"></link-card>
        </div>
      </div>
    </div>
  </div>
</template>