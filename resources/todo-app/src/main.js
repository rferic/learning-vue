// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import Vuex from 'vuex'
Vue.use(Vuex)

import todoModule from './modules/Todo'

const store = new Vuex.Store({
  modules: {
    todoModule
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
