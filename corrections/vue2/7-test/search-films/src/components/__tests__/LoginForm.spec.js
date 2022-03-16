import{ describe, it, expect, vi } from "vitest";
import { shallowMount, flushPromises } from "@vue/test-utils"
import { defineStore } from "pinia"
import { createRouter, createWebHistory } from "vue-router"

import LoginForm from "@/views/LoginForm"
import UserService from "@/services/UserService.js"

describe("LoginForm Component", () => {
	let store, router, wrapper, loginActionMock

	beforeEach(() => {
		// Initialize local Vue with Vuex and mock dispatch actions
		loginActionMock = vi.fn(() => Promise.resolve())
		store = defineStore('session', {
			actions: {
				login: loginActionMock,
			},
		})

		// Initialize local Vue with VueRouter
		router = createRouter({
			history: createWebHistory(),
			routes: [
				{
					path: "/",
					component: { template: "Login" },
				},
				{
					path: "/search",
					component: { template: "Search" },
				},
			],
		})

		// Mount the local vue
		wrapper = shallowMount(LoginForm, {
			global: { plugins: [store, router] },
		})
	})

	it("should redirect the user to /search route when correctly logged in", async () => {
		await router.isReady()
		// Mock the login call to the backend
		const loginMock = vi.fn(() =>
			Promise.resolve({ user: {}, token: "t0k3N" })
		)
		UserService.login = loginMock

		await wrapper.get("form").trigger("submit.prevent")
		await flushPromises()
		expect(loginMock).toHaveBeenCalled()
		expect(loginActionMock).toHaveBeenCalled()
		expect(wrapper.vm.$route.path).toEqual("/search")
	})

	it("should print an error message when user failed to login", async () => {
		await router.isReady()
		// Mock the login call to the backend
		const loginMock = vi.fn(() =>
			Promise.reject("The login information was incorrect")
		)
		UserService.login = loginMock

		await wrapper.get("form").trigger("submit.prevent")
		await flushPromises()
		expect(loginMock).toHaveBeenCalled()
		expect(loginActionMock).not.toHaveBeenCalled()
		expect(wrapper.get(".error").text()).toContain(
			"The login information was incorrect"
		)
	})
})
