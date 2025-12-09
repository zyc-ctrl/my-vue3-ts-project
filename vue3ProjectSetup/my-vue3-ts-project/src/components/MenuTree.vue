<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    background-color="#2e3b4e"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="collapsed"
  >
    <template v-for="menu in menuList" :key="menu.id">
      <el-sub-menu v-if="menu.children && menu.children.length" :index="menu.id">
        <template #title>
          <el-icon><component :is="menu.icon" /></el-icon>
          <span>{{ menu.title }}</span>
        </template>
        <el-menu-item 
          v-for="subMenu in menu.children" 
          :key="subMenu.id" 
          :index="subMenu.id"
          @click="handleMenuClick(subMenu.path)"
        >
          <el-icon><component :is="subMenu.icon" /></el-icon>
          <span>{{ subMenu.title }}</span>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item v-else :index="menu.id" @click="handleMenuClick(menu.path)">
        <el-icon><component :is="menu.icon" /></el-icon>
        <span>{{ menu.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { MenuItem } from '@/types/permission';
// 导入 Element Plus 图标
import {  User, ShoppingCart, Setting } from '@element-plus/icons-vue';

const props = defineProps<{
  menuList: MenuItem[];
  collapsed: boolean;
}>();

const router = useRouter();

// 菜单点击跳转
const handleMenuClick = (path: string) => {
  router.push(path);
};

// 给菜单补充图标（也可以在 Store 的 MENU_LIST 中直接定义）
const menuList = props.menuList.map(menu => {
  const iconMap: Record<string, any> = {
    '仪表盘': User,
    '用户管理': User,
    '商品管理': ShoppingCart,
    '系统设置': Setting,
    '管理中心': Setting,
  };
  return {
    ...menu,
    icon: iconMap[menu.title] || User,
    children: menu.children?.map(subMenu => ({
      ...subMenu,
      icon: iconMap[subMenu.title] || User,
    })),
  };
});
</script>

<style scoped>
.el-menu-vertical-demo {
  border-right: none;
  height: 100%;
}
</style>