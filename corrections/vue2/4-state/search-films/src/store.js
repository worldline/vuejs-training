import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [
    createPersistedState()
  ],
  state: {
    loggedIn: false
  },
  mutations: {
    setLoggedIn (state, loggedIn) {
      state.loggedIn = loggedIn
    }
  },
  actions: {
    setLoggedIn ({commit}, loggedIn) {
      commit('setLoggedIn', loggedIn)
    }
  }
})