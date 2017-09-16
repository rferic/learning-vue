<template>
  <div class="col-md-6 col-md-offset-3 well">
    <input class="form-control text-center" type="text" v-model="total" />
    <hr />
    <button class="btn btn-block btn-info" @click="increment">Increment</button>

    <h4 class="text-center">Counter: {{ count }}</h4>

    <button class="btn btn-block btn-danger" @click="decrement">Decrement</button>
  </div>
</template>

<script>
    // TODO Import for use Getters Vuex
    import {mapGetters} from 'vuex'

    export default {
      name: 'counter',
      data () {
        return {
          total: 1
        }
      },
      methods: {
        increment () {
          // TODO $store.commit({mutation}, {params}) => Access to Mutation Vuex from Vue Component
          this.$store.commit('increment', parseInt(this.total))
        },
        decrement () {
          this.$store.commit('decrement', parseInt(this.total))
        }
      },
      computed: {
        // TODO Mapping Getters Vuex
        ...mapGetters(['count'])
        /*
        count () {
          // TODO $store.state.{param} => Set to Mutation Vuex from Vue Component
          return this.$store.state.count
        }
        */
      }
    }
</script>
