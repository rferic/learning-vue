import Vue from 'vue'
import * as types from '../mutation_types'

const moduleLogin = {
  state: {
    isLoggedIn: !!localStorage.getItem('_token'),
    user: null
  },
  actions: {
    register ({ commit }, user) {
      commit(types.PENDING) // show spinner
      return new Promise((resolve, reject) => {
        Vue.http.post('register', user)
        .then(res => {
          commit(types.NOT_PENDING)
          resolve(res)
        },
        error => {
          commit(types.NOT_PENDING)
          reject(error)
        })
      })
    },
    login ({ commit }, user) {
      commit(types.PENDING) // show spinner
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
      commit(types.LOGOUT)
    }
  },
  mutations: {
    [types.LOGIN_SUCCESS] (state) {
      state.isLoggedIn = true
    },
    [types.LOGOUT] (state) {
      state.isLoggedIn = false
    },
    [types.SET_USER] (state) {
      var jwtDecode = require('jwt-decode')
      state.user = jwtDecode(window.localStorage.getItem('_token'))
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
