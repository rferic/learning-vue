<template>
  <div class="col-md-6 col-md-offset-3">

    <div class="alert alert-danger" v-if="error">
      Error form process
    </div>

    <form autocomplete="off" class="form-horizontal" @submit.prevent="validateBeforeSubmit" >

      <div class="form-group">
        <label class="control-label col-md-2" for="comment">Comment</label>
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
          <span v-show="errors.has('comment')" class="text-danger" >{{ errors.first('comment') }}</span>
        </div>
      </div>

      <button class="btn btn-success btn-block" type="submit" >Add comment</button>

      <hr/>
    </form>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

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
      ...mapActions([ 'add_comment' ]),

      validateBeforeSubmit () {
        this.$validator.validateAll()
        .then(res => {
          if (!res) {

          } else {
            this.add_comment({
              post: this.post,
              comment: this.comment
            })
            .then(res => {
              this.comment = ''
            }, error => {
              console.log(error)
            })
            .then(() => {
              // TODO Clear errors form
              setTimeout(() => {
                this.errors.clear()
              }, 10)
            })
          }
        }, error => {
          console.log(error)
        })
      }
    }
  }
</script>
