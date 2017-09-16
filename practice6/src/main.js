// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import loginModule from './modules/auth'
import postsModule from './modules/posts'
import * as types from './mutation_types'
import moment from 'moment'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
// TODO Import VeeValidate
import VeeValidate, {Validator} from 'vee-validate'
import messages from 'vee-validate/dist/locale/es'

Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(VeeValidate)

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
    postsModule
  }
})

Vue.http.interceptors.push(function (request, next) {
  // TODO Add token on request
  request.headers.set('Authorization', 'Bearer ' + localStorage.getItem('_token'))
  next()
})

// TODO Source Request
Vue.http.options.root = 'http://localhost:3000'

// TODO VeeValidate
Validator.updateDictionary({
  en: {
    messages,
    attributes: {
      // TODO Translates
      username: 'Username',
      password: 'Password',
      password_confirmation: 'Password confirmation',
      title: 'Title',
      comment: 'Comment'
    }
  }
})

// TODO Date Filter
Vue.filter('formatDate', (value) => {
  return moment(value).format('DD-MM-YY hh:mm:s')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  mounted () {
    // TODO Lang Default (Validate)
    this.$validator.setLocale('en')
  }
})
