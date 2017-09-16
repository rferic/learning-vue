import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'
import AddPost from '@/components/posts/AddPost'
import PostDetail from '@/components/posts/PostDetail'
import PostEdit from '@/components/posts/PostEdit'
import Profile from '@/components/Profile'

import * as types from '../mutation_types'

Vue.use(Router)

import {store} from '../main'

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { Auth: false },
      beforeEnter: (to, from, next) => {
        if (store.state.loginModule.isLoggedIn) {
          next({ path: '/' })
        } else {
          next()
        }
      }
    },
    {
      path: '/register',
      name: Register.name,
      component: Register,
      meta: { Auth: false },
      beforeEnter: (to, from, next) => {
        if (store.state.loginModule.isLoggedIn) {
          next({ path: '/' })
        } else {
          next()
        }
      }
    },
    {
      path: '/',
      meta: { Auth: true },
      name: Home.name,
      component: Home
    },
    { path: '/post/:id', component: PostDetail, meta: { Auth: true } },
    { path: '/post/:id/edit', component: PostEdit, meta: { Auth: true } },
    { path: '/posts/add', component: AddPost, meta: { Auth: true } },
    { path: '/profile', component: Profile, meta: { Auth: true } }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.Auth && !store.state.loginModule.isLoggedIn) {
    next({ path: '/login' })
  } else {
    if (store.state.loginModule.isLoggedIn) {
      store.commit(types.SET_USER)
    }
    next()
  }
})

export default router

