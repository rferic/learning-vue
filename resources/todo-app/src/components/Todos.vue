<template>
  <div id="todos" class="text-center">
    <section class="todoapp">

      <header class="header">
        <h2>Todos</h2>
        <input
          class="form-control"
          autofocus
          autocomplete="off"
          placeholder="¿Qué tienes por hacer?"
          @keyup.enter="addTodo"
        />
      </header>

      <section v-show="todos.length">
        <hr />

        <div class="col-md-8 col-md-offset-2">
          <span class="col-md-4" v-for="(val, key) in filters">
            <a
              :class="{selected: visibility === key}"
              class="btn btn-info"
              @click="visibility = key"
            >
              {{ key | capitalize }}
            </a>
          </span>
        </div>

        <hr />

        <input
          class="toggleAll"
          type="checkbox"
          :checked="allChecked"
          @change="toggleAll({done: !allChecked})"
        /> ToggleAll

        <hr />

        <ul>
          <todo v-for="todo in filteredTodos" :todo="todo"></todo>
        </ul>

      </section>

      <footer class="footer" v-show="todos.length">

        <span>
          <strong>{{ remaining }}</strong>
          {{ remaining | pluralize('todo') }} {{ remaining | pluralize('pendiente')}}
        </span>

        <button
          class="btn btn-warning"
          v-show="todos.length > remaining"
          @click="clearCompleted"
        >
          Limpiar todos completados
        </button>

      </footer>

    </section>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import Todo from './Todo.vue'

  const filters = {
    todos: todos => todos,
    activos: todos => todos.filter(todo => !todo.done),
    completados: todos => todos.filter(todo => todo.done)
  }

  export default {
    name: 'todos',
    components: { Todo },
    data () {
      return {
        visibility: 'todos',
        filters
      }
    },
    computed: {
      todos () {
        return this.$store.state.todoModule.todos
      },
      allChecked () {
        return this.todos.every(todo => todo.done)
      },
      filteredTodos () {
        return filters[this.visibility](this.todos)
      },
      remaining () {
        return this.todos.filter(todo => !todo.done).length
      }
    },
    methods: {
      addTodo (e) {
        var text = e.target.value
        if (text.trim()) {
          this.$store.commit('addTodo', {text})
        }
        e.target.value = ''
      },
      ...mapMutations([
        'toggleAll',
        'clearCompleted'
      ])
    },
    filters: {
      pluralize: (n, s) => n === 1 ? s : (s + 's'),
      capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
    }
  }
</script>

<style scoped>
  .selected {
    border: 2px solid #111;
  }
</style>
