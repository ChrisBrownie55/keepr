import router from '@/router'
import Axios from 'axios'
import HashArray from 'hasharray'

const api = Axios.create({
  baseURL: "//localhost:5000/api/vaults/",
  timeout: 3000,
  withCredentials: true
})

export default {
  state: {
    vaults: [],
    vaultKeeps: new HashArray() // ids of "keeps in vaults"
  },
  mutations: {
    setVaults(state, vaults) {
      state.vaults = vaults
    },
    setVaultKeeps(state, { id, keeps }) {
      state.vaults.find(vault => vault.id === id).keeps = keeps
      state.vaultKeeps.addAll(keeps.map(keep => keep.id))
    },
    editVault(state, newVault) {
      const vault = state.vaults.find(vault => vault.id === newVault.id)
      vault.name = newVault.name
      vault.description = newVault.description
    },
  },
  actions: {
    async getVaults({ commit, rootState, dispatch }) {
      if (!rootState.auth.user.id) {
        // TODO: Notify user they need to login.
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
    async fetchKeepsOnVault({ commit, state, rootState }, id) {
      if (!rootState.auth.user.id) {
        // TODO: Notify user they need to login.
        return
      }

      try {
        const { data: keeps } = await api.get(`keeps/${id}`)
        return keeps
      } catch (error) {
        console.log(error)
      }
    },
    async getKeepsOnVault({ commit, state, rootState, dispatch }, id) {
      const keeps = await dispatch('fetchKeepsOnVault', id)
      if (!keeps) {
        return
      }
      commit('setVaultKeeps', { id, keeps })
    },
    async getVaultById({ commit, state, rootState, dispatch }, id) {
      if (!rootState.auth.user.id) {
        // TODO: Notify user they need to login.
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
        // TODO: Notify user they need to login.
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
        // TODO: Notify user they need to login.
        return
      }

      try {
        const { data: success } = await api.delete(`${id}`)
        if (!success) {
          // TODO: Notify unsuccessful
          return
        }
        const vaults = state.vaults.filter(vault => vault.id !== id)
        commit('setVaults', vaults)
      } catch (error) {
        console.log(error)
      }
    },
    async editVault({ commit, state, rootState }, vault) {
      if (!rootState.auth.user.id) {
        // TODO: Notify user they need to login.
        return
      }

      try {
        const { data: success } = await api.put('', vault)
        commit('editVault', vault)
      } catch (error) {
        console.log(error)
      }
    }
  }
}