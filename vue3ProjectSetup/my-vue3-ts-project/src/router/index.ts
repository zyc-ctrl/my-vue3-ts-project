import { createRouter, createWebHistory } from 'vue-router';

import type { RouteRecordRaw } from 'vue-router'; // 重点：加 type
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // 平滑滚动
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' };
  },
});

export default router;