<template>
  <v-app :dark="dark">
    <v-navigation-drawer
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile
          router
          :to="item.to"
          :key="i"
          v-for="(item, i) in items"
          exact
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon" />
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      fixed
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'" />
      </v-btn>
      <v-btn
        icon
        @click.stop="dark = !dark"
      >
        <v-icon v-html="dark ? 'brightness_high' : 'brightness_low'" />
      </v-btn>
      <v-toolbar-title v-text="title" />
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      dark: false,
      items: [
        { icon: 'home', title: 'Accueil', to: '/' },
        { icon: 'slideshow', title: 'Presentation', to: '/presentation' },
        { icon: 'build', title: 'Outillage', to: '/tools' },
        { icon: 'description', title: 'Vues', to: '/vues' },
        { icon: 'code', title: 'Directives', to: '/directives' },
        { icon: 'dashboard', title: 'Composants', to: '/components' },
        { icon: 'restore_page', title: 'Réactivité', to: '/reactivity' },
        { icon: 'store', title: "Gestion d'état", to: '/state' },
        { icon: 'router', title: 'Routage', to: '/routing' },
        { icon: 'http', title: 'Requêtes', to: '/http' },
        { icon: 'loop', title: 'Réutilisabilité', to: '/reusability' },
        { icon: 'extension', title: 'Ecosystème', to: '/ecosystem' }
      ],
      miniVariant: false,
      title: 'Vue.js in depth'
    }
  }
}
</script>
