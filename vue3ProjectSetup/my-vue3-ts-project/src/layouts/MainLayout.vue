<template>
  <div class="main-layout">
    <!-- 侧边栏 -->
    <div class="sidebar-container" :class="{ collapsed: isCollapsed }">
      <Sidebar />
    </div>
    <!-- 主内容区 -->
    <div class="main-content" :style="{ 'margin-left': isCollapsed ? '64px' : '220px' }">
      <!-- 顶部导航 -->
      <div class="content-header">
        <div class="header-left">
          <button class="btn-default collapse-btn" @click="toggleCollapse">
            {{ isCollapsed ? '🔍' : '📥' }}
          </button>
          <!-- 模板中 $route 可直接用，无需修改 -->
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
      <!-- 路由内容 -->
      <div class="content-body container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue';
import Sidebar from '@/components/Sidebar.vue';
import { useUserStore } from '@/stores/user';
// 如果 script 中需要用 $route，才需要导入 useRoute，模板中无需
// import { useRoute } from 'vue-router';
// const route = useRoute();

const userStore = useUserStore();
const isCollapsed = ref(false); // 侧边栏是否折叠

// 关键：向子组件提供 isCollapsed
provide('isCollapsed', isCollapsed);

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<style scoped>
.main-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.sidebar-container {
  transition: all 0.3s ease;
  z-index: 10;
}

/* 主内容区 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  transition: margin-left 0.3s ease;
  background-color: #f5f7fa;
}

/* 顶部导航 */
.content-header {
  height: 64px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.collapse-btn {
  width: 40px;
  height: 40px;
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
  gap: 12px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #f0f0f0;
}

.nickname {
  font-size: 14px;
  color: #333;
}

.logout-btn {
  padding: 6px 12px;
  font-size: 13px;
  border-radius: 4px;
}

/* 内容区域 */
.content-body {
  flex: 1;
  padding: 24px 0;
  overflow: auto;
}

/* 响应式适配 */
@media (max-width: 768px) {
  .sidebar-container {
    position: fixed;
    height: 100vh;
  }
  
  .main-content {
    margin-left: 0 !important;
  }
  
  .collapsed + .main-content {
    margin-left: 64px !important;
  }
  
  .nickname {
    display: none;
  }
}
</style>