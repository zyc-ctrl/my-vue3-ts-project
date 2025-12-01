<template>
    <div class="not-found-page">
      <div class="not-found-content">
        <div class="error-code">404</div>
        <div class="error-message">
          <h2>页面找不到了 😕</h2>
          <p>你访问的页面不存在或暂无权限访问</p>
        </div>
        <button class="btn btn-primary back-btn" @click="goBack">返回首页</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRouter } from 'vue-router'; // 导入 useRouter
  
  // 创建 router 实例（替代全局 $router）
  const router = useRouter();
  
  // 返回首页
  const goBack = () => {
    router.push('/dashboard'); // 用 router.push 替代 this.$router.push
  };
  </script>
  
  
  <style scoped>
  .not-found-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f5f7fa 0%, #e4eaf5 100%);
    padding: 20px;
  }
  
  .not-found-content {
    text-align: center;
    max-width: 500px;
    width: 100%;
  }
  
  .error-code {
    font-size: 160px;
    font-weight: 700;
    color: #409eff;
    margin-bottom: 24px;
    background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
  
  .error-message h2 {
    font-size: 28px;
    color: #333;
    margin-bottom: 12px;
  }
  
  .error-message p {
    font-size: 16px;
    color: #666;
    margin-bottom: 32px;
  }
  
  .back-btn {
    padding: 12px 32px;
    font-size: 16px;
    border-radius: 8px;
  }
  
  /* 响应式适配 */
  @media (max-width: 768px) {
    .error-code {
      font-size: 100px;
    }
    
    .error-message h2 {
      font-size: 24px;
    }
  }
  </style>