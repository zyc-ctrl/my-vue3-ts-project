<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-header">
        <img src="https://picsum.photos/60/60" alt="logo" class="login-logo" />
        <h3 class="login-title">Vue3 权限管理系统</h3>
      </div>
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-item">
          <label>用户名</label>
          <div class="input-wrapper">
            <span class="input-icon">👤</span>
            <input
              v-model="username"
              type="text"
              placeholder="请输入用户名（admin/editor/guest）"
              required
            />
          </div>
        </div>
        <div class="form-item">
          <label>密码</label>
          <div class="input-wrapper">
            <span class="input-icon">🔒</span>
            <input
              v-model="password"
              type="password"
              placeholder="请输入密码（123456）"
              required
            />
          </div>
        </div>
        <button type="submit" class="btn btn-primary login-btn" :disabled="loading">
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>
      <div class="login-tip">
        <p>测试账号：</p>
        <p>admin/123456（管理员） | editor/123456（编辑） | guest/123456（游客）</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';

const username = ref('');
const password = ref('');
const loading = ref(false);
const userStore = useUserStore();

// 登录处理
const handleLogin = async () => {
  try {
    loading.value = true;
    await userStore.login(username.value, password.value);
    alert('登录成功！');
  } catch (error) {
    const errMsg = (error as Error).message;
    alert(errMsg);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #409eff 0%, #66b1ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 420px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 40px;
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-logo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-bottom: 12px;
}

.login-title {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.login-form {
  margin-bottom: 24px;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 12px;
  font-size: 16px;
  color: #999;
  z-index: 1;
}

.input-wrapper input {
  padding-left: 40px !important;
}

.login-btn {
  width: 100%;
  height: 44px;
  font-size: 16px;
  border-radius: 8px;
}

.login-tip {
  text-align: center;
  font-size: 13px;
  color: #999;
  line-height: 1.6;
}

.login-tip p {
  margin: 0 0 4px 0;
}

/* 响应式适配 */
@media (max-width: 480px) {
  .login-card {
    padding: 24px;
  }
}
</style>