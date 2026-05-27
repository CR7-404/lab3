<template>
  <div id="app">
    <LoginView v-if="!store.isLoggedIn" />

    <div v-else class="app-shell">
      <header class="topbar">
        <div class="user-info">你好，{{ store.user.username }}</div>
        <nav class="nav">
          <button
            class="nav-link"
            :class="{ active: currentView === 'home' }"
            @click="currentView = 'home'"
          >
            首页
          </button>
          <button
            class="nav-link"
            :class="{ active: currentView === 'trash' }"
            @click="currentView = 'trash'"
          >
            回收站 ({{ store.trashCount }})
          </button>
          <button class="nav-link" @click="handleLogout">退出登录</button>
        </nav>
      </header>

      <main>
        <section v-if="currentView === 'home'" class="content-card">
          <h1>我的待办</h1>

          <div class="stats">
            <span>总数: {{ store.totalCount }}</span>
            <span>未完成: {{ store.activeCount }}</span>
            <span>已完成: {{ store.completedCount }}</span>
          </div>

          <div class="add-todo">
            <input
              v-model="newTodo"
              type="text"
              placeholder="添加新待办..."
              @keyup.enter="addNew"
            >
            <button class="primary-btn" @click="addNew">添加</button>
          </div>

          <TodoList />
        </section>

        <section v-else class="content-card trash-card">
          <div class="trash-header">
            <h1>回收站</h1>
            <button
              v-if="store.trashList.length > 0"
              class="danger-btn"
              @click="store.clearTrash"
            >
              清空回收站
            </button>
          </div>
          <TrashView />
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todo'
import LoginView from './components/LoginView.vue'
import TodoList from './components/TodoList.vue'
import TrashView from './components/TrashView.vue'

const store = useTodoStore()
const currentView = ref('home')
const newTodo = ref('')

const addNew = () => {
  store.addTodo(newTodo.value)
  newTodo.value = ''
}

const handleLogout = () => {
  store.logout()
  currentView.value = 'home'
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #fff;
  color: #222;
  font-family: Arial, "Microsoft YaHei", sans-serif;
  font-size: 16px;
}

button,
input {
  font: inherit;
}

button {
  border: 0;
  cursor: pointer;
}

#app {
  min-height: 100vh;
}

.app-shell {
  width: min(1440px, calc(100vw - 180px));
  margin: 74px auto 0;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 28px;
  border-bottom: 1px solid #e7e7e7;
}

.user-info {
  font-size: 24px;
  font-weight: 700;
}

.nav {
  display: flex;
  align-items: center;
  gap: 26px;
}

.nav-link {
  padding: 0;
  color: #555;
  background: transparent;
  font-size: 21px;
  font-weight: 700;
}

.nav-link.active {
  color: #49b77c;
}

.content-card {
  margin-top: 28px;
  padding: 64px 30px 30px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 18px rgba(0, 0, 0, 0.08);
}

.content-card h1 {
  margin: 0 0 42px;
  font-size: 34px;
  line-height: 1.2;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  min-height: 56px;
  margin-bottom: 22px;
  padding: 0 14px;
  background: #f7f7f7;
  border-radius: 3px;
  color: #333;
  font-size: 18px;
  font-weight: 700;
}

.stats span:nth-child(2) {
  text-align: center;
}

.stats span:nth-child(3) {
  text-align: right;
}

.add-todo {
  display: grid;
  grid-template-columns: 1fr 88px;
  gap: 12px;
  margin-bottom: 30px;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  min-height: 49px;
  padding: 0 14px;
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  color: #222;
  outline: none;
}

input[type="text"]:focus,
input[type="password"]:focus {
  border-color: #3f7edb;
  box-shadow: 0 0 0 1px #3f7edb;
}

.primary-btn,
.success-btn {
  min-height: 49px;
  padding: 0 20px;
  color: #fff;
  background: #4bb57a;
  border-radius: 5px;
  font-weight: 700;
}

.danger-btn {
  min-height: 45px;
  padding: 0 18px;
  color: #fff;
  background: #e53935;
  border-radius: 5px;
  font-weight: 700;
}

.trash-card {
  padding-top: 60px;
}

.trash-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
}

.trash-header h1 {
  margin: 0;
}

@media (max-width: 900px) {
  .app-shell {
    width: calc(100vw - 48px);
    margin-top: 36px;
  }

  .topbar,
  .nav {
    align-items: flex-start;
    flex-direction: column;
  }

  .content-card {
    padding: 36px 18px 22px;
  }

  .stats {
    grid-template-columns: 1fr;
    gap: 10px;
    padding: 14px;
  }

  .stats span,
  .stats span:nth-child(2),
  .stats span:nth-child(3) {
    text-align: left;
  }

  .add-todo {
    grid-template-columns: 1fr;
  }
}
</style>
