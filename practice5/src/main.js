// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import todoModule from './modules/Todo'

Vue.config.productionTip = false

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    // TODO Load Module
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
