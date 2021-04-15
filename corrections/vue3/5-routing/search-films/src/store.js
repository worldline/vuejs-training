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
	},
	actions: {
		login({ commit }, { user }) {
			commit("setLoggedIn", true)
			commit("setUser", user)
			router.push("/search")
		},
		logout({ commit }) {
			commit("setLoggedIn", false)
			commit("setUser", null)
			router.push("/login")
		},
	},
})
