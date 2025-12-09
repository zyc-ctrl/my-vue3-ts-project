<template>
  <div class="login-page">
    <el-card class="login-card" shadow="hover">
      <div class="login-header">
        <img src="https://picsum.photos/60/60" alt="logo" class="login-logo" />
        <h3 class="login-title">Vue3 权限管理系统</h3>
      </div>
      <el-form 
        ref="loginFormRef" 
        :model="loginForm" 
        :rules="loginRules" 
        class="login-form"
        @submit.prevent="handleLogin"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名（admin/editor/guest）"
            prefix-icon="User"
            size="large"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码（123456）"
            prefix-icon="Lock"
            size="large"
          />
        </el-form-item>
        <el-form-item>
          <el-button 
            type="primary" 
            class="login-btn" 
            size="large"
            :loading="loading"
            native-type="submit"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
      <div class="login-tip">
        <p>测试账号：</p>
        <p>admin/123456（管理员） | editor/123456（编辑） | guest/123456（游客）</p>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';

const loading = ref(false);
const userStore = useUserStore();

// Element Plus 表单相关
const loginFormRef = ref<FormInstance>();
const loginForm = ref({
  username: '',
  password: '',
});
const loginRules = ref<FormRules>({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});

// 登录处理
const handleLogin = async () => {
  if (!loginFormRef.value) return;
  
  // 表单验证
  const valid = await loginFormRef.value.validate();
  if (!valid) return;

  try {
    loading.value = true;
    await userStore.login(loginForm.value.username, loginForm.value.password);
    ElMessage.success('登录成功！'); // 直接使用 Element Plus 消息提示
  } catch (error) {
    const errMsg = (error as Error).message;
    ElMessage.error(errMsg);
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

@media (max-width: 480px) {
  .login-card {
    padding: 24px;
  }
}
</style>