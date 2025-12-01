// src/router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/stores/user';
import type { RoleType } from '@/types/permission';

// 导入组件（推荐懒加载）
const Home = () => import('@/views/Home.vue');
const Dashboard = () => import('@/views/Dashboard.vue');
const UserManage = () => import('@/views/UserManage.vue');
const GoodsManage = () => import('@/views/GoodsManage.vue');
const Setting = () => import('@/views/Setting.vue');
const Login = () => import('@/views/Login.vue');
const NotFound = () => import('@/views/404.vue');
const MainLayout = () => import('@/layouts/MainLayout.vue');

// 修改路由规则，嵌套布局
const routes: RouteRecordRaw[] = [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { roles: ['admin', 'editor', 'guest'], hidden: true },
    },
    // 所有权限页面嵌套到 MainLayout 中
    {
      path: '/',
      component: MainLayout, // 布局组件
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta: { title: '仪表盘', icon: '📊', roles: ['admin', 'editor', 'guest'] },
        },
        {
          path: 'manage',
          name: 'Manage',
          meta: { title: '管理中心', icon: '⚙️', roles: ['admin', 'editor'] },
          children: [
            {
              path: 'user',
              name: 'UserManage',
              component: UserManage,
              meta: { title: '用户管理', icon: '👥', roles: ['admin'] },
            },
            {
              path: 'goods',
              name: 'GoodsManage',
              component: GoodsManage,
              meta: { title: '商品管理', icon: '🛒', roles: ['admin', 'editor'] },
            },
          ],
        },
        {
          path: 'setting',
          name: 'Setting',
          component: Setting,
          meta: { title: '系统设置', icon: '🔧', roles: ['admin'] },
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
      meta: { hidden: true },
    },
  ];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior: () => ({ top: 0 }),
  });
  
  // 全局前置守卫：权限控制核心
  router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    const { isLogin, hasPermission } = userStore;
  
    // 1. 无需登录的页面（登录页/404）直接放行
    if (to.path === '/login' || to.name === 'NotFound') {
      next();
      return;
    }
  
    // 2. 未登录：跳转到登录页
    if (!isLogin) {
      next('/login');
      return;
    }
  
    // 3. 已登录：检查页面权限
    const routeRoles = (to.meta.roles as RoleType[]) || ['guest'];
    if (hasPermission(routeRoles)) {
      // 有权限：放行
      next();
    } else {
      // 无权限：跳转到404或提示
      next('/:pathMatch(.*)*'); // 跳转到404
      // 可选：提示无权限
      alert(`当前角色【${userStore.currentRole}】无权限访问 ${to.meta.title || to.path}！`);
    }
  });

export default router;