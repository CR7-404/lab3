<template>
  <div class="login-page">
    <div class="login-card">
      <h1>用户登录</h1>

      <label for="username">用户名</label>
      <input id="username" v-model="username" type="text" placeholder="请输入用户名">

      <label for="password">密码</label>
      <input
        id="password"
        v-model="password"
        type="password"
        placeholder="请输入密码"
        @keyup.enter="handleLogin"
      >

      <button class="login-btn" @click="handleLogin">登录</button>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTodoStore } from '@/stores/todo'

const store = useTodoStore()
const username = ref('')
const password = ref('')
const error = ref('')

const handleLogin = () => {
  error.value = ''

  if (!store.login(username.value, password.value)) {
    error.value = '用户名或密码不能为空'
  }
}
</script>

<style scoped>
.login-page {
  width: min(1440px, calc(100vw - 180px));
  min-height: calc(100vh - 190px);
  margin: 82px auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eef0f4;
}

.login-card {
  width: 440px;
  padding: 64px 44px 38px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.12);
}

h1 {
  margin: 0 0 34px;
  font-size: 32px;
  line-height: 1.2;
}

label {
  display: block;
  margin-bottom: 10px;
  color: #111;
  font-size: 22px;
  font-weight: 700;
}

input {
  margin-bottom: 24px;
  font-size: 18px;
}

.login-btn {
  width: 100%;
  min-height: 54px;
  color: #fff;
  background: #4bb57a;
  border-radius: 5px;
  font-size: 22px;
  font-weight: 700;
}

.error {
  margin: 14px 0 0;
  color: #d93025;
  font-weight: 700;
}

@media (max-width: 900px) {
  .login-page {
    width: calc(100vw - 48px);
    min-height: calc(100vh - 96px);
    margin-top: 48px;
  }

  .login-card {
    width: min(440px, calc(100vw - 96px));
    padding: 44px 28px 32px;
  }
}
</style>
