<template>
  <div id="post-edit" class="col-md-12">
    <div class="alert alert-danger" v-if="error">
      Error form process
    </div>

    <post-form
      v-if="post"
      v-bind:post="post"
      v-on:goToBack="goToBack()"
      v-on:submitPost="updatePost()"
      v-bind:submitText="'Update post'"
      v-bind:goToBackText="'Return'"
    />

  </div>
</template>

<script>
  import PostForm from '@/components/posts/PostForm'
  import * as types from '@/mutation_types'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'post-edit',
    components: { PostForm },
    data () {
      return {
        error: false
      }
    },

    computed: {
      ...mapGetters([ 'postsLength', 'findPost' ]),

      post () {
        return this.$store.state.postsModule.current_post
      }
    },

    methods: {
      ...mapActions([ 'get_post', 'update_post' ]),

      updatePost () {
        this.update_post({ post: this.post })
        .then(res => {
          this.$router.push(`/posts/${this.post._id}`)
        }, error => {
          console.log(error)
          this.error = true
        })
      },

      goToBack () {
        this.$router.push(`/posts/${this.post._id}`)
      }
    },

    mounted () {
      if (this.postsLength > 0) {
        var post = this.findPost(this.$route.params.id)
        this.$store.commit(types.SET_POST, post[0])
      } else {
        this.get_post(this.$route.params.id)
        .then(res => {
          console.log(res)
        }, error => {
          console.log(error)
        })
      }
    }
  }
</script>
