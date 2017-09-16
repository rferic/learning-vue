import Vue from 'vue'
import * as types from '../mutation_types'

const modulePosts = {
  state: {
    posts: [],
    current_post: null
  },
  actions: {
    get_posts ({ commit }) {
      commit(types.PENDING)
      return new Promise((resolve, reject) => {
        Vue.http.get('posts')
        .then(res => {
          commit(types.SET_POSTS, res)
          commit(types.NOT_PENDING)
          resolve(res)
        }, error => {
          reject(error)
        })
      })
    },
    get_post ({ commit }, _id) {
      commit(types.PENDING) // show spinner
      return new Promise((resolve, reject) => {
        Vue.http.get(`posts/${_id}`)
        .then(res => {
          commit(types.SET_POST, res.data)
          commit(types.NOT_PENDING)
          resolve(res)
        },
        error => {
          reject(error)
        })
      })
    },
    add_comment ({ commit }, data) {
      commit(types.PENDING) // show spinner
      return new Promise((resolve, reject) => {
        Vue.http.post(`posts/${data.post._id}/comment`, {post: data.post, comment: data.comment})
        .then(res => {
          commit(types.SET_POST, res.data)
          commit(types.NOT_PENDING)
          resolve(res)
        },
        error => {
          reject(error)
        })
      })
    },
    update_post ({ commit }, data) {
      commit(types.PENDING) // show spinner
      return new Promise((resolve, reject) => {
        Vue.http.put(`posts/${data.post._id}`, {post: data.post})
        .then(res => {
          commit(types.NOT_PENDING)
          resolve(res)
        },
        error => {
          reject(error)
        })
      })
    },
    add_post ({ commit }, data) {
      commit(types.PENDING) // show spinner
      return new Promise((resolve, reject) => {
        Vue.http.post('posts', {post: data.post})
        .then(res => {
          commit(types.NOT_PENDING)
          commit(types.PUSH_POST, res.data)
          resolve(res)
        },
        error => {
          reject(error)
        })
      })
    },
    delete_post ({ commit }, _id) {
      commit(types.PENDING) // show spinner
      return new Promise((resolve, reject) => {
        Vue.http.delete(`posts/${_id}`)
        .then(res => {
          commit(types.SPLICE_POST, _id)
          commit(types.NOT_PENDING)
          resolve(res)
        },
        error => {
          reject(error)
        })
      })
    }
  },
  mutations: {
    [types.SET_POSTS]: (state, response) => {
      state.posts = response.data
    },
    [types.SET_POST]: (state, response) => {
      state.current_post = response
    },
    [types.PUSH_POST]: (state, response) => {
      state.posts.push(response)
    },
    [types.SPLICE_POST]: (state, _id) => {
      state.posts = state.posts.filter(post => post._id !== _id)
    }
  },
  getters: {
    filteredPosts: (state, getters) => (search) => {
      return state.posts.filter(post => {
        return post.title.toLowerCase().indexOf(search) > -1
      })
    },

    findPost: (state, getters) => (id) => {
      console.log(id)
      return state.posts.filter(post => {
        return post._id === id
      })
    },

    postsLength: (state, getters) => {
      return state.posts.length
    }
  }
}

export default modulePosts
