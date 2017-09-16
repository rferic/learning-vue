<template>
  <div id="app">
    <img src="./assets/logo.png">
    <todo-app></todo-app>
  </div>
</template>

<script>
import TodoApp from './components/Todos'

export default {
  name: 'app',
  components: {
    TodoApp
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
