import router from '@/router'
import Axios from 'axios'

import { keepsURL } from '@/base-urls'

const api = Axios.create({
  baseURL: keepsURL,
  timeout: 3000,
  withCredentials: true
})

export default {
  state: {
    keeps: [],
    myKeeps: [],
    loading: false,
    initialLoad: true
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
      if (!keep) {
        return
      }
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
    clearMyKeeps({ commit }) {
      commit('setMyKeeps', [])
    },
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
        await dispatch('loadImages', keeps)
        commit('setKeeps', keeps)
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
        await dispatch('loadImages', keeps)
        commit('setKeeps', keeps)
      } catch (error) {
        console.log(error)
      }
      commit('setLoading', false)
      commit('setInitialLoad', false)
    },
    async createKeep({ commit, state, rootState }, keep) {
      if (!rootState.auth.user.id) {
        // this.dispatch('snacks/loggedIn')
        return
      }

      try {
        const result = await api.post('', keep)
        keep = result.data
        if (!keep.isPrivate) {
          const keeps = [keep, ...state.keeps]
          commit('setKeeps', keeps)
        }
        router.push({ name: 'home' })
      } catch (error) {
        console.log(error)
      }
    },
    async deleteKeep({ commit, state, rootState }, id) {
      if (!rootState.auth.user.id) {
        // this.dispatch('snacks/loggedIn')
        return
      }

      try {
        const { data: success } = await api.delete(`${id}`)
        if (!success) {
          this.dispatch('snacks/notify', { message: 'Unable to delete keep.', type: 'error' })
          return
        }

        const keeps = state.keeps.filter(keep => keep.id !== id)
        commit('setKeeps', keeps)

        const myKeeps = state.myKeeps.filter(keep => keep.id !== id)
        commit('setMyKeeps', myKeeps)

        this.dispatch('vaults/removeKeep', id)

        if (router.currentRoute.name === 'keep') {
          router.replace({ name: 'home' })
        }
      } catch (error) {
        console.log(error)
      }
    },
    async editKeep({ commit, rootState }, keep) {
      if (!rootState.auth.user.id) {
        // this.dispatch('snacks/loggedIn')
        return
      }

      try {
        const { data: success } = await api.put('', keep)
        if (!success) {
          this.dispatch('snacks/notify', { message: 'Unable to update keep.', type: 'error' })
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
        // this.dispatch('snacks/loggedIn')
        return
      }

      try {
        const { data: keeps } = await api.get(`byUserId/${rootState.auth.user.id}`)
        commit('setMyKeeps', keeps)
      } catch (error) {
        console.log(error)
      }
    }
    // async generateRandomKeeps({ rootState, dispatch }) {
    //   if (!rootState.auth.user.id) {
    //     this.dispatch('snacks/loggedIn')
    //     return
    //   }

    //   const payload = {
    //     "token": "gnyIpEXalCVp3SprCCsGFQ",
    //     "data": {
    //       "name": "stringWords|1,3",
    //       "description": "stringWords|15,30",
    //       "isPrivate": "numberBool",
    //       "views": "numberInt|0,200",
    //       "shares": "numberInt|0,50",
    //       "keeps": 0,
    //       "_repeat": 25
    //     },
    //   }

    //   try {
    //     const { data: keeps } = await Axios({
    //       method: 'post',
    //       url: 'https://app.fakejson.com/q',
    //       data: payload
    //     })

    //     const sizes = ['800x800', '400x800', '512x400', '1024x800', '900x450']
    //     const getRandomSize = () => sizes[Math.floor(Math.random() * sizes.length)]

    //     keeps.map((keep, index) => keep.img = `https://source.unsplash.com/${getRandomSize()}/?sig=${index + 81}`)
    //     keeps.forEach(keep => {
    //       dispatch('createKeep', keep)
    //     })
    //   } catch (error) {
    //     this.dispatch('snacks/notify', { message: error.message, type: 'info' })
    //   }
    // }
  }
}