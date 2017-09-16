import Vue from 'vue'
import App from './App'
import router from './router'

import loginModule from './modules/auth'
import postModule from './modules/posts'

import * as types from './mutation_types'

import moment from 'moment'

import Vuex from 'vuex'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    pending: false
  },
  mutations: {
    [types.PENDING] (state) {
      state.pending = true
    },
    [types.NOT_PENDING] (state) {
      state.pending = false
    }
  },
  modules: {
    loginModule,
    postModule
  }
})

import VueResource from 'vue-resource'
Vue.use(VueResource)

Vue.http.interceptors.push(function (request, next) {
  request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('_token'))
  next()
})

Vue.http.options.root = 'http://localhost:3000'

import VeeValidate, {Validator} from 'vee-validate'
import messages from 'vee-validate/dist/locale/es'
Vue.use(VeeValidate)
Validator.updateDictionary({
  es: {
    messages,
    attributes: {
      username: 'nombre de usuario',
      password: 'contraseña',
      password_confirmation: 'confirmación de password',
      title: 'título',
      body: 'contenido del post',
      comment: 'comentario'
    }
  }
})

Vue.filter('formatDate', (value) => {
  return moment(value).format('DD-MM-YYYY hh:m:s')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  mounted () {
    this.$validator.setLocale('es')
  }
})
