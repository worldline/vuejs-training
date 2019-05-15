import Vue from 'vue'
import Vuetify, {
  VApp, // required
  VAlert,
  VNavigationDrawer,
  VFooter,
  VToolbar
} from 'vuetify/lib'
import { Ripple } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  components: {
    VApp,
    VAlert,
    VNavigationDrawer,
    VFooter,
    VToolbar
  },
  directives: {
    Ripple
  }
})
