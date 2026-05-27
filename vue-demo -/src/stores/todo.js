import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

const STORAGE_KEY = 'todo-app-storage'

function readStorage() {
  try {
    const rawValue = localStorage.getItem(STORAGE_KEY)
    return rawValue ? JSON.parse(rawValue) : {}
  } catch {
    return {}
  }
}

export const useTodoStore = defineStore('todo', () => {
  const savedState = readStorage()

  const user = ref(savedState.user || null)
  const todoList = ref(savedState.todoList || [])
  const trashList = ref(savedState.trashList || [])

  const isLoggedIn = computed(() => !!user.value)
  const activeCount = computed(() => todoList.value.filter(item => !item.completed).length)
  const completedCount = computed(() => todoList.value.filter(item => item.completed).length)
  const totalCount = computed(() => todoList.value.length)
  const trashCount = computed(() => trashList.value.length)

  watch(
    [user, todoList, trashList],
    () => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          user: user.value,
          todoList: todoList.value,
          trashList: trashList.value
        })
      )
    },
    { deep: true, immediate: true }
  )

  function login(username, password) {
    const cleanUsername = username.trim()

    if (!cleanUsername || !password) {
      return false
    }

    user.value = { username: cleanUsername }
    return true
  }

  function logout() {
    user.value = null
  }

  function addTodo(content) {
    const cleanContent = content.trim()

    if (!cleanContent) {
      return
    }

    todoList.value.push({
      id: Date.now(),
      content: cleanContent,
      completed: false,
      isEditing: false
    })
  }

  function toggleComplete(id) {
    const item = todoList.value.find(item => item.id === id)

    if (item) {
      item.completed = !item.completed
    }
  }

  function enableEdit(id) {
    todoList.value.forEach(item => {
      item.isEditing = item.id === id
    })
  }

  function saveEdit(id, content) {
    const item = todoList.value.find(item => item.id === id)

    if (!item) {
      return
    }

    const cleanContent = content.trim()

    if (cleanContent) {
      item.content = cleanContent
    }

    item.isEditing = false
  }

  function moveToTrash(id) {
    const index = todoList.value.findIndex(item => item.id === id)

    if (index !== -1) {
      const item = todoList.value.splice(index, 1)[0]
      trashList.value.push({ ...item, isEditing: false, deletedAt: Date.now() })
    }
  }

  function deleteTodo(id) {
    const index = todoList.value.findIndex(item => item.id === id)

    if (index !== -1) {
      todoList.value.splice(index, 1)
    }
  }

  function restoreTodo(id) {
    const index = trashList.value.findIndex(item => item.id === id)

    if (index !== -1) {
      const item = trashList.value.splice(index, 1)[0]

      todoList.value.push({
        id,
        content: item.content,
        completed: item.completed,
        isEditing: false
      })
    }
  }

  function clearTrash() {
    trashList.value = []
  }

  return {
    user,
    todoList,
    trashList,
    isLoggedIn,
    activeCount,
    completedCount,
    totalCount,
    trashCount,
    login,
    logout,
    addTodo,
    toggleComplete,
    enableEdit,
    saveEdit,
    moveToTrash,
    deleteTodo,
    restoreTodo,
    clearTrash
  }
})
