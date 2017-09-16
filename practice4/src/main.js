// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// TODO Import Vuex
import Vuex from 'vuex'

// TODO Use Vuex
Vue.use(Vuex)

// TODO Store Data Vuex
const store = new Vuex.Store({

  // TODO Set Data in Store Vuex
  state: {
    count: 0
  },

  // TODO Mutation Vuex (Modify state Vuex)
  mutations: {

    // TODO Pass State & Params (Vuex)
    increment (state, payload = 1) {
      state.count += payload
    },
    decrement (state, payload = 1) {
      state.count -= payload
    }
  },

  // TODO Getters Vuex
  getters: {
    count (state, getters) {
      return state.count
    }
  }
})

// TODO COMMIT => Run Mutation Vuex (Example without Vue)
store.commit('increment')
store.commit('decrement')
store.commit('increment')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // TODO Add Store Vuex
  // TODO store, === store: store (Same Name)
  store,
  template: '<App/>',
  components: { App }
})
