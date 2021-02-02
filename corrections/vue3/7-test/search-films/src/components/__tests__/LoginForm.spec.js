import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'

import LoginForm from '@/components/LoginForm'
import UserService from '@/services/UserService.js'

describe('LoginForm Component', () => {

  let localVue, store, router, wrapper;
  let setUserMock, setTokenMock;

  beforeEach(() => {
    // Initialize local Vue with Vuex and mock dispatch actions
    localVue = createLocalVue()
    localVue.use(Vuex)
    setUserMock = jest.fn(() => Promise.resolve())
    setTokenMock = jest.fn(() => Promise.resolve())
    store = new Vuex.Store({
      actions: {
        setUser: setUserMock,
        setToken: setTokenMock
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
    expect(setUserMock).toHaveBeenCalled()
    expect(setTokenMock).toHaveBeenCalled()
    expect(wrapper.vm.$route.path).toEqual('/search')
  })

  it('should print an error message when user failed to login', async () => {

    // Mock the login call to the backend
    const loginMock = jest.fn(() => Promise.reject('The login information was incorrect'))
    UserService.login = loginMock;

    await wrapper.find('form').trigger('submit.prevent')
    expect(loginMock).toHaveBeenCalled()
    expect(setUserMock).not.toHaveBeenCalled()
    expect(setTokenMock).not.toHaveBeenCalled()
    expect(wrapper.find('.alert').text()).toContain('The login information was incorrect')
  })
})