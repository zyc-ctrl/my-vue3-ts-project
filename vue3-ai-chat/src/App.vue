<template>
  <Chat />
  <!-- <TestChat /> -->
</template>

<script setup lang="ts">
import Chat from '@/components/Chat.vue';
import TestChat from './components/TestChat.vue';
</script>

<style scoped>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
body {
  background-color: #f9f9f9;
}
</style>