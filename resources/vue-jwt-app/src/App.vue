<template>
  <div>
    <nav-is-logged v-if="isLoggedIn"></nav-is-logged>

    <nav-not-is-logged v-if="!isLoggedIn"></nav-not-is-logged>

    <div class="text-center" v-if="$store.state.pending">
      <img src="/static/img/preloader.gif" />
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import NavIsLogged from './components/NavIsLogged.vue'
import NavNotIsLogged from './components/NavNotIsLogged.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  components: {
    NavIsLogged, NavNotIsLogged
  },
  computed: {
    ...mapGetters([
      'isLoggedIn'
    ])
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
