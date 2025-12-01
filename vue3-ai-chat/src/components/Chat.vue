<template>
    <div class="chat-container">
      <!-- 聊天历史 -->
      <div class="chat-history" ref="chatHistoryRef">
        <div v-for="msg in chatStore.messages" :key="msg.id" :class="`chat-message ${msg.role}`">
          <div class="content">
            <!-- 先用普通文本显示，确保内容可见，后续可恢复 Markdown -->
            {{ msg.content }}
          </div>
        </div>
        <!-- 加载中动画 -->
        <div v-if="chatStore.isStreaming" class="loading">
          <span class="animate-bounce">●</span>
          <span class="animate-bounce delay-100">●</span>
          <span class="animate-bounce delay-200">●</span>
        </div>
      </div>
  
      <!-- 输入区域 -->
      <div class="input-area">
        <textarea
          v-model="chatStore.inputContent"
          placeholder="输入你的问题..."
          :disabled="chatStore.isStreaming"
          @keydown.enter.prevent="handleSend"
          @keydown.shift.enter="handleNewLine"
        ></textarea>
        <div class="button-group">
          <button @click="handleSend" :disabled="!chatStore.inputContent.trim() || chatStore.isStreaming">
            发送
          </button>
          <button @click="chatStore.clearChat">清空</button>
        </div>
  
        <!-- 模型切换（只保留通义千问） -->
        <div class="model-switch">
          <label>
            <input type="radio" v-model="selectedModel" value="dashscope" checked disabled /> 通义千问
          </label>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, nextTick} from 'vue';
  import { useChatStore } from '@/stores/chatStore';
  import { streamChat } from '@/utils/aiClient';

  const chatHistoryRef = ref<HTMLDivElement | null>(null);
  
  const chatStore = useChatStore();
  const selectedModel = ref<'dashscope'>('dashscope');
  
  // 页面加载时恢复聊天历史
  onMounted(() => {
    chatStore.initChat();
  });
  
  // 发送消息（复用测试组件的成功逻辑，简化响应式更新）
  const handleSend = async () => {
    const content = chatStore.inputContent.trim();
    if (!content) return;
  
    // 1. 添加用户消息（用数组替换，强制触发响应式）
    const userMsg = {
      id: Date.now().toString(),
      role: 'user' as const,
      content,
      timestamp: Date.now()
    };
    chatStore.messages = [...chatStore.messages, userMsg];
    localStorage.setItem('chatMessages', JSON.stringify(chatStore.messages));
  
    // 2. 初始化 AI 消息（占位“加载中...”）
    const aiMsgId = Date.now().toString() + '-ai';
    const aiMsg = {
      id: aiMsgId,
      role: 'assistant' as const,
      content: '加载中...',
      timestamp: Date.now()
    };
    chatStore.messages = [...chatStore.messages, aiMsg];
  
    // 3. 开启流式状态 + 清空输入框
    chatStore.isStreaming = true;
    chatStore.inputContent = '';
  
    try {
      // 4. 调用 AI 接口（复用测试组件的代理地址，已验证可用）
      const validMessages = chatStore.messages
        .slice(0, -1) // 排除占位 AI 消息
        .map(msg => ({ role: msg.role, content: msg.content }));
      const messageIterator = await streamChat(validMessages, selectedModel.value);
  
      // 5. 先获取完整 AI 回复（确保显示，后续可恢复流式）
      let fullAiContent = '';
      for await (const chunk of messageIterator) {
        fullAiContent += chunk;
      }
  
      // 6. 更新 AI 消息（用数组 map 替换，强制触发响应式）
      chatStore.messages = chatStore.messages.map(msg => {
        if (msg.id === aiMsgId) {
          return { ...msg, content: fullAiContent }; // 替换为完整回复
        }
        return msg;
      });
      localStorage.setItem('chatMessages', JSON.stringify(chatStore.messages));
  
    } catch (error: any) {
      // 错误处理（同样用 map 替换）
      chatStore.messages = chatStore.messages.map(msg => {
        if (msg.id === aiMsgId) {
          return { ...msg, content: error.message || 'AI 回复失败' };
        }
        return msg;
      });
    } finally {
      chatStore.isStreaming = false;
    }
    scrollToBottom()
  };
  
  // Shift+Enter 换行
  const handleNewLine = () => {
    chatStore.inputContent += '\n';
  };

  // 新增：滚动到最新消息
  const scrollToBottom = async () => {
    await nextTick();
    if (chatHistoryRef.value) {
        chatHistoryRef.value.scrollTop = chatHistoryRef.value.scrollHeight;
    }
  };
  </script>
  
  <style scoped>
  .chat-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    box-sizing: border-box;
    background-color: #f9f9f9;
  }
  .chat-history {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 20px;
    gap: 16px;
    display: flex;
    flex-direction: column;
    padding-right: 8px;
    scrollbar-width: thin;
    scrollbar-color: #ccc #f5f5f5;
  }
  .chat-history::-webkit-scrollbar {
    width: 6px;
  }
  .chat-history::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 3px;
  }
  .chat-message {
    max-width: 80%;
    padding: 12px;
    border-radius: 8px;
    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    word-break: break-all;
  }
  .chat-message.user {
    align-self: flex-end;
    background: #42b983;
    color: white;
    border-bottom-right-radius: 2px;
  }
  .chat-message.assistant {
    align-self: flex-start;
    background: #fff;
    color: #333;
    border: 1px solid #eee;
    border-bottom-left-radius: 2px;
  }
  .input-area {
    display: flex;
    gap: 10px;
    align-items: flex-end;
    flex-wrap: wrap;
    width: 100%;
  }
  textarea {
    flex: 1;
    min-width: 200px;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    min-height: 80px;
    resize: none;
    box-sizing: border-box;
    font-size: 14px;
    transition: border 0.2s;
  }
  textarea:focus {
    outline: none;
    border-color: #42b983;
    box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.1);
  }
  textarea:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
  .button-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  button {
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    background: #2c3e50;
    color: white;
    cursor: pointer;
    transition: background 0.2s;
    font-size: 14px;
  }
  button:hover:not(:disabled) {
    background: #34495e;
  }
  button:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
  }
  .model-switch {
    margin-left: 10px;
    display: flex;
    gap: 15px;
    color: #666;
    align-items: center;
    flex-wrap: wrap;
    font-size: 14px;
  }
  .model-switch input {
    margin-right: 4px;
    cursor: pointer;
  }
  /* 加载动画 */
  .loading {
    align-self: flex-start;
    padding: 12px;
    color: #666;
    display: flex;
    gap: 4px;
  }
  .animate-bounce {
    animation: bounce 1s infinite;
  }
  .delay-100 {
    animation-delay: 0.1s;
  }
  .delay-200 {
    animation-delay: 0.2s;
  }
  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }
  </style>