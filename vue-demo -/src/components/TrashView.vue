<template>
  <div class="trash-view">
    <div v-if="store.trashList.length === 0" class="empty">回收站为空</div>

    <div v-else>
      <div v-for="item in store.trashList" :key="item.id" class="trash-item">
        <span :class="{ completed: item.completed }">{{ item.content }}</span>
        <button class="success-btn" @click="store.restoreTodo(item.id)">恢复</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTodoStore } from '@/stores/todo'

const store = useTodoStore()
</script>

<style scoped>
.empty {
  color: #999;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
}

.trash-item {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  min-height: 72px;
  padding: 0 12px;
  border-bottom: 1px solid #ededed;
  color: #333;
  font-size: 20px;
  font-weight: 700;
}

.completed {
  color: #999;
  text-decoration: line-through;
}
</style>
