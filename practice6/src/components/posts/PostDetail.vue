<template>
  <div id="post-detail">
    <div v-if="post">

      <single-post
        v-bind:post="post"
        v-bind:isDetail="true"
      />

      <comments-form v-bind:post="post" />

      <div class="clearfix"></div>

      <div class="text-center text-muted">Comments</div>

      <div v-if="post.comments.length">

        <single-comment
          v-for="comment in post.comments"
          v-bind:comment="comment"
          :key="comment._id"
        />

      </div>

      <div v-else class="text-info text-center">
        No comments
      </div>

    </div>
  </div>
</template>

<script>
  import SinglePost from '@/components/posts/SinglePost'
  import SingleComment from '@/components/comments/SingleComment'
  import CommentsForm from '@/components/comments/CommentsForm'
  import * as types from '@/mutation_types'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'post-detail',
    components: {
      SinglePost,
      SingleComment,
      CommentsForm
    },
    computed: {
      ...mapGetters([ 'postsLength', 'findPost' ]),

      post () {
        return this.$store.state.postsModule.current_post
      }
    },
    methods: {
      ...mapActions([ 'get_post' ])
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
