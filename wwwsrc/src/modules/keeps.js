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
    myKeeps: [],
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
    },
    setMyKeeps(state, keeps) {
      state.myKeeps = keeps
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
    async getKeep(context, id) {
      try {
        const { data: keep } = await api.get(`${id}`)
        return keep
      } catch (error) {
        console.log(error)
        return false
      }
    },
    async shareKeep(context, id) {
      try {
        const { data: shares } = await api.get(`share/${id}`)
        return shares
      } catch (error) {
        console.log(error)
        return undefined
      }
    },
    async searchKeeps({ commit, dispatch }, name) {
      commit('setLoading', true)
      try {
        const { data: keeps } = await api.get(`searchByName/?name=${name}`)
        commit('setKeeps', keeps)
        await dispatch('loadImages', keeps)
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
        const myKeeps = state.myKeeps.filter(keep => keep.id !== id)
        commit('setMyKeeps', myKeeps)
      } catch (error) {
        console.log(error)
      }
    },
    async editKeep({ commit, rootState }, keep) {
      if (!rootState.auth.user.id) {
        // TODO: Notify user they need to login to do this.
        return
      }

      try {
        const { data: success } = await api.put('', keep)
        if (!success) {
          return false
        }
        commit('editKeep', keep)
        return true
      } catch (error) {
        console.log(error)
        return false
      }
    },
    async getMyKeeps({ commit, rootState }) {
      if (!rootState.auth.user.id) {
        // TODO: Notify user they need to login to do this.
        return
      }

      try {
        const { data: keeps } = await api.get(`byUserId/${rootState.auth.user.id}`)
        commit('setMyKeeps', keeps)
      } catch (error) {
        console.log(error)
      }
    },
    async addKeepToVault({ commit, rootState, dispatch }, vaultKeep) {
      if (!rootState.auth.user.id) {
        // TODO: Notify user they need to login to do this.
        return
      }

      try {
        const { data: success } = await api.post('storeInVault', vaultKeep)
        if (!success) {
          // TODO: Notify of failure
        } else {
          // TODO: Notify of success
        }
      } catch (error) {
        console.log(error)
      }
    },
    async removeKeepFromVault({ commit, rootState, dispatch }, keepId) {
      if (!rootState.auth.user.id) {
        // TODO: Notify user they need to login to do this
        return
      }

      try {
        const { data: success } = await api.delete(`removeFromVault/${keepId}`)
        if (!success) {
          // TODO: Notify of failure
        } else {
          // TODO: Notify of success
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}