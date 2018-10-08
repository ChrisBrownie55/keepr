import Axios from 'axios'
import router from '@/router'

const auth = Axios.create({
  baseURL: "//localhost:5000/account/",
  timeout: 3000,
  withCredentials: true
})
const authenticate = Axios.create({
  baseURL: "//localhost:5000/account/authenticate",
  timeout: 1000,
  withCredentials: true
})

export default {
  state: {
    user: {}
  },
  getters: {
    loggedIn: state => !!state.user && !!state.user.id
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
        const { data: user } = await authenticate.get('')
        commit('setUser', user)
        router.push(router.currentRoute.query.redirect || '/')
      } catch (error) {
        // dispatch('error', error)
      }
    },
    async register({ commit, dispatch }, creds) {
      try {
        const { data: user } = await auth.post('register', creds)
        commit('setUser', user)
        // router.push(router.currentRoute.query.redirect || '/')
      } catch (error) {
        // swallow error
      }
    },
    async login({ commit, dispatch }, creds) {
      try {
        const { data: user } = await auth.post('login', creds)
        commit('setUser', user)
        router.push(router.currentRoute.query.redirect || '/')
      } catch (error) {
        dispatch('error', error)
      }
    },
    async logout({ commit, dispatch }) {
      try {
        await auth.delete('logout', creds)
        router.push({ name: 'home' })
      } catch (error) {
        dispatch('error', error)
      }
    }
  }
}