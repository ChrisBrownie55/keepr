export default {
  state: {
    // snack looks like { message: String, type: info | error | warning }
    snacks: []
  },
  mutations: {
    addMessage(state, snack) {
      state.snacks.push(snack)
    },
    removeMessage(state) {
      state.snacks.shift()
    }
  },
  actions: {
    notify({ commit }, snack) {
      commit('addMessage', snack)
      setTimeout(() => commit('removeMessage'), 3200 + 200)
    },
    networkError({ dispatch }, error) {
      dispatch('notify', { message: error.response ? error.response.data : 'An error has occurred.', type: 'error' })
    },
    loggedIn({ dispatch }) {
      dispatch('notify', { message: 'You must be logged in to do that.', type: 'warning' })
    }
  }
}