import Vue from 'vue'
import Router from 'vue-router'

import store from './store'

import Login from './views/Login.vue'
import Home from './views/Home.vue'
import Dashboard from './views/Dashboard.vue'
import NewKeep from './views/NewKeep.vue'
import Keep from './views/Keep.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/new-keep',
      name: 'new-keep',
      component: NewKeep,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/keep/:id',
      name: 'keep',
      component: Keep,
      props: true
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!store.state.auth.user.id) {
    store.dispatch('auth/authenticate').then(() => {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!store.state.auth.user.id) {
          router.push({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        }
      }
    })
  }
  next() // make sure to always call next()!
})

export default router