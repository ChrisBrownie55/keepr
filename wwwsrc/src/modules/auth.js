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
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    async authenticate({ commit }) {
      try {
        const { data: user } = await authenticate.get('')
        commit('setUser', user)
      } catch (error) {
        // Swallow errors
      }
    },
    async register({ commit }, creds) {
      try {
        const { data: user } = await auth.post('register', creds)
        commit('setUser', user)
        router.push(router.currentRoute.query.redirect || '/')
      } catch (error) {
        this.dispatch('snacks/networkError', error)
      }
    },
    async login({ commit }, creds) {
      try {
        const { data: user } = await auth.post('login', creds)
        commit('setUser', user)
        router.push(router.currentRoute.query.redirect || '/')
      } catch (error) {
        this.dispatch('snacks/networkError', error)
      }
    },
    async logout({ commit }) {
      try {
        await auth.delete('logout')
        commit('setUser', {})
        this.dispatch('keeps/clearMyKeeps')
        this.dispatch('vaults/clearVaults')
        router.push({ name: 'home' })
      } catch (error) {
        this.dispatch('snacks/networkError', error)
      }
    }
  }
}