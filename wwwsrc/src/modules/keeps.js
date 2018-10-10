import Axios from 'axios'

let api = Axios.create({
  baseURL: "//localhost:5000/api/keeps/",
  timeout: 3000,
  withCredentials: true
})

export default {
  state: {
    keeps: [],
    loading: false
  },
  getters: {
    filterByName: state => partialName => state.keeps.filter(keep => keep.name.indexOf(partialName) !== -1)
  },
  mutations: {
    setKeeps(state, keeps) {
      state.keeps = keeps
    },
    setLoading(state, loading) {
      state.loading = loading
    }
  },
  // TODO: Make error handling notify the user
  actions: {
    async getKeeps({ commit }) {
      commit('setLoading', true)
      try {
        const { data: keeps } = await api.get('')
        commit('setKeeps', keeps)
      } catch (error) {
        console.log(error)
      }
      commit('setLoading', false)
    },
    async searchKeeps({ commit }, name) {
      commit('setLoading', true)
      try {
        const { data: keeps } = await api.get(`searchByName/?name=${name}`)
        commit('setKeeps', keeps)
      } catch (error) {
        console.log(error)
      }
      commit('setLoading', false)
    }
  }
}