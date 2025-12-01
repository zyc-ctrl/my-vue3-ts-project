<template>
  <div class="dashboard-page">
    <div class="stats-grid">
      <!-- 统计卡片 -->
      <div class="stat-card">
        <div class="stat-header">
          <span class="stat-title">用户总数</span>
          <span class="stat-icon">👥</span>
        </div>
        <div class="stat-value">128</div>
        <div class="stat-trend">
          <span class="trend-up">+12.5%</span> 较上月
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-header">
          <span class="stat-title">商品总数</span>
          <span class="stat-icon">🛒</span>
        </div>
        <div class="stat-value">560</div>
        <div class="stat-trend">
          <span class="trend-up">+8.2%</span> 较上月
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-header">
          <span class="stat-title">订单总数</span>
          <span class="stat-icon">📦</span>
        </div>
        <div class="stat-value">892</div>
        <div class="stat-trend">
          <span class="trend-down">-3.1%</span> 较上月
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-header">
          <span class="stat-title">今日访问</span>
          <span class="stat-icon">👀</span>
        </div>
        <div class="stat-value">246</div>
        <div class="stat-trend">
          <span class="trend-up">+18.7%</span> 较昨日
        </div>
      </div>
    </div>

    <!-- 最近数据表格 -->
    <div class="card">
      <h2 class="card-title">最近订单</h2>
      <table class="table">
        <thead>
          <tr>
            <th>订单ID</th>
            <th>商品名称</th>
            <th>用户</th>
            <th>金额</th>
            <th>状态</th>
            <th>创建时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in recentOrders" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.user }}</td>
            <td>¥{{ item.amount }}</td>
            <td>
              <span class="status-tag" :class="`status-${item.status}`">
                {{ item.statusText }}
              </span>
            </td>
            <td>{{ item.time }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();

// 模拟最近订单数据
const recentOrders = [
  {
    id: 'ORD20251201001',
    name: 'Vue3 实战教程',
    user: 'admin',
    amount: 99,
    status: 'success',
    statusText: '已完成',
    time: '2025-12-01 10:24',
  },
  {
    id: 'ORD20251201002',
    name: 'TypeScript 进阶指南',
    user: 'editor',
    amount: 89,
    status: 'pending',
    statusText: '待支付',
    time: '2025-12-01 09:15',
  },
  {
    id: 'ORD20251201003',
    name: 'Pinia 状态管理',
    user: 'guest',
    amount: 79,
    status: 'shipping',
    statusText: '配送中',
    time: '2025-12-01 08:30',
  },
];
</script>

<style scoped>
.dashboard-page {
  width: 100%;
}

/* 统计卡片网格 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.stat-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
  padding: 20px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.stat-title {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.stat-icon {
  font-size: 20px;
  color: #409eff;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
}

.stat-trend {
  font-size: 12px;
}

.trend-up {
  color: #67c23a;
}

.trend-down {
  color: #f56c6c;
}

/* 卡片标题 */
.card-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
}

/* 状态标签 */
.status-tag {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.status-success {
  background-color: #f0f9ff;
  color: #67c23a;
}

.status-pending {
  background-color: #fef7e5;
  color: #e6a23c;
}

.status-shipping {
  background-color: #e8f4f8;
  color: #409eff;
}

/* 响应式适配 */
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>