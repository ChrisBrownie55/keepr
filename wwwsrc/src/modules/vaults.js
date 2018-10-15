import router from '@/router'
import Axios from 'axios'
import Vue from 'vue'

const api = Axios.create({
  baseURL: "//localhost:5000/api/vaults/",
  timeout: 3000,
  withCredentials: true
})

export default {
  state: {
    vaults: [],
    vaultKeeps: {} // ids of "keeps in vaults"
  },
  mutations: {
    setVaults(state, vaults) {
      state.vaults = vaults
    },
    setVaultKeeps(state, { id, keeps }) {
      state.vaults.find(vault => vault.id === id).keeps = keeps
      keeps.forEach(keep => Vue.set(state.vaultKeeps, keep.id, true))
    },
    clearVaultKeeps(state) {
      state.vaultKeeps = {}
    },
    addVaultKeep(state, { vaultId, keep }) {
      state.vaults.find(vault => vault.id === vaultId).keeps.push(keep)
      Vue.set(state.vaultKeeps, keep.id, true)
    },
    deleteVaultKeep(state, keepId) {
      state.vaults.forEach(vault => {
        Vue.set(vault, 'keeps', vault.keeps.filter(keep => keep.id !== keepId))
      })
      Vue.delete(state.vaultKeeps, keepId)
    },
    editVault(state, newVault) {
      const vault = state.vaults.find(vault => vault.id === newVault.id)
      vault.name = newVault.name
      vault.description = newVault.description
    },
  },
  actions: {
    clearVaults({ commit }) {
      commit('setVaults', [])
      commit('clearVaultKeeps')
    },
    async getVaults({ commit, rootState, dispatch }) {
      if (!rootState.auth.user.id) {
        // this.dispatch('snacks/loggedIn')
        return
      }

      try {
        const { data: vaults } = await api.get('')

        vaults.forEach(vault => vault.keeps = [])
        commit('setVaults', vaults)

        vaults.forEach(vault => dispatch('getKeepsOnVault', vault.id))
      } catch (error) {
        console.log(error)
      }
    },
    async fetchKeepsOnVault({ rootState }, id) {
      if (!rootState.auth.user.id) {
        // this.dispatch('snacks/loggedIn')
        return
      }

      try {
        const { data: keeps } = await api.get(`keeps/${id}`)
        return keeps
      } catch (error) {
        console.log(error)
      }
    },
    async getKeepsOnVault({ commit, dispatch }, id) {
      const keeps = await dispatch('fetchKeepsOnVault', id)
      if (!keeps) {
        return
      }
      commit('setVaultKeeps', { id, keeps })
    },
    async getVaultById({ rootState }, id) {
      if (!rootState.auth.user.id) {
        // this.dispatch('snacks/loggedIn')
        return
      }

      try {
        const { data: vault } = await api.get(`${id}`)
        if (!vault) {
          router.push({ name: 'dashboard' })
          return
        }

        return vault
      } catch (error) {
        console.log(error)
      }
    },
    async createVault({ commit, state, rootState, dispatch }, vault) {
      if (!rootState.auth.user.id) {
        // this.dispatch('snacks/loggedIn')
        return
      }

      try {
        const result = await api.post('', vault)
        vault = result.data
        vault.keeps = []

        const vaults = [vault, ...state.vaults]
        commit('setVaults', vaults)

        dispatch('getKeepsOnVault', vault.id)

        router.push({ name: 'dashboard' })
      } catch (error) {
        console.log(error)
      }
    },
    async deleteVault({ commit, state, rootState }, id) {
      if (!rootState.auth.user.id) {
        // this.dispatch('snacks/loggedIn')
        return
      }

      try {
        const { data: success } = await api.delete(`${id}`)
        if (!success) {
          this.dispatch('snacks/notify', { message: 'Unable to delete vault.', type: 'error' })
          return
        }

        const vaults = state.vaults.filter(vault => vault.id !== id)
        commit('setVaults', vaults)
      } catch (error) {
        console.log(error)
      }
    },
    async editVault({ commit, rootState }, vault) {
      if (!rootState.auth.user.id) {
        // this.dispatch('snacks/loggedIn')
        return
      }

      try {
        const { data: success } = await api.put('', vault)
        commit('editVault', vault)
      } catch (error) {
        console.log(error)
      }
    },
    removeKeep({ commit, state }, id) {
      const vaults = state.vaults.map(vault => ({
        ...vault,
        keeps: vault.keeps.filter(keep => keep.id !== id).map(keep => ({ ...keep }))
      }))

      commit('setVaults', vaults)
    },
    async addKeepToVault({ commit, rootState, dispatch }, vaultKeep) {
      if (!rootState.auth.user.id) {
        // this.dispatch('snacks/loggedIn')
        return
      }

      try {
        const { data: success } = await api.post('storeInVault', { vaultId: vaultKeep.vaultId, keepId: vaultKeep.keep.id })
        if (!success) {
          this.dispatch('snacks/notify', { message: 'Unable to store keep in vault.', type: 'error' })
        } else {
          this.dispatch('snacks/notify', { message: 'Keep stored in vault!', type: 'info' })
          commit('addVaultKeep', vaultKeep)
        }
        return success;
      } catch (error) {
        console.log(error)
      }
    },
    async removeKeepFromVault({ commit, rootState, dispatch }, keepId) {
      if (!rootState.auth.user.id) {
        // this.dispatch('snacks/loggedIn')
        return
      }

      try {
        const { data: success } = await api.delete(`removeFromVault/${keepId}`)
        if (!success) {
          this.dispatch('snacks/notify', { message: 'Unable to remove keep from vault.', type: 'error' })
        } else {
          this.dispatch('snacks/notify', { message: 'Keep removed from vault!', type: 'info' })
          commit('deleteVaultKeep', keepId)
        }
        return success
      } catch (error) {
        console.log(error)
      }
    }
  }
}