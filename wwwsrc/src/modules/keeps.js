import Axios from 'axios'

let api = Axios.create({
  baseURL: "//localhost:5000/api/",
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

  },
  actions: {
    getKeeps({ commit }) { }
  }
}