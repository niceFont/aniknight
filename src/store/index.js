import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    myList: [
      { id: 0, title: "first" },
      { id: 1, title: "second" },
      { id: 2, title: "third" },
      { id: 3, title: "fourth" },
      { id: 4, title: "fifth" }
    ],
  },
  mutations: {
    addAnime(state, payload) {
      state.myList = [...state.myList, payload];
    }
  },
  actions: {
    addAnime({ commit }, payload) {
      commit("addAnime", payload);
    }
  },
  modules: {
  }
})
