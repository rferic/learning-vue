<template>
  <div id="post-detail">
    <div v-if="post">

      <single-post
        v-bind:post="post"
        v-bind:isDetail="true"
      />

      <comments-form v-bind:post="post" />

      <div class="clearfix"></div>

      <div class="text-center text-muted">Comentarios</div>

      <div v-if="post.comments.length">

        <single-comment
          v-for="comment in post.comments"
          v-bind:comment="comment"
          :key="comment.id"
        />

      </div>

      <div v-else class="text-info text-center">
        Sin comentarios
      </div>

    </div>
  </div>
</template>

<script>
  import SinglePost from './SinglePost.vue'
  import SingleComment from '../comments/SingleComment.vue'
  import CommentsForm from '../comments/CommentsForm.vue'
  export default {
    name: 'post-detail',
    components: {
      SinglePost, SingleComment, CommentsForm
    },
    mounted () {
      if (this.$store.state.postModule.posts.length > 0) {
        var post = this.$store.getters.findPost(this.$route.params.id)
        this.$store.commit('SET_POST', post[0])
      } else {
        this.$store.dispatch('get_post', this.$route.params.id)
        .then(res => {
          console.log(res)
        })
      }
    },
    computed: {
      post () {
        return this.$store.state.postModule.current_post
      }
    }
  }
</script>
