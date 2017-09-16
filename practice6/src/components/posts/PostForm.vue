<template>
  <div id="post-form">
    <form
      autocomplete="off"
      class="form-horizontal"
      @submit.prevent="validateBeforeSubmit"
      >

      <div class="form-group">
        <label class="control-label col-md-2" for="title">Title</label>

        <div class="col-md-10" :class="{ 'has-error' : errors.has('title') }">
          <input
            type="text"
            id="title"
            name="title"
            v-model="post.title"
            v-validate
            data-vv-rules="required|min:10"
            class="form-control"
            :class="{ 'has-error' : errors.has('title') }"
          />

          <span v-show="errors.has('title')" class="text-danger">{{ errors.first('title') }}</span>
        </div>
      </div>

      <div class="form-group">
        <label class="control-label col-md-2" for="body">Body</label>

        <div class="col-md-10" :class="{ 'has-error' : errors.has('body') }">
          <textarea
            id="body"
            name="body"
            v-model="post.body"
            v-validate
            data-vv-rules="required|min:10"
            class="form-control"
            :class="{ 'has-error' : errors.has('body') }"
            rows="10"
          ></textarea>

          <span v-show="errors.has('body')" class="text-danger">{{ errors.first('body') }}</span>
        </div>
      </div>

      <button class="btn btn-success btn-block" type="submit">{{ submitText }}</button>
      <button class="btn btn-info btn-block" @click="$emit('goToBack')">{{ goToBackText }}</button>

      <hr />

    </form>
  </div>
</template>

<script>
  export default {
    name: 'post-form',
    props: ['post', 'submitText', 'goToBackText'],
    methods: {
      validateBeforeSubmit () {
        this.$validator.validateAll()
        .then(result => {
          if (!result) {} else {
            this.$emit('submitPost')
          }
        })
      }
    }
  }
</script>
