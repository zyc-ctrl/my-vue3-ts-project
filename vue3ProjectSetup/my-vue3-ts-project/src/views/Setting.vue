<template>
    <div class="setting-page">
      <h2>系统设置</h2>
      <p>仅管理员可访问此页面</p>
      <div class="setting-form">
        <div class="form-item">
          <label>系统名称</label>
          <input v-model="systemName" placeholder="请输入系统名称" />
        </div>
        <div class="form-item">
          <label>主题设置</label>
          <select v-model="theme">
            <option value="light">浅色主题</option>
            <option value="dark">深色主题</option>
          </select>
        </div>
        <div class="form-item">
          <label>是否开启权限控制</label>
          <label class="switch">
            <input type="checkbox" v-model="enablePermission" />
            <span class="slider"></span>
          </label>
        </div>
        <button class="save-btn" @click="saveSettings">保存设置</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // 模拟设置项
  const systemName = ref('Vue3 权限管理系统');
  const theme = ref('light');
  const enablePermission = ref(true);
  
  // 保存设置
  const saveSettings = () => {
    alert('设置保存成功！');
    // 后续可补充持久化逻辑（localStorage）
  };
  </script>
  
  <style scoped>
  .setting-page {
    padding: 20px;
  }
  
  .setting-form {
    margin-top: 20px;
    background: #fff;
    border-radius: 8px;
    padding: 30px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }
  
  .form-item {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 20px;
  }
  
  .form-item label {
    width: 100px;
    font-weight: 500;
  }
  
  .form-item input, .form-item select {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
  }
  
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 20px;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
  
  input:checked + .slider {
    background-color: #42b983;
  }
  
  input:checked + .slider:before {
    transform: translateX(20px);
  }
  
  .save-btn {
    padding: 10px 20px;
    background: #42b983;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 120px;
  }
  
  .save-btn:hover {
    background: #359469;
  }
  </style>