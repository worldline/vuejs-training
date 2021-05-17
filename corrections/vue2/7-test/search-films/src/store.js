import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import router from "@/router";

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    plugins: [ createPersistedState() ],
    state: {
        user: null,
        loggedIn: false,
        token: null
    },
    mutations: {
        setLoggedIn (state, loggedIn) {
            state.loggedIn = loggedIn
        },
        setUser (state, user) {
            state.user = user
        },
        setToken(state, token){
            state.token = token
        }
    },
    actions: {
        login ({ commit }, { user, token }) {
            commit('setLoggedIn', true)
            commit('setUser', user)
            commit('setToken', token)
            router.push("/search")
        },
        logout({ commit }){
            commit('setLoggedIn', false)
            commit('setUser', null)
            commit('setToken', null)
            router.push("/login")
        }
    }
})
