<!-- TODO Todo Component -->
<template>
  <!-- TODO :class => dynamic class -->
  <li class="todo" :class="{'label-default': todo.done, 'editing': editing}">
    <div>
      <!-- TODO :checked="{condition}" => checked input -->
      <input class="toggle" type="checkbox" :checked="todo.done" @change="toggleTodo({todo: todo})" />
      <!-- TODO @{event} = "modify property" -->
      <label v-text="todo.text" @dbclick="editing = true"></label>

      <button class="btn btn-xs btn-danger" @click="deleteTodo({todo: todo})">Remove</button>
    </div>
    <!-- TODO
    v-show="{boolean}" => Show / Hide
    @keyup.{key}={callBack} => When {key} detect event keyup
    @blur="{callback}" => When lost focus
  -->
  <input class="edit form-control" v-show="editing" :value="todo.text" @keyup.enter="doneEdit" @keyup.esc="cancelEdit" @blur="doneEdit" />

</li>
</template>

<script>
  // TODO Import Mutations Vuex
  import {mapMutations} from 'vuex'

  export default {
    name: 'todo',
    props: ['todo'],
    data () {
      return {
        editing: false
      }
    },
    methods: {
      ...mapMutations(['editTodo', 'toggleTodo', 'deleteTodo']),
      doneEdit (ev) {
        const value = ev.target.value.trim()
        const { todo } = this
        let { editing } = this

        if (!value) {
          this.deleteTodo({ todo })
        } else if (editing) {
          this.editTodo({ todo, value })
          editing = false
        }
      },
      cancelEdit (ev) {
        ev.target.value = this.todo.text
        this.editing = false
      }
    }
  }
</script>
