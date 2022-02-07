import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'

Vue.config.productionTip = false

Vue.use(PiniaVuePlugin)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

new Vue({
  render: h => h(App),
  pinia
}).$mount('#app')
