<template>
  <div class="col-md-6 col-md-offset-3" id="register">

    <h1 class="text-center text-muted">
      <u>Formulario de registro</u>
    </h1>

    <div class="alert alert-danger" v-if="error">
      Error procesando el formulario
    </div>

    <div class="alert alert-success" v-if="success">
      Te has registrado correctamente
    </div>

    <form
      autocomplete="off"
      class="form-horizontal"
      @submit.prevent="validateBeforeSubmit"
    >

      <div class="form-group">

        <label
          class="control-label col-md-2"
          for="username"
        >
          Username
        </label>

        <div
          class="col-md-10"
          :class="{ 'has-error' : errors.has('username') }"
        >
          <input
            autocomplete="off"
            name="username"
            v-model="username"
            data-vv-delay="100"
            v-validate
            data-vv-rules="required|min:2"
            class="form-control"
            type="text"
            id="username"
            placeholder="Nombre de usuario"
            :class="{ 'has-error': errors.has('username') }"
          >
          <span
            v-show="errors.has('username')"
            class="text-danger"
          >
            {{ errors.first('username') }}
          </span>
        </div>
      </div>

      <div class="form-group">

        <label
          class="control-label col-md-2"
          for="password"
        >
          Password
        </label>

        <div
          class="col-md-10"
          :class="{ 'has-error' : errors.has('password') }"
        >

          <input
            name="password"
            id="password"
            v-model="password"
            v-validate
            data-vv-rules="required|min:6|confirmed:password_confirmation"
            class="form-control"
            type="password"
            placeholder="Password"
            :class="{ 'has-error': errors.has('password') }"
          >

          <span
            v-show="errors.has('password')"
            class="text-danger"
          >
            {{ errors.first('password') }}
          </span>
        </div>
      </div>

      <div class="form-group">
        <label
          class="control-label col-md-2"
          for="password_confirmation"
        >
          Password Confirmed
        </label>

        <div
          class="col-md-10"
          :class="{ 'has-error' : errors.has('password_confirmation') }"
        >
          <input
            name="password_confirmation"
            id="password_confirmation"
            v-model="password_confirmation"
            v-validate
            data-vv-rules="required|min:6"
            class="form-control"
            type="password"
            placeholder="Confirm Password"
            data-vv-as="Confirm Password"
            :class="{ 'has-error': errors.has('password_confirmation') }"
          >
          <span
            v-show="errors.has('password_confirmation')"
            class="text-danger"
          >
            {{ errors.first('password_confirmation') }}
          </span>

        </div>
      </div>

      <a class="btn btn-success btn-block" @click="validateBeforeSubmit">
        Registro
      </a>
      <hr/>
      <!--<pre>{{ errors }}</pre>
      <pre>{{ fields }}</pre>-->
    </form>

  </div>
</template>

<script>
  export default {
    name: 'register',
    data () {
      return {
        username: '',
        password: '',
        password_confirmation: '',
        error: false,
        success: false
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
            this.$store.dispatch('register', {
              username: this.username,
              password: this.password
            })
            .then(res => {
              this.success = true
            }, err => {
              console.log(err)
              this.error = true
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

