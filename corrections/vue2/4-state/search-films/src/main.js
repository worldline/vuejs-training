import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueCompositionAPI from '@vue/composition-api'

import App from './App.vue'

Vue.use(VueCompositionAPI) // for Pinia and Vue 2 compat
Vue.use(PiniaVuePlugin)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

new Vue({
  render: h => h(App),
  pinia
}).$mount('#app')