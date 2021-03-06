import Vue from 'vue'
import * as types from '../mutation_types'

const moduleLogin = {
  state: {
    isLoggedIn: !!localStorage.getItem('_token'),
    user: null
  },
  // TODO Actions => Asynchronous (NO MUTATIONS!!!)
  actions: {
    register ({ commit }, user) {
      // TODO Call Mutation: State Pending Response Request
      commit(types.PENDING)

      // TODO Promise === Wait response
      return new Promise((resolve, reject) => {
        // TODO Run Request
        Vue.http.post('register', user)
        .then(res => {
          // TODO Call Mutation: State Not Pending Response Request (Has been returned)
          commit(types.NOT_PENDING)
          resolve(res)
        }, error => {
          commit(types.NOT_PENDING)
          reject(error)
        })
      })
    },

    login ({ commit }, user) {
      commit(types.PENDING)

      return new Promise((resolve, reject) => {
        Vue.http.post('login', user)
        .then(res => {
          commit(types.LOGIN_SUCCESS)
          commit(types.NOT_PENDING)
          resolve(res)
        },
        error => {
          commit(types.NOT_PENDING)
          reject(error)
        })
      })
    },

    logout ({ commit }) {
      localStorage.removeItem('_token')
      // TODO Call Mutation:
      commit(types.LOGOUT)
    }
  },
  mutations: {
    // TODO Define Mutations from variables Mutations Types)
    [types.LOGIN_SUCCESS] (state) {
      state.isLoggedIn = true
    },
    [types.LOGOUT] (state) {
      state.isLoggedIn = false
    },
    [types.SET_USER] (state) {
      var jwtDecode = require('jwt-decode')

      state.user = jwtDecode(localStorage.getItem('_token'))
    }
  },
  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn
    },
    user: state => {
      return state.user
    }
  }
}

export default moduleLogin
