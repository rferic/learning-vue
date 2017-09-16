<template>
  <div class="col-md-12" id="add-post">
    <div class="alert alert-danger" v-if="error">
      Error procesando el formulario
    </div>

    <post-form
      v-bind:post="post"
      v-bind:submitText="'Crear Post'"
      v-bind:goBackText="'Volver al listado'"
      v-on:goBack="goBack()"
      v-on:submitPost="addPost()"
    />

  </div>
</template>

<script>
  import PostForm from './PostForm.vue'
  import {mapActions} from 'vuex'
  export default {
    name: 'add-post',
    components: {
      PostForm
    },
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
      ...mapActions([
        'add_post'
      ]),
      addPost () {
        this.add_post({post: this.post})
        .then(res => {
          this.$router.push(`/post/${res.data._id}`)
        }, err => {
          console.log(err)
        })
      },
      goBack () {
        this.$router.push('/')
      }
    }
  }
</script>
