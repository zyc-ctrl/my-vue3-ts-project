// src/stores/user.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { UserInfo, RoleType, MenuItem } from '@/types/permission';
import router from '@/router/index';

// 模拟用户列表（纯前端验证）
const MOCK_USERS = [
  {
    username: 'admin',
    password: '123456',
    nickname: '超级管理员',
    avatar: 'https://picsum.photos/100/100?random=1',
    role: 'admin' as RoleType,
  },
  {
    username: 'editor',
    password: '123456',
    nickname: '内容编辑',
    avatar: 'https://picsum.photos/100/100?random=2',
    role: 'editor' as RoleType,
  },
  {
    username: 'guest',
    password: '123456',
    nickname: '游客',
    avatar: 'https://picsum.photos/100/100?random=3',
    role: 'guest' as RoleType,
  },
];

// 模拟菜单列表（和路由对应）
const MENU_LIST: MenuItem[] = [
  {
    id: '1',
    title: '仪表盘',
    path: '/dashboard',
    icon: '📊',
    roles: ['admin', 'editor', 'guest'],
  },
  {
    id: '2',
    title: '管理中心',
    path: '/manage',
    icon: '⚙️',
    roles: ['admin', 'editor'],
    children: [
      {
        id: '2-1',
        title: '用户管理',
        path: '/manage/user',
        icon: '👥',
        roles: ['admin'],
      },
      {
        id: '2-2',
        title: '商品管理',
        path: '/manage/goods',
        icon: '🛒',
        roles: ['admin', 'editor'],
      },
    ],
  },
  {
    id: '3',
    title: '系统设置',
    path: '/setting',
    icon: '🔧',
    roles: ['admin'],
  },
];

export const useUserStore = defineStore('user', () => {
  // ========== 状态 ==========
  /** 当前用户信息（初始从 localStorage 恢复，实现持久化） */
  const userInfo = ref<UserInfo | null>(() => {
    const savedUser = localStorage.getItem('userInfo');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  /** 是否登录 */
  const isLogin = computed(() => !!userInfo.value);

  /** 当前用户角色 */
  const currentRole = computed<RoleType>(() => userInfo.value?.role || 'guest');

  // ========== 计算属性：过滤后的菜单（核心权限逻辑） ==========
  const authMenuList = computed<MenuItem[]>(() => {
    // 递归过滤菜单：保留当前角色有权限的菜单
    const filterMenu = (menuList: MenuItem[]): MenuItem[] => {
      return menuList
        .filter((menu) => {
          // 隐藏的菜单直接过滤 + 检查角色权限
          if (menu.hidden) return false;
          return menu.roles.includes(currentRole.value);
        })
        .map((menu) => {
          // 递归处理子菜单
          if (menu.children && menu.children.length) {
            return { ...menu, children: filterMenu(menu.children) };
          }
          return menu;
        });
    };

    return filterMenu(MENU_LIST);
  });

  // ========== 方法 ==========
  /**
   * 登录方法（纯前端验证）
   * @param username 用户名
   * @param password 密码
   */
  const login = (username: string, password: string) => {
    // 模拟登录验证
    const matchUser = MOCK_USERS.find(
      (user) => user.username === username && user.password === password
    );

    if (!matchUser) {
      throw new Error('用户名或密码错误！');
    }

    // 生成模拟 token（前端随机字符串）
    const token = Math.random().toString(36).substring(2, 15);

    // 更新用户信息
    userInfo.value = {
      ...matchUser,
      token,
    };

    // 持久化到 localStorage（刷新不丢失）
    localStorage.setItem('userInfo', JSON.stringify(userInfo.value));

    // 登录后跳转到首页
    router.push('/dashboard');
  };

  /** 退出登录 */
  const logout = () => {
    userInfo.value = null;
    localStorage.removeItem('userInfo');
    router.push('/login');
  };

  /**
   * 检查权限：判断当前用户是否有指定角色权限
   * @param roles 需检查的角色列表
   */
  const hasPermission = (roles: RoleType[]) => {
    return roles.includes(currentRole.value);
  };

  return {
    userInfo,
    isLogin,
    currentRole,
    authMenuList,
    login,
    logout,
    hasPermission,
  };
});