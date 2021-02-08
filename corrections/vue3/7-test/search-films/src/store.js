import { createStore } from "vuex"
import createPersistedState from "vuex-persistedstate"

import router from "@/router/index.js"

export default createStore({
	strict: true,
	plugins: [createPersistedState()],
	state() {
		return {
			user: null,
			loggedIn: false,
		}
	},
	mutations: {
		setLoggedIn(state, loggedIn) {
			state.loggedIn = loggedIn
		},
		setUser(state, user) {
			state.user = user
		},
		setToken(state, token) {
			state.token = token
		},
	},
	actions: {
		login({ commit }, { user, token }) {
			commit("setLoggedIn", true)
			commit("setUser", user)
			commit("setToken", token)
			router.push("/search")
		},
		logout({ commit }) {
			commit("setLoggedIn", false)
			commit("setUser", null)
			commit("setToken", null)
			router.push("/login")
		},
	},
})
