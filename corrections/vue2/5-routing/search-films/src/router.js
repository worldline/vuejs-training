import Vue from 'vue'
import Router from 'vue-router'
import LoginForm from '@/components/LoginForm.vue'
import SearchFilm from '@/components/SearchFilm.vue'
import store from '@/store'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'loginForm',
      component: LoginForm
    },
    {
      path: '/search',
      name: 'searchFilm',
      component: SearchFilm,
      beforeEnter: (to, from, next) => {
        if(store.state.loggedIn) {
          return next()
        }
        return next('login')
      }
    }
  ]
})
