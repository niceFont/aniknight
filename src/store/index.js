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
    },
    removeAnime(state, payload) {
      state.myList = state.myList.filter(item => item.id !== payload.id);
    }
  },
  actions: {
    addAnime({ commit }, payload) {
      commit("addAnime", payload);
    },
    removeAnime({ commit }, payload) {
      commit("removeAnime", payload);
    }
  },
  modules: {
  }
})
