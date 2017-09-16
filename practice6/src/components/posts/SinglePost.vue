<template>
  <div class="single-post col-md-10 col-md-offset-1">
    <h2>{{ post.title }}</h2>

    <p>
      by <a href="#">{{ post.postedBy.username }}</a>
    </p>

    <hr />

    <p>
      <span class="glyphicon glyphicon-time">
        Publish {{ post.date | formatDate }}
      </span>
    </p>

    <hr />

    <p class="excerpt">
      {{ excerpt }}
      <br />
      <div class="pull-right" v-if="!isDetail">
        <button
          @click="goToDetail(post)"
          class="btn btn-sm btn-info"
        >
          Go to detail
        </button>

        <button
          @click="goToEdit(post)"
          class="btn btn-sm btn-warning"
          v-if="$store.state.loginModule.user._id === post.postedBy._id"
        >
          Edit post
        </button>

        <button
          @click="remove(post.id)"
          class="btn btn-sm btn-danger"
          v-if="$store.state.loginModule.user._id === post.postedBy._id"
        >
          Remove post
        </button>
      </div>

      <div class="pull-right" v-else>
        <button
          @click="goToEdit(post)"
          class="btn btn-sm btn-warning"
          v-if="$store.state.loginModule.user._id === post.postedBy._id"
        >
          Edit post
        </button>
      </div>

    </p>
    <div class="clearfix"></div>
    <hr />
  </div>
</template>

<script>
  export default {
    props: ['post', 'isDetail'],
    computed: {
      excerpt () {
        return !this.isDetail ? `${this.post.body.substr(0, 200)} ...` : this.post.body
      }
    },
    methods: {
      goToDetail (post) {
        this.$router.push(`/posts/${post._id}`)
      },
      goToEdit (post) {
        this.$router.push(`/posts/${post._id}/edit`)
      },
      remove (id) {
        this.$store.dispatch('delete_post', id)
        .then(res => {
          console.log(res)
        }, error => {
          console.log(error)
        })
      }
    }
  }
</script>
