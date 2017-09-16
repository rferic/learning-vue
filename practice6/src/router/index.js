import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'
import AddPost from '@/components/posts/AddPost'
import PostDetail from '@/components/posts/PostDetail'
import PostEdit from '@/components/posts/PostEdit'
import Profile from '@/components/Profile'
import {store} from '@/main'
import * as types from '@/mutation_types'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: Home.name,
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      // TODO Middleware Auth false
      meta: { Auth: false },
      // TODO beforeEnter => Before route
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
      path: '/posts/add',
      name: AddPost.name,
      component: AddPost,
      meta: { Auth: true }
    },
    {
      path: '/posts/:id/edit',
      name: PostEdit.name,
      component: PostEdit,
      meta: { Auth: true }
    },
    {
      path: '/posts/:id',
      name: PostDetail.name,
      component: PostDetail,
      meta: { Auth: true }
    },
    {
      path: '/profile',
      name: Profile.name,
      component: Profile,
      meta: { Auth: true }
    }
  ]
})

// TODO Defined Middleware
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
