<template>
  <div class="single-post col-md-10 col-md-offset-1">

    <h2>{{ post.title }}</h2>

    <p>
      por <a href="#">{{ post.postedBy.username }}</a>
    </p>

    <hr />

    <p>
      <span class="glyphicon glyphicon-time"></span>
      Publicado en {{ post.date | formatDate }}
    </p>

    <hr />

    <p class="excerpt">
      {{ excerpt }}

      <br />

      <div class="pull-right" v-if="!isDetail">

        <button
          @click="goDetail(post)"
          class="btn btn-sm btn-info"
        >
          Ir al detalle
        </button>

        <button
          @click="goEdit(post)"
          class="btn btn-sm btn-warning"
          v-if="$store.state.loginModule.user._id === post.postedBy._id"
        >
          Editar el post
        </button>

        <button
          @click="remove(post._id)"
          class="btn btn-sm btn-danger"
          v-if="$store.state.loginModule.user._id === post.postedBy._id"
        >
          Eliminar el post
        </button>

      </div>

      <div class="pull-right" v-else>
        <button
          @click="goEdit(post)"
          class="btn btn-sm btn-warning"
          v-if="$store.state.loginModule.user._id === post.postedBy._id"
        >
          Editar el post
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
      goDetail (post) {
        this.$router.push(`/post/${post._id}`)
      },
      goEdit (post) {
        this.$router.push(`/post/${post._id}/edit`)
      },
      remove (id) {
        this.$store.dispatch('delete_post', id)
        .then(res => {
          console.log(res)
        }, err => {
          console.log(err)
        })
      }
    }
  }
</script>
