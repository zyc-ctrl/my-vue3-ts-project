<template>
  <div class="dashboard-page">
    <el-row :gutter="20">
      <!-- 统计卡片 -->
      <el-col :xs="24" :sm="12" :md="6" v-for="(item, index) in statsList" :key="index">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-header">
            <span class="stat-title">{{ item.title }}</span>
            <el-icon :size="20" color="#409eff"><component :is="item.icon" /></el-icon>
          </div>
          <div class="stat-value">{{ item.value }}</div>
          <div class="stat-trend">
            <el-tag :type="item.trendType" size="small">
              {{ item.trend }} 较{{ item.compare }}
            </el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 最近订单表格 -->
    <el-card class="mt-4" shadow="hover">
      <template #header>
        <h2 class="card-title">最近订单</h2>
      </template>
      <el-table :data="recentOrders" border style="width: 100%">
        <el-table-column prop="id" label="订单ID" />
        <el-table-column prop="name" label="商品名称" />
        <el-table-column prop="user" label="用户" />
        <el-table-column prop="amount" label="金额">
          <template #default="scope">¥{{ scope.row.amount }}</template>
        </el-table-column>
        <el-table-column prop="statusText" label="状态">
          <template #default="scope">
            <el-tag :type="scope.row.status">{{ scope.row.statusText }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="创建时间" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
// 导入需要的图标
import { User, ShoppingCart, Box } from '@element-plus/icons-vue';

const userStore = useUserStore();

// 模拟统计数据
const statsList = [
  {
    title: '用户总数',
    icon: User,
    value: 128,
    trend: '+12.5%',
    trendType: 'success',
    compare: '上月',
  },
  {
    title: '商品总数',
    icon: ShoppingCart,
    value: 560,
    trend: '+8.2%',
    trendType: 'success',
    compare: '上月',
  },
  {
    title: '订单总数',
    icon: Box,
    value: 892,
    trend: '-3.1%',
    trendType: 'warning',
    compare: '上月',
  },
  {
    title: '今日访问',
    icon: Box,
    value: 246,
    trend: '+18.7%',
    trendType: 'success',
    compare: '昨日',
  },
];

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
    status: 'warning',
    statusText: '待支付',
    time: '2025-12-01 09:15',
  },
  {
    id: 'ORD20251201003',
    name: 'Pinia 状态管理',
    user: 'guest',
    amount: 79,
    status: 'info',
    statusText: '配送中',
    time: '2025-12-01 08:30',
  },
];
</script>

<style scoped>
.dashboard-page {
  width: 100%;
}

.stat-card {
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

.stat-value {
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
}

.stat-trend {
  font-size: 12px;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.mt-4 {
  margin-top: 24px;
}
</style>