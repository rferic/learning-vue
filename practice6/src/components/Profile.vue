<template>
  <div class="profile">
    <h1 class="text-center text-muted">
      <u>User Profile</u>
    </h1>

    <div class="well" style="word-wrap: break-word;">
      <p>
        ID: {{ user._id }}
      </p>
      <p>
        Username: {{ user.username }}
      </p>
      <p>
        Token: {{ token }}
      </p>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'profile',
    computed: {
      ...mapGetters([ 'user' ]),

      token () {
        return window.localStorage.getItem('_token')
      }
    }
  }
</script>
