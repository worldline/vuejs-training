import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    plugins: [ createPersistedState() ],
    state: {
        user: null,
        loggedIn: false
    },
    mutations: {
        setLoggedIn (state, loggedIn) {
            state.loggedIn = loggedIn
        },
        setUser (state, user) {
            state.user = user
        }
    },
    actions: {
        login ({ commit }, { user }) {
            commit('setLoggedIn', true)
            commit('setUser', user)
        },
        logout({ commit }){
            commit('setLoggedIn', false)
            commit('setUser', null)
        }
    }
})
