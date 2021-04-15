import { createRouter, createWebHashHistory } from "vue-router"

import store from "@/store"
import LoginForm from "@/views/LoginForm.vue"
import SearchFilm from "@/views/SearchFilm.vue"

const routes = [
	{
		path: "/search",
		name: "Search",
		component: SearchFilm,
	},
	{
		path: "/login",
		name: "Login",
		component: LoginForm,
	},
	{
		path: "/",
		redirect: "/search",
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

router.beforeEach((to, from, next) => {
	if (to.name !== "Login" && !store.state.loggedIn) next({ name: "Login" })
	else next()
})

export default router
