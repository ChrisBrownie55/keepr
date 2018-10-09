import Axios from 'axios'

let api = Axios.create({
  baseURL: "//localhost:5000/api/keeps/",
  timeout: 3000,
  withCredentials: true
})

export default {
  state: {
    keeps: []
  },
  getters: {
    filterByName: state => partialName => state.keeps.filter(keep => keep.name.indexOf(partialName) !== -1)
  },
  mutations: {
    setKeeps(state, keeps) {
      state.keeps = keeps
    }
  },
  // TODO: Make error handling notify the user
  actions: {
    async getKeeps({ commit }) {
      try {
        const { data: keeps } = await api.get('')
        commit('setKeeps', keeps)
      } catch (error) {
        console.log(error)
      }
    },
    async searchKeeps({ commit }) {
      try {
        const { data: keeps } = await api.get('searchByName')
        commit('setKeeps', keeps)
      } catch (error) {
        console.log(error)
      }
    }
  }
}