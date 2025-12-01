<template>
  <div class="sidebar" :class="{ collapsed: isCollapsed }">
    <!-- 侧边栏头部 -->
    <div class="sidebar-header">
      <img src="https://picsum.photos/40/40" alt="logo" class="sidebar-logo" />
      <span class="sidebar-title" v-show="!isCollapsed">Vue3权限系统</span>
    </div>
    <!-- 侧边栏菜单 -->
    <div class="sidebar-menu">
      <MenuTree :menu-list="authMenuList" :collapsed="isCollapsed" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject ,ref,Ref} from 'vue';
import { useUserStore } from '@/stores/user';
import MenuTree from './MenuTree.vue';

const userStore = useUserStore();
const { authMenuList } = userStore;

// 修正：指定注入值的类型（默认值为 ref(false)）
const isCollapsed = inject<Ref<boolean>>('isCollapsed', ref(false));
</script>

<style scoped>
.sidebar {
  width: 220px;
  height: 100vh;
  background-color: #2e3b4e;
  color: #fff;
  transition: all 0.3s ease;
  overflow: hidden;
}

.sidebar.collapsed {
  width: 64px;
}

/* 侧边栏头部 */
.sidebar-header {
  height: 64px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  gap: 12px;
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

/* 菜单区域 */
.sidebar-menu {
  padding: 16px 0;
  height: calc(100vh - 64px);
  overflow-y: auto;
}

/* 滚动条样式优化 */
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
</style>