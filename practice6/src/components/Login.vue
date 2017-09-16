<template>
  <div class="login col-md-6 col-md-offset-3">
    <h1 class="text-center text-muted">
      <u>Login session</u>
    </h1>

    <div class="alert alert-danger" v-if="error">
      {{ errorServer }}
    </div>

    <hr />

    <form autocomplete="off" class="form-horizontal" @submit.prevent="validateBeforeSubmit" >
      <div class="form-group">
        <label class="control-label col-md-2" for="username">Username</label>
        <div class="col-md-10" :class="{ 'has-error' : errors.has('username') }">
          <!--
          TODO (VeeValidate) v-validate => Validate form (required)
          TODO (VeeValidate) data-vv-rules => Rules for validate
          -->
          <input
            id="username"
            name="username"
            type="text"
            v-model="username"
            v-validate
            data-vv-rules="required|min:2"
            class="form-control"
            :class="{ 'has-error' : errors.has('username') }"
            autocomplete="off"
            placeholder="Username"
          />

          <span v-show="errors.has('username')" class="text-danger">{{ errors.first('username') }}</span>
        </div>
      </div>

      <div class="form-group">
        <label class="control-label col-md-2" for="password">Password</label>
        <div class="col-md-10" :class="{ 'has-error' : errors.has('password') }">
          <!--
          TODO (VeeValidate) v-validate => Validate form (required)
          TODO (VeeValidate) data-vv-rules => Rules for validate
          -->
          <input
            id="password"
            name="password"
            type="password"
            v-model="password"
            v-validate
            data-vv-rules="required|min:6"
            class="form-control"
            :class="{ 'has-error' : errors.has('password') }"
            autocomplete="off"
            placeholder="Password"
          />

          <span v-show="errors.has('password')" class="text-danger">{{ errors.first('password') }}</span>
        </div>
      </div>

      <hr />

      <button type="submit" class="btn btn-success btn-block">Login session</button>
    </form>
  </div>
</template>

<script>
  import * as types from '@/mutation_types'

  const errorServerDefault = 'Error server'

  export default {
    name: 'login',
    data () {
      return {
        username: '',
        password: '',
        error: false,
        errorServer: errorServerDefault
      }
    },
    methods: {
      validateBeforeSubmit () {
        // TODO (VeeValidate) Method validate form
        this.$validator.validateAll()
        .then(result => {
          if (!result) {
          } else {
            // TODO Call method Module
            // TODO Return Promise
            this.$store.dispatch('login', {
              username: this.username,
              password: this.password
            })
            .then(res => {
              localStorage.setItem('_token', res.data)
              // TODO Call Mutation Store
              this.$store.commit(types.SET_USER)
              this.$router.push('/')
            }, error => {
              console.log(error)
              this.error = true

              if (error.body) {
                this.errorServer = error.body
              } else {
                this.errorServer = errorServerDefault
              }
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
