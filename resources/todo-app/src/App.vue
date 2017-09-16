<template>
  <div id="app">
    <h1 class="text-muted text-center">
      <u>TODO APP VUEX</u>
    </h1>
    <todo-app></todo-app>
  </div>
</template>

<script>
import TodoApp from './components/Todos.vue'
export default {
  components: { TodoApp },
  name: 'app'
}
</script>
