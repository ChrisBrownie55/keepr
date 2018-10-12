import router from '@/router'
import Axios from 'axios'

const api = Axios.create({
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
    },
    editKeep(state, newKeep) {
      const keep = state.keeps.find(keep => keep.id === newKeep.id)
      keep.name = newKeep.name
      keep.description = newKeep.description
      keep.img = newKeep.img
      keep.isPrivate = newKeep.isPrivate
      keep.views = newKeep.views
      keep.shares = newKeep.shares
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
    async searchKeeps({ commit, dispatch }, name) {
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
    },
    async createKeep({ commit, state, rootState }, keep) {
      if (!rootState.auth.user.id) {
        // TODO: Notify user they need to login to do this.
        return
      }

      try {
        const result = await api.post('', keep)
        keep = result.data
        const keeps = [keep, ...state.keeps]
        commit('setKeeps', keeps)
        router.push({ name: 'home' })
      } catch (error) {
        console.log(error)
      }
    },
    async deleteKeep({ commit, state, rootState }, id) {
      if (!rootState.auth.user.id) {
        // TODO: Notify user they need to login to do this.
        return
      }

      try {
        const { data: success } = await api.delete(`${id}`)
        if (!success) {
          // TODO: Notify unsuccessful
          return
        }
        const keeps = state.keeps.filter(keep => keep.id !== id)
        commit('setKeeps', keeps)
      } catch (error) {
        console.log(error)
      }
    },
    async editKeep({ commit, state, rootState }, keep) {
      if (!rootState.auth.user.id) {
        // TODO: Notify user they need to login to do this.
        return
      }

      try {
        const { data: success } = await api.put('', vault)
        commit('editKeep', vault)
      } catch (error) {
        console.log(error)
      }
    }
  }
}