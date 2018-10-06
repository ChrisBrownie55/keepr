import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'

Vue.use(Vuex)

let auth = Axios.create({
  baseURL: "//localhost:5000/account/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: "//localhost:5000/api/",
  timeout: 3000,
  withCredentials: true
})

const store = new Vuex.Store({
  state: {
    user: {}
  },
  getters: {
    loggedIn: state => !!state.user.id
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    error(context, error) {
      console.log(error) // TODO: visual notification of error for user
    },
    async authenticate({ commit, dispatch }) {
      try {
        const { data: user } = auth.get('authenticate')
        commit('setUser', user)
        router.push(router.currentRoute.query.redirect || '/')
      } catch (error) {
        dispatch('error', error)
      }
    },
    async register({ commit, dispatch }, creds) {
      try {
        const { data: user } = auth.post('register', creds)
        commit('setUser', user)
        router.push(router.currentRoute.query.redirect || '/')
      } catch (error) {
        dispatch('error', error)
      }
    },
    async login({ commit, dispatch }, creds) {
      try {
        const { data: user } = auth.post('login', creds)
        commit('setUser', user)
        router.push(router.currentRoute.query.redirect || '/')
      } catch (error) {
        dispatch('error', error)
      }
    }
  }
})

store.dispatch('authenticate') // try to authenticate on visit

export default store