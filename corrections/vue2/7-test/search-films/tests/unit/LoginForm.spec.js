import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import LoginForm from '@/views/LoginForm'
import UserService from '@/services/UserService.js'

describe('LoginForm Component', () => {

	let localVue, store, router, wrapper, loginActionMock

	beforeEach(() => {
		// Initialize local Vue with Vuex and mock dispatch actions
		localVue = createLocalVue()
		localVue.use(Vuex)
		loginActionMock = jest.fn(() => Promise.resolve())
		store = new Vuex.Store({
			actions: {
				login: loginActionMock
			}
		})

		// Initialize local Vue with VueRouter
		localVue.use(VueRouter)
		router = new VueRouter()

		// Mount the local vue
		wrapper = shallowMount(LoginForm, { localVue, store, router })
	});

	it('should redirect the user to /search route when correctly logged in', async () => {

		// Mock the login call to the backend
		const loginMock = jest.fn(() => Promise.resolve({ user: {}, token: 't0k3N' }))
		UserService.login = loginMock;

		await wrapper.find('form').trigger('submit.prevent')
		expect(loginMock).toHaveBeenCalled()
		expect(loginActionMock).toHaveBeenCalled()
		expect(wrapper.vm.$route.path).toEqual('/search')
	})

	it('should print an error message when user failed to login', async () => {

		// Mock the login call to the backend
		const loginMock = jest.fn(() => Promise.reject('The login information was incorrect'))
		UserService.login = loginMock;

		await wrapper.find('form').trigger('submit.prevent')
		expect(loginMock).toHaveBeenCalled()
		expect(loginActionMock).not.toHaveBeenCalled()
		expect(wrapper.find('.error').text()).toContain('The login information was incorrect')
	})
})