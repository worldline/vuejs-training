import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueCompositionAPI from '@vue/composition-api'
import RouterPlugin from "vue-router";

import App from './App.vue'
import router from './router'

Vue.use(VueCompositionAPI) // for Pinia and Vue 2 compat
Vue.use(PiniaVuePlugin)
Vue.use(RouterPlugin)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

new Vue({
  render: h => h(App),
  pinia,
  router
}).$mount('#app')