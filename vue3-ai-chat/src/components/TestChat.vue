<template>
    <div style="padding: 20px;">
      <!-- 简单输入框 -->
      <textarea v-model="inputContent" placeholder="输入问题..." style="width: 500px; height: 100px; padding: 10px;"></textarea>
      <button @click="handleTestSend" style="margin-left: 10px; padding: 10px 20px;">测试发送</button>
  
      <!-- 聊天历史（纯文本显示，无样式干扰） -->
      <div style="margin-top: 20px; border-top: 1px solid #ccc; padding-top: 20px;">
        <h3>聊天记录：</h3>
        <!-- 循环显示所有消息，直接打印内容 -->
        <div v-for="(msg, index) in testMessages" :key="index">
          <strong>{{ msg.role }}：</strong>
          <span>{{ msg.content }}</span>
          <hr>
        </div>
      </div>
  
      <!-- 调试日志（显示关键信息） -->
      <div style="margin-top: 20px; color: red;">
        调试：消息总数={{ testMessages.length }} | AI 响应状态={{ aiStatus }}
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // 纯本地状态（不用 Pinia，避免状态管理问题）
  const inputContent = ref('');
  const testMessages = ref<Array<{ role: string; content: string }>>([]);
  const aiStatus = ref('未调用');
  
  // 测试发送（无流式、无 Pinia、无复杂逻辑）
  const handleTestSend = async () => {
    const content = inputContent.value.trim();
    if (!content) return;
  
    // 1. 添加用户消息（直接更新数组，Vue 一定能检测到）
    testMessages.value.push({ role: 'user', content });
    inputContent.value = '';
    aiStatus.value = '调用中...';
  
    try {
      // 2. 直接调用通义千问 API（无代理，用完整 URL，排除代理问题）
      const response = await fetch('/api/dashscope', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_DASHSCOPE_API_KEY}`
        },
        body: JSON.stringify({
          model: 'qwen-turbo',
          input: { messages: testMessages.value }, // 传递用户消息
          stream: false,
          result_format: 'text'
        })
      });
  
      // 3. 解析响应（按你的实际格式）
      const data = await response.json();
      aiStatus.value = `响应成功：${JSON.stringify(data.output)}`; // 打印完整响应
  
      // 4. 添加 AI 消息（直接 push，Vue 必渲染）
      const aiContent = data.output?.text || 'AI 未返回内容';
      testMessages.value.push({ role: 'assistant', content: aiContent });
  
    } catch (error: any) {
      aiStatus.value = `错误：${error.message}`;
      testMessages.value.push({ role: 'assistant', content: `调用失败：${error.message}` });
    }
  };
  </script>