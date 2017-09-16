<template>
  <div id="add-post" class="col-md-12">
    <div class="alert alert-danger" v-if="error">
      Error on form process
    </div>

    <post-form
      v-bind:post="post"
      v-on:goToBack="goToBack()"
      v-on:submitPost="addPost()"
      v-bind:submitText="'Create Post'"
      v-bind:goToBackText="'Return list'"
      />
  </div>
</template>

<script>
  import PostForm from '@/components/posts/PostForm'
  import { mapActions } from 'vuex'

  export default {
    name: 'add-post',
    components: { PostForm },
    data () {
      return {
        error: false,
        post: {
          title: '',
          body: ''
        }
      }
    },
    methods: {
      ...mapActions([ 'add_post' ]),

      addPost () {
        this.add_post({ post: this.post })
        .then(res => {
          this.$router.push(`/posts/${res.body._id}`)
        }, error => {
          console.log(error)
        })
      },

      goToBack () {
        this.$router.push('/')
      }
    }
  }
</script>
