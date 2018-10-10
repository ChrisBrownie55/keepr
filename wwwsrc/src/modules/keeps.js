import Axios from 'axios'

let api = Axios.create({
  baseURL: "//localhost:5000/api/keeps/",
  timeout: 3000,
  withCredentials: true
})

export default {
  state: {
    keeps: [],
    loading: false,
    intialLoad: true
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
    },
    setInitialLoad(state, loading) {
      state.initialLoad = loading;
    }
  },
  // TODO: Make error handling notify the user
  actions: {
    loadImages(context, keeps) {
      return Promise.all(keeps.map(keep => new Promise((resolve, reject) => {
        const image = new Image()

        image.onload = resolve
        image.onerror = reject

        image.src = keep.img
      })))
    },
    async getKeeps({ commit, dispatch }) {
      commit('setLoading', true)
      try {
        const { data: keeps } = await api.get('')
        commit('setKeeps', keeps)
        await dispatch('loadImages', keeps)
      } catch (error) {
        console.log(error)
      }
      commit('setLoading', false)
      commit('setInitialLoad', false)
    },
    async searchKeeps({ commit }, name) {
      commit('setLoading', true)
      try {
        const { data: keeps } = await api.get(`searchByName/?name=${name}`)
        commit('setKeeps', keeps)
        await dispatch('loadIamges', keeps)
      } catch (error) {
        console.log(error)
      }
      commit('setLoading', false)
      commit('setInitialLoad', false)
    }
  }
}