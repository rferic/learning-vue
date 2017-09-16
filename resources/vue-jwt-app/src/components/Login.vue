<template>
  <div class="login col-md-6 col-md-offset-3">
    <h1 class="text-center text-muted">
      <u>Iniciar sesión</u>
    </h1>

    <div class="alert alert-danger" v-if="error">
      Error procesando el formulario
    </div>

    <hr />

    <form
      autocomplete="off"
      class="form-horizontal"
      @submit.prevent="validateBeforeSubmit"
    >
      <div class="form-group">
        <label class="control-label col-md-2" for="username">
          Username
        </label>

        <div class="col-md-10" :class="{ 'has-error' : errors.has('username') }">
          <input
            autocomplete="off"
            name="username"
            v-model="username"
            v-validate
            data-vv-rules="required|min:2"
            class="form-control"
            type="text"
            id="username"
            placeholder="Nombre de usuario"
            :class="{ 'has-error' : errors.has('username') }"
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
        <label class="control-label col-md-2" for="password">
          Password
        </label>

        <div class="col-md-10" :class="{ 'has-error' : errors.has('password') }">
          <input
            autocomplete="off"
            name="password"
            v-model="password"
            v-validate
            data-vv-rules="required|min:6"
            class="form-control"
            type="password"
            id="password"
            placeholder="Contraseña"
            :class="{ 'has-error' : errors.has('password') }"
          >
          <span
            v-show="errors.has('password')"
            class="text-danger"
          >
            {{ errors.first('password') }}
          </span>
        </div>
      </div>

      <hr />

      <button
        type="submit"
        class="btn btn-success btn-block"
      >
        Iniciar sesión
      </button>
    </form>

  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      error: null
    }
  },
  methods: {
    validateBeforeSubmit () {
      this.$validator.validateAll()
      .then(result => {
        if (!result) {

        } else {
          this.$store.dispatch('login', {
            username: this.username,
            password: this.password
          })
          .then(res => {
            localStorage.setItem('_token', res.data)
            this.$store.commit('SET_USER')
            this.$router.push('/')
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

