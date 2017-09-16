<template>
  <div class="profile">
    <h1 class="text-center text-muted">
      <u>Perfil del usuario</u>
    </h1>

    <div class="well" style="word-wrap: break-word">
      <p>Id: {{ user._id}}</p>
      <p>Username: {{ user.username}}</p>
      <p>Token: {{ token}}</p>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'profile',
    computed: {
      ...mapGetters([
        'user'
      ]),
      token () {
        return window.localStorage.getItem('_token')
      }
    }
  }
</script>
