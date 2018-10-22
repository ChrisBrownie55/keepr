import Axios from 'axios'
import router from '@/router'

import { accountURL, authenticateURL } from '@/base-urls'

const accountAPI = Axios.create({
  baseURL: accountURL,
  timeout: 3000,
  withCredentials: true
})
const authenticateAPI = Axios.create({
  baseURL: authenticateURL,
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
        const { data: user } = await authenticateAPI.get('')
        commit('setUser', user)
      } catch (error) {
        // Swallow errors
      }
    },
    async register({ commit }, creds) {
      try {
        const { data: user } = await accountAPI.post('register', creds)
        commit('setUser', user)
        router.push(router.currentRoute.query.redirect || '/')
      } catch (error) {
        this.dispatch('snacks/networkError', error)
      }
    },
    async login({ commit }, creds) {
      try {
        const { data: user } = await accountAPI.post('login', creds)
        commit('setUser', user)
        router.push(router.currentRoute.query.redirect || '/')
      } catch (error) {
        this.dispatch('snacks/networkError', error)
      }
    },
    async logout({ commit }) {
      try {
        await accountAPI.delete('logout')
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