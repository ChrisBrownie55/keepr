import Vue from 'vue'
import Router from 'vue-router'

import store from './store'

const Home = () => import('./views/Home.vue')
const Login = () => import('./views/Login.vue')
const Dashboard = () => import('./views/Dashboard.vue')
const NewKeep = () => import('./views/NewKeep.vue')
const Keep = () => import('./views/Keep.vue')
const NewVault = () => import('./views/NewVault.vue')
const Vault = () => import('./views/Vault.vue')
const Account = () => import('./views/Account.vue')

const FourOhFour = () => import('./views/FourOhFour.vue')

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
    },
    {
      path: '/new-vault',
      name: 'new-vault',
      component: NewVault,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/vault/:id',
      name: 'vault',
      component: Vault,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/account',
      name: 'account',
      component: Account,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      name: '404',
      component: FourOhFour
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