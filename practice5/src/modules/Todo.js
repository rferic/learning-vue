// TODO Module for use on Vuex
const todoModule = {
  state: {
    todos: []
  },
  mutations: {
    addTodo (state, { text }) {
      state.todos.push({
        text,
        done: false
      })
      console.log(state.todos)
    },
    deleteTodo (state, { todo }) {
      state.todos.splice(state.todos.indexOf(todo), 1)
    },
    toggleTodo (state, { todo }) {
      todo.done = !todo.done
    },
    editTodo (state, { todo, value }) {
      todo.text = value
    },
    toggleAllTodos (state, { done }) {
      state.todos.forEach((todo) => {
        todo.done = done
      })
    },
    clearCompletedTodos (state) {
      state.todos = state.todos.filter(todo => !todo.done)
    }
  }
}

export default todoModule
