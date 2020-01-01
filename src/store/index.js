import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    myList: [
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
