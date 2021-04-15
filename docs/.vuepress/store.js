import Vue from "vue"

const state = Vue.observable({ vueVersion: "vue3" }) // pas d'export pour l'état

for (let key in state) {
	if (localStorage.getItem(key) !== null) {
		state[key] = localStorage.getItem(key)
	}
}

const store = {
	get(prop) {
		return state[prop]
	},
	set(prop, value) {
		state[prop] = value
		localStorage.setItem(prop, value)
	},
}

export default store
