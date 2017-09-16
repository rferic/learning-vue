<template>
  <div class="register col-md-6 col-md-offset-3">
    <h1 class="text-center text-muted">
      <u>Register session</u>
    </h1>

    <div class="alert alert-danger" v-if="error">
      {{ errorServer }}
    </div>

    <div class="alert alert-success" v-if="success">
      {{ successMessage }}
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

      <!-- TODO (VeeValidate) dd-vv-as => Alias -->
      <div class="form-group">
        <label class="control-label col-md-2" for="password">Password</label>
        <div class="col-md-10" :class="{ 'has-error' : errors.has('password') }">
          <!--
          TODO (VeeValidate) v-validate => Validate form (required)
          TODO (VeeValidate) data-vv-rules => Rules for validate
          TODO (VeeValidate) confirmed:{input} => match inputs
          -->
          <input
            id="username"
            name="password"
            type="password"
            v-model="password"
            v-validate
            data-vv-rules="required|min:6|confirmed:password_confirmation"
            class="form-control"
            :class="{ 'has-error' : errors.has('password') }"
            autocomplete="off"
            placeholder="Password"
          />

          <span v-show="errors.has('password')" class="text-danger">{{ errors.first('password') }}</span>
        </div>
      </div>

      <div class="form-group">
        <label class="control-label col-md-2" for="password_confirmation">Password confirmation</label>
        <div class="col-md-10" :class="{ 'has-error' : errors.has('password_confirmation') }">
          <input
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            v-model="password_confirmation"
            v-validate
            data-vv-rules="required|min:6"
            data-vv-as="Confirm password"
            class="form-control"
            :class="{ 'has-error' : errors.has('password_confirmation') }"
            autocomplete="off"
            placeholder="Password confirmation"
          />

          <span v-show="errors.has('password_confirmation')" class="text-danger">{{ errors.first('password_confirmation') }}</span>
        </div>
      </div>

      <hr />

      <button type="submit" class="btn btn-success btn-block">Register user</button>
    </form>

  </div>
</template>

<script>
  const errorServerDefault = 'Error server'
  const defaultSuccessMessage = 'OK'

  export default {
    name: 'register',
    data () {
      return {
        username: '',
        password: '',
        password_confirmation: '',
        error: false,
        errorServer: errorServerDefault,
        success: false,
        successMessage: ''
      }
    },
    methods: {
      validateBeforeSubmit () {
        this.$validator.validateAll()
        .then(result => {
          if (!result) {

          } else {
            this.$store.dispatch('register', {
              username: this.username,
              password: this.password
            })
            .then(res => {
              console.log(res)
              this.success = true

              this.successMessage = res.body ? res.body : defaultSuccessMessage
            }, error => {
              console.log(error)
              this.error = true

              this.errorServer = error.body ? error.body : errorServerDefault
            })
            .catch(error => {
              console.log(error.msg)
            })
          }
        })
      }
    }
  }
</script>
