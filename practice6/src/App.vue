<template>
  <div id="app">
    <nav-is-logged v-if="isLoggedIn"></nav-is-logged>

    <nav-not-is-logged v-if="!isLoggedIn"></nav-not-is-logged>

    <!-- TODO Preloader for PENDING STATE -->
    <div class="text-center" v-if="$store.state.pending">
      <img src="/static/img/preloader.gif" />
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
  import NavIsLogged from './components/NavIsLogged'
  import NavNotIsLogged from './components/NavNotIsLogged'
  import { mapGetters } from 'vuex'

  export default {
    name: 'app',
    components: {
      NavIsLogged,
      NavNotIsLogged
    },
    computed: {
      ...mapGetters([ 'isLoggedIn' ])
    }
  }
</script>
