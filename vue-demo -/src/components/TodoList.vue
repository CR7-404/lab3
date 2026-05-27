<template>
  <div class="todo-list">
    <div v-if="store.todoList.length === 0" class="empty">暂无待办</div>

    <div v-else class="list-box">
      <div v-for="item in store.todoList" :key="item.id" class="todo-item">
        <div class="todo-main">
          <input
            type="checkbox"
            :checked="item.completed"
            @change="store.toggleComplete(item.id)"
          >

          <span
            v-if="!item.isEditing"
            class="todo-content"
            :class="{ completed: item.completed }"
            @dblclick="store.enableEdit(item.id)"
          >
            {{ item.content }}
          </span>

          <input
            v-else
            v-model="item.content"
            class="edit-input"
            type="text"
            @blur="store.saveEdit(item.id, item.content)"
            @keyup.enter="store.saveEdit(item.id, item.content)"
          >
        </div>

        <div class="todo-actions">
          <button class="recycle-btn" @click="store.moveToTrash(item.id)">
            🗑 回收站
          </button>
          <button class="delete-btn" @click="store.deleteTodo(item.id)">
            ❌ 删除
          </button>
        </div>
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
  padding: 4px 0 10px;
  color: #999;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
}

.list-box {
  padding: 20px 12px;
  border: 1px solid #ededed;
}

.todo-item {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 18px;
  min-height: 48px;
}

.todo-main {
  display: flex;
  align-items: center;
  min-width: 0;
  gap: 13px;
}

input[type="checkbox"] {
  width: 18px;
  height: 18px;
}

.todo-content {
  color: #333;
  font-size: 18px;
  line-height: 1.5;
  cursor: text;
}

.completed {
  color: #999;
  text-decoration: line-through;
}

.edit-input {
  min-height: 36px;
}

.todo-actions {
  display: flex;
  gap: 8px;
}

.recycle-btn,
.delete-btn {
  min-height: 40px;
  padding: 0 13px;
  color: #fff;
  border-radius: 4px;
  font-weight: 700;
}

.recycle-btn {
  background: #f0a90a;
}

.delete-btn {
  background: #e53935;
}

@media (max-width: 720px) {
  .todo-item {
    grid-template-columns: 1fr;
    padding: 8px 0;
  }

  .todo-actions {
    justify-content: flex-end;
  }
}
</style>
