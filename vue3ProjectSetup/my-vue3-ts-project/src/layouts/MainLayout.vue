<template>
  <div class="main-layout">
    <!-- 侧边栏：大屏下宽度比例更小，减少占比 -->
    <div class="sidebar-container" :class="{ collapsed: isCollapsed }">
      <Sidebar />
    </div>
    <!-- 主内容区：核心优化 - 取消固定margin-left，用flex占满剩余宽度 -->
    <div class="main-content" :style="{ flex: isCollapsed ? '1 1 calc(100% - 64px)' : '1 1 calc(100% - 200px)' }">
      <!-- 顶部导航：优化高度和间距 -->
      <div class="content-header">
        <div class="header-left">
          <button class="btn-default collapse-btn" @click="toggleCollapse">
            {{ isCollapsed ? '🔍' : '📥' }}
          </button>
          <h1 class="page-title">{{ $route.meta.title || '首页' }}</h1>
        </div>
        <div class="header-right">
          <div class="user-info">
            <img :src="userStore.userInfo?.avatar" alt="头像" class="avatar" />
            <span class="nickname">{{ userStore.userInfo?.nickname }}</span>
            <button class="btn-danger logout-btn" @click="userStore.logout">退出</button>
          </div>
        </div>
      </div>
      <!-- 内容区域：核心优化 - 取消宽度限制，占满父容器 -->
      <div class="content-body">
        <div class="container-full">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue';
import Sidebar from '@/components/Sidebar.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const isCollapsed = ref(false); // 侧边栏折叠状态

// 提供折叠状态给子组件
provide('isCollapsed', isCollapsed);

// 切换折叠
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<style scoped>
.main-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
  /* 全局背景色，避免内容区外漏白 */
  background-color: #f5f7fa;
}

/* 侧边栏：优化宽度，大屏下更窄 */
.sidebar-container {
  width: 200px; /* 原220px → 200px，减少占比 */
  height: 100vh;
  transition: all 0.3s ease;
  z-index: 10;
}

.sidebar-container.collapsed {
  width: 64px;
}

/* 主内容区：核心优化 - 占满剩余宽度，无固定间距 */
.main-content {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  transition: flex 0.3s ease;
  background-color: #f5f7fa;
}

/* 顶部导航：优化高度和间距，减少挤压 */
.content-header {
  height: 60px; /* 原64px → 60px，减少高度 */
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  padding: 0 clamp(10px, 2vw, 24px);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px; /* 原16px → 12px，减少间距 */
}

.collapse-btn {
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px; /* 原12px → 10px，减少间距 */
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #f0f0f0;
}

.nickname {
  font-size: 14px;
  color: #333;
}

.logout-btn {
  padding: 6px 10px;
  font-size: 13px;
  border-radius: 4px;
}

/* 内容主体：核心优化 - 取消padding上限，占满宽度 */
.content-body {
  flex: 1;
  padding: clamp(16px, 2vw, 32px) 0;
  overflow: auto;
}

/* 全屏容器：彻底取消宽度限制 */
.container-full {
  width: 100%;
  height: 100%;
}

/* 响应式适配：小屏下侧边栏折叠，内容区占满 */
@media (max-width: 768px) {
  .sidebar-container {
    position: fixed;
    transform: translateX(-100%);
  }
  
  .sidebar-container.collapsed {
    transform: translateX(0);
    width: 64px;
  }
  
  .main-content {
    flex: 1 1 100% !important;
  }
  
  .nickname {
    display: none;
  }
}
</style>