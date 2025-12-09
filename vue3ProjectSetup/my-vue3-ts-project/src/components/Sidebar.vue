<template>
  <div class="sidebar" :class="{ collapsed: isCollapsed }">
    <!-- 侧边栏头部：优化间距 -->
    <div class="sidebar-header">
      <img src="https://picsum.photos/40/40" alt="logo" class="sidebar-logo" />
      <span class="sidebar-title" v-show="!isCollapsed">Vue3权限系统</span>
    </div>
    <!-- 侧边栏菜单：占满剩余高度 -->
    <div class="sidebar-menu">
      <MenuTree :menu-list="authMenuList" :collapsed="isCollapsed" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, Ref ,ref} from 'vue';
import { useUserStore } from '@/stores/user';
import MenuTree from './MenuTree.vue';

const userStore = useUserStore();
const { authMenuList } = userStore;

// 接收折叠状态
const isCollapsed = inject<Ref<boolean>>('isCollapsed', ref(false));
</script>

<style scoped>
.sidebar {
  width: 100%;
  height: 100%;
  background-color: #2e3b4e;
  color: #fff;
  transition: all 0.3s ease;
  overflow: hidden;
}

/* 侧边栏头部：优化间距，减少高度 */
.sidebar-header {
  height: 60px; /* 原64px → 60px */
  padding: 0 12px; /* 原16px → 12px */
  display: flex;
  align-items: center;
  gap: 8px; /* 原12px → 8px */
  border-bottom: 1px solid #3e4a5e;
}

.sidebar-logo {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  object-fit: cover;
}

.sidebar-title {
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
}

/* 菜单区域：占满剩余高度，减少内边距 */
.sidebar-menu {
  padding: 8px 0; /* 原16px → 8px */
  height: calc(100% - 60px);
  overflow-y: auto;
}

/* 滚动条优化 */
.sidebar-menu::-webkit-scrollbar {
  width: 4px;
}

.sidebar-menu::-webkit-scrollbar-track {
  background: #3e4a5e;
}

.sidebar-menu::-webkit-scrollbar-thumb {
  background: #5e6b7e;
  border-radius: 2px;
}

.sidebar-menu::-webkit-scrollbar-thumb:hover {
  background: #7e8b9e;
}

/* 折叠状态 */
.sidebar.collapsed .sidebar-title {
  display: none;
}
</style>