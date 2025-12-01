<template>
  <div class="user-manage-page">
    <div class="card">
      <h2 class="card-title">用户管理</h2>
      <p class="card-desc">仅管理员可访问此页面，支持用户的新增、编辑、删除操作</p>
      
      <div class="table-actions" style="margin-bottom: 16px; display: flex; justify-content: flex-end;">
        <button class="btn btn-primary">新增用户</button>
      </div>
      
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>用户名</th>
            <th>昵称</th>
            <th>角色</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>admin</td>
            <td>超级管理员</td>
            <td>管理员</td>
            <td>2025-11-01</td>
            <td>
              <button class="btn btn-default" style="margin-right: 8px;">编辑</button>
              <button class="btn btn-danger">删除</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>editor</td>
            <td>内容编辑</td>
            <td>编辑</td>
            <td>2025-11-02</td>
            <td>
              <button class="btn btn-default" style="margin-right: 8px;">编辑</button>
              <button class="btn btn-danger">删除</button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>guest</td>
            <td>游客</td>
            <td>游客</td>
            <td>2025-11-03</td>
            <td>
              <button class="btn btn-default" style="margin-right: 8px;">编辑</button>
              <button class="btn btn-danger">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
// 后续可补充用户列表请求/编辑/删除逻辑
</script>

<style scoped>
.user-manage-page {
  width: 100%;
}

.card-desc {
  color: #666;
  margin-bottom: 20px;
  font-size: 14px;
}
</style>