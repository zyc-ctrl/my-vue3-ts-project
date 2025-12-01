<template>
    <div class="goods-manage-page">
      <h2>商品管理</h2>
      <p>管理员/编辑可访问此页面</p>
      <div class="goods-list">
        <div class="goods-item" v-for="item in goodsList" :key="item.id">
          <img :src="item.img" alt="商品图片" class="goods-img" />
          <div class="goods-info">
            <h3>{{ item.name }}</h3>
            <p>价格：¥{{ item.price }}</p>
            <p>销量：{{ item.sales }}件</p>
          </div>
          <div class="goods-ops">
            <button class="oper-btn">编辑</button>
            <button class="oper-btn danger">下架</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // 模拟商品列表
  const goodsList = ref([
    {
      id: 1,
      name: 'Vue3 实战教程',
      price: 99,
      sales: 120,
      img: 'https://picsum.photos/100/100?random=1',
    },
    {
      id: 2,
      name: 'TypeScript 进阶指南',
      price: 89,
      sales: 88,
      img: 'https://picsum.photos/100/100?random=2',
    },
  ]);
  </script>
  
  <style scoped>
  .goods-manage-page {
    padding: 20px;
  }
  
  .goods-list {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .goods-item {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 15px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
  
  .goods-img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
  }
  
  .goods-info {
    flex: 1;
  }
  
  .goods-ops {
    display: flex;
    gap: 8px;
  }
  
  .oper-btn {
    padding: 4px 8px;
    border: none;
    border-radius: 4px;
    background: #42b983;
    color: #fff;
    cursor: pointer;
  }
  
  .oper-btn.danger {
    background: #ff6b6b;
  }
  </style>