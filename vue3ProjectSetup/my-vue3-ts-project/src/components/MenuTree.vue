<template>
  <ul class="menu-tree">
    <li
      v-for="menu in menuList"
      :key="menu.id"
      class="menu-item"
      :class="{ 
        'has-children': menu.children && menu.children.length,
        'active': route.path === menu.path || route.path.startsWith(menu.path + '/')
      }"
    >
      <router-link
        :to="menu.path"
        class="menu-link"
        @click.stop="toggleSubMenu(menu.id)"
      >
        <span class="menu-icon">{{ menu.icon }}</span>
        <span class="menu-text" v-show="!collapsed">{{ menu.title }}</span>
        <span 
          class="menu-arrow" 
          v-show="!collapsed && menu.children && menu.children.length"
          :class="{ 'expanded': openSubMenus.includes(menu.id) }"
        >
          ▶
        </span>
      </router-link>

      <div 
        class="submenu-container"
        v-show="!collapsed && openSubMenus.includes(menu.id)"
      >
        <MenuTree 
          v-if="menu.children && menu.children.length" 
          :menu-list="menu.children" 
          :collapsed="collapsed"
        />
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import type { MenuItem } from '@/types/permission';

// 关键修复：将 defineProps 的返回值赋值给 props 变量
const props = defineProps<{
  menuList: MenuItem[];
  collapsed: boolean;
}>();

// 创建 route 实例
const route = useRoute();

// 展开的子菜单ID
const openSubMenus = ref<string[]>([]);

// 切换子菜单展开/折叠
const toggleSubMenu = (id: string) => {
  const index = openSubMenus.value.indexOf(id);
  if (index > -1) {
    openSubMenus.value.splice(index, 1);
  } else {
    openSubMenus.value.push(id);
  }
};

// 初始化：根据当前路由展开对应子菜单
onMounted(() => {
  const currentPath = route.path;
  // 修复：用 props.menuList 替代 menuList
  props.menuList.forEach(menu => {
    if (currentPath.startsWith(menu.path + '/') && menu.children) {
      openSubMenus.value.push(menu.id);
    }
  });
});

// 监听路由变化，自动展开对应子菜单
watch(
  () => route.path,
  (newPath) => {
    // 修复：用 props.menuList 替代 menuList
    props.menuList.forEach(menu => {
      if (newPath.startsWith(menu.path + '/') && menu.children) {
        if (!openSubMenus.value.includes(menu.id)) {
          openSubMenus.value.push(menu.id);
        }
      }
    });
  }
);
</script>

<style scoped>
/* 样式保持不变 */
.menu-tree {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  margin: 0 8px;
  border-radius: 6px;
  margin-bottom: 4px;
  overflow: hidden;
}

.menu-item.active {
  background-color: rgba(64, 158, 255, 0.2);
}

.menu-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #e5e9f0;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s ease;
}

.menu-link:hover {
  background-color: rgba(64, 158, 255, 0.1);
  color: #fff;
}

.menu-item.active .menu-link {
  color: #fff;
  background-color: rgba(64, 158, 255, 0.3);
}

.menu-icon {
  font-size: 16px;
  width: 20px;
  text-align: center;
}

.menu-text {
  flex: 1;
  white-space: nowrap;
}

.menu-arrow {
  font-size: 12px;
  transition: transform 0.2s ease;
}

.menu-arrow.expanded {
  transform: rotate(90deg);
}

.submenu-container {
  padding-left: 24px;
  background-color: rgba(0, 0, 0, 0.1);
}

/* 折叠状态下的样式 */
.menu-item.collapsed .menu-text,
.menu-item.collapsed .menu-arrow {
  display: none;
}

.menu-item.collapsed .menu-link {
  justify-content: center;
  padding: 12px 0;
}
</style>