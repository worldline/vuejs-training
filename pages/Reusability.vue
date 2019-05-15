<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card>
        <v-card-title class="headline primary--text">
          Réutilisabilité et composition
        </v-card-title>
        <v-card-text>
          <h2 class="subheading primary--text pa-2">
            Mixins
          </h2>
          <p>
            Les <a
              href="https://fr.vuejs.org/v2/guide/mixins.html"
              target="_blank"
            >Mixins</a> permettent de créer des ensembles de fonctionnalités réutilisables pour les composants de Vue. En les déclarant via l'option <code>mixins</code>, toutes les options du mixin seront fusionnées (merge) avec les options du composant.
          </p>

          <code-copy
            :code="example_mixin"
            language="javascript"
          />
          <v-alert
            :value="true"
            color="info"
            icon="info"
            outline
          >
            <p>En cas de conflit, la stratégie de merge appliquée est la suivante:</p>
            <ul>
              <li><code>data, methods, components & directives</code>: les options du composants ont la priorité</li>
              <li><code>event hooks</code> : déclenchés successivement, les hooks du mixin en premier</li>
            </ul>
          </v-alert>

          <h2 class="subheading primary--text pa-2">
            Directives personnalisées
          </h2>
          <p>
            Vue permet de déclarer ses propres <a
              href="https://fr.vuejs.org/v2/guide/custom-directive.html"
              target="_blank"
            >directives personnalisées</a> - les éléments de syntaxe qui sont utilisés dans les templates de composant. Cette fonction est souvent utilisée par des bibliothèques tierces. Les directives personnalisées permettent de réutiliser de la logique applicative sur plusieurs éléments sans passer par un composant dédié. Veillez toutefois à ne pas en abuser car il est difficile de les tracer et elles peuvent rentrer en conflit avec des évolutions futures de Vue.
          </p>
          <code-copy
            :code="example_custom_directive"
            language="javascript"
          />

          <h2 class="subheading primary--text pa-2">
            Plugins
          </h2>
          <p>
            Enfin, Vue propose un système de <a
              href="https://fr.vuejs.org/v2/guide/plugins.html"
              target="_blank"
            >plugins</a> servant à ajouter des fonctionnalités au niveau global. Là encore, il s'agit d'une fonctionnalité principalement utilisée par les bibliothèques tierces et il convient de ne pas en abuser. Les plugins peuvent entre autres:
            <ul>
              <li>ajouter des mixins globales ou de nouveaux composants déclarés globalement</li>
              <li>ajouter des méthodes ou propriétés globalement à tous les composants</li>
              <li>ajouter des directives/filtres/transitions</li>
            </ul>
          </p>
          <code-copy
            :code="example_plugin"
            language="javascript"
          />
          <p>La plupart des bibliothèques tierces de Vue utilisent ce format de plugin pour sa praticité. C'est le cas de <code>vue-router</code> par exemple. Les plugins sont reconnus comme tels et placés dans leur propre catégorie sur Vue UI.</p>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            flat
            nuxt
            to="/http"
          >
            <v-icon left>
              navigate_before
            </v-icon>
            Requêtes HTTP
          </v-btn>
          <v-spacer />
          <v-btn
            color="primary"
            flat
            nuxt
            to="/ecosystem"
          >
            Ecosystème Vue
            <v-icon right>
              navigate_next
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import CodeCopy from '~/components/CodeCopy'

export default {
  components: {
    CodeCopy
  },
  data () {
    return {
      example_mixin: `// définir un objet mixin
const helloMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

// définition d'un composant qui utilise ce mixin
const Component = Vue.extend({
  mixins: [helloMixin],
  created(){
    console.log('another created callback')
  }
})

let component = new Component()`,
      example_custom_directive: `// Register a global custom directive called 'v-focus'
Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    // Focus the element
    el.focus()
  }
})`,
      example_plugin: `const NotificationPlugin = {
  install(){
    Vue.component('Notification', NotificationComponent);
    Vue.directive('notify', NotificationDirective):
  }
}

Vue.use(NotificationPlugin)`
    }
  }
}
</script>
