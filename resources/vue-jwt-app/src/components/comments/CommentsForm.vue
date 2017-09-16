<template>
  <div class="col-md-6 col-md-offset-3">

    <div class="alert alert-danger" v-if="error">
      Error procesando el formulario
    </div>

    <form
      autocomplete="off"
      class="form-horizontal"
      @submit.prevent="validateBeforeSubmit"
    >

      <div class="form-group">
        <label class="control-label col-md-2" for="comment">Comentario</label>
        <div class="col-md-10" :class="{ 'has-error' : errors.has('comment') }">
          <textarea
            name="comment"
            id="comment"
            v-model="comment"
            v-validate
            data-vv-rules="required|min:10"
            class="form-control"
            :class="{ 'has-error': errors.has('comment') }"
          ></textarea>
          <span
            v-show="errors.has('comment')"
            class="text-danger"
          >
            {{ errors.first('comment') }}
          </span>
        </div>
      </div>

      <button
        class="btn btn-success btn-block"
        type="submit"
      >
        Añadir comentario
      </button>

      <hr/>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'comments-form',
    props: ['post'],
    data () {
      return {
        comment: '',
        error: false
      }
    },
    methods: {
      validateBeforeSubmit () {
        this.$validator.validateAll()
        .then(result => {
          if (!result) {
            /* error */
          } else {
            /* success */
            this.$store.dispatch('add_comment', {
              post: this.post, comment: this.comment
            })
            .then(res => {
              this.comment = ''
            })
            .then(() => {
              setTimeout(() => {
                this.errors.clear()
              }, 10)
            })
          }
        })
        .catch(error => {
          console.log(error.msg)
        })
      }
    }
  }
</script>
