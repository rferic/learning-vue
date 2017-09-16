<template>
  <div id="todo" class="text-center">
    <section class="todoapp">
      <header class="header">
        <h2>Todos</h2>
        <input class="form-control" autofocus autocomplete="off" placeholde="Task?" @keyup.enter="addTodo" />
      </header>
      <section v-show="todos.length">
        <hr />
        <div class="col-md-8 col-md-offset-2">
          <span class="col-md-4" v-for="(val, key) in filters">
            <a :class="{'selected': visibility === key }" class="btn btn-info" @click="visibility = key">
              {{ key | capitalize }}
            </a>
          </span>
        </div>

        <hr />

        <input class="toggleAll" type="checkbox" :checked="allChecked" @change="toggleAllTodos({done: !allChecked})" />

        <hr />

        <ul>
          <todo v-for="(todo, key) in filteredTodos" :todo="todo" :key="key"></todo>
        </ul>
      </section>

      <footer class="footer" v-show="todos.length">
        <span>
          <strong>{{ remaining }}</strong>
          {{ remaining | pluralize('todo') }} {{ remaining | pluralize('pending') }}
        </span>

        <button class="btn btn-warning" v-show="todos.length > remaining" @click="clearCompletedTodos">Clear Completed Todos</button>
      </footer>

    </section>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import Todo from './Todo.vue'

  const filters = {
    todos: todos => todos,
    actives: todos => todos.filter(todo => !todo.done),
    completes: todos => todos.filter(todo => todo.done)
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
        // TODO Access to stroe -> module -> property
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
      addTodo (ev) {
        var text = ev.target.value

        if (text.trim()) {
          this.$store.commit('addTodo', { text })
        }

        ev.target.value = ''
      },
      ...mapMutations(['toggleAllTodos', 'clearCompletedTodos'])
    },
    filters: {
      pluralize: (n, s) => n === 1 ? s : (s + 's'),
      capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
    }
  }
</script>

<style scoped>

  .selected{
    border: 2px solid #111;
  }

</style>
