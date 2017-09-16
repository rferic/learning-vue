<template>
  <div class="home">
    <h1 class="text-center text-muted">Post list</h1>

    <div class="row">
      <div class="form-group col-xs-12">
        <label for="search">Search</label>

        <input
          v-model="search"
          id="search"
          name="search"
          type="text"
          class="form-control"
        />
      </div>
    </div>

    <button @click="addPost()" class="pull-right btn btn-sm btn-success">Create Post</button>

    <div class="clearfix"></div>

    <hr />

    <div v-if="postsLength">
      <post v-for="post_data in filteredPosts" v-bind:post="post_data" key="post_data._id"></post>
    </div>

    <div v-else class="alert alert-danger">
      Posts not found
    </div>

  </div>
</template>

<script>
  import Post from '@/components/posts/SinglePost'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'home',
    components: {
      Post
    },
    data () {
      return {
        search: ''
      }
    },
    computed: {
      ...mapGetters([ 'postsLength' ]),

      filteredPosts () {
        console.log(this.$store)
        return this.$store.getters.filteredPosts(this.search)
      }
    },
    methods: {
      ...mapActions([ 'get_posts' ]),

      addPost () {
        this.$router.push('/posts/add')
      }
    },
    mounted () {
      this.get_posts()
    }
  }
</script>
