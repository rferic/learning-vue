<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">

      <div class="navbar-header">
        <button
          type="button"
          class="navbar-toggle collapsed"
          data-toggle="collapse"
          data-target="#nav-collapse"
          aria-expanded="false"
        >
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">Vue.js 2</a>
      </div>

      <div class="collapse navbar-collapse" id="nav-collapse">
        <ul class="nav navbar-nav">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/profile">Profile</router-link></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li><a @click.prevent="logout()">Logout</a></li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    methods: {
      logout () {
        this.$store.dispatch('logout')
        this.$router.go('/login')
      }
    }
  }
</script>
