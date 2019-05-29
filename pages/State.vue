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
          Gestion d'état
        </v-card-title>

        <v-card-text>
          <p>Nous avons vu dans la section précédente comment communiquaient les composants parents et enfants. Toutefois, à mesure que les applications grandissent et se complexifient, des composants très éloignés dans l'arborescence peuvent être amenées à manipuler les mêmes données. Il devient alors très fastidieux de les faire communiquer entre eux pour travailler sur les mêmes références de données. C'est pourquoi il existe des solutions plus ou moins complexes de gestion d'état, ou <i>state management</i>.</p>

          <h2 class="subheading primary--text pa-2">
            Pourquoi une solution de gestion d'état ?
          </h2>
          <img
            src="https://i.imgur.com/PSYBCRG.png"
            alt="Problème multiple vues avec props partagés"
          >
          <ul>
            <li>Parce que passer une variable (<code>props</code>) entre 2 composants (parent, enfant) c'est bien, mais si l'on veut la propager aux petits-enfants et arrières petits enfants, cela devient compliqué</li>
            <li>Parce que partager de l'information entre des composants non liés (ex: informations de l'utilisateur connecté) n'est pas réalisable.</li>
            <li>Parce qu'il est plus facile de déléguer la tâche à un "singleton" tiers accessible depuis tous les composants</li>
            <li>Parce qu'il est souhaitable que le "store" puisse être persisté (sur le localStorage par ex.)</li>
          </ul>

          <h2 class="subheading primary--text pa-2">
            Données partagées par référence
          </h2>
          <p>La solution la plus évidente et la plus simple au problème de gestion d'état est de stocker les données au sein d'un ou plusieurs objets déclarés dans leur propre module, puis d'exporter ces objets. Tous les composants voulant manipuler ces données peuvent alors importer l'objet et travailleront sur la même référence.</p>
          <code-copy
            language="javascript"
            :code="example_shared_state"
          />

          <p>Cette solution peut faire l'affaire dans de nombreux cas, mais montre rapidement ses limites au débogage lorsqu'un grand nombre de composants différents interagissent avec les données. En effet, les mutations sur les objets d'état ne sont tracées nulle part, ce qui complexifie l'identification de la source d'un bug.</p>

          <h2 class="subheading primary--text pa-2">
            Store et mutations contrôlées
          </h2>
          <p>Un pattern un peu plus avancé est de déclarer un objet store qui encapsule l'objet d'état. L'objet d'état n'est pas directement accessible de l'extérieur par référence, mais le store fournit des méthodes pour interagir avec: typiquement un getter/setter. Ce sont dans ces méthodes que l'on pourra ajouter des instructions de débogage, monitoring, mesure de performance etc.</p>

          <code-copy
            language="javascript"
            :code="example_store"
          />
          <code-copy
            language="html"
            :code="example_store_template"
          />

          <h2 class="subheading primary--text pa-2">
            Vuex
          </h2>
          <p>Une fois que l'on dispose d'un store, on est tenté de l'enrichir de nombreuses fonctionnalités en profitant de la centralisation des mutations d'état. Cela a été un terrain de recherche pour de nombreuses équipes de développement, notamment en dehors de l'écosystème Vue avec par exemple les travaux sur l'architecture <i>Flux</i> par l'équipe de React.</p>
          <p>
            <a
              href="https://vuex.vuejs.org/"
              target="_blank"
            >Vuex</a> est l'aboutissement de ce pattern de store. Il est fourni par l'équipe de Vue comme solution "officielle" de gestion d'état, et sert de store centralisé pour tous les composants d'une application. Il fonctionne selon les principes suivants:
          </p>

          <ul>
            <li>Une <em>mutation</em> correspond à une méthode permettant de modifier l'état du Store. Elle est obligatoirement synchrone.</li>
            <li>Une <em>action</em> permet de dispatcher une ou plusieurs mutations. Elle peut être asynchrone.</li>
            <li>Les composants modifient l'état applicatif en invoquant des actions</li>
            <li>L'état muté à la suite de mutations met à jour de façon réactive toutes les vues associées, peu importe leur niveau dans l'arborescence</li>
          </ul>
          <img
            src="https://vuex.vuejs.org/vuex.png"
            alt="Vuex et les composants"
          >
          <h2 class="subheading primary--text pa-2">
            Installation de vuex
          </h2>
          <p>Installer la dépendance Vuex, ainsi que Vuex-PersistedState pour persister les stores dans le localStorage</p>
          <code-copy
            code="npm install vuex vuex-persistedstate"
            language="shell"
          />
          <h2 class="subheading primary--text pa-2">
            Création d'un Store vuex
          </h2>
          <p>- Créer un fichier <code>src/store.js</code>, et y placer le contenu suivant</p>
          <code-copy
            :copyable="true"
            :code="vuex_store"
          />
          <p>Le mode strict permet de lancer une erreur si le store Vuex est modifié en dehors des mutateurs. <span style="color: red; font-weight: bold;">Attention !</span> Ce mode doit être désactivé en production !</p>
          <p>- Déclarez le store dans votre application en complétant le fichier <code>main.js</code> comme ceci:</p>
          <code-copy
            code="import store from '@/store'

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
"
          />
          <p>- Pour modifier la valeur d'un élément depuis un composant</p>
          <code-copy code="this.$store.dispatch('setLoggedIn', true)" />
          <p>- Pour déclarer une variable du Store comme propriété</p>
          <code-copy
            code="import {mapState} from 'vuex'
computed: {
    ...mapState([
      'loggedIn'
    ])
  }"
          />
          <h1 class="headline primary--text pa-4">
            TP
          </h1>
          <ol>
            <li>Installez <code>vuex</code> et <code>vuex-persistedstate</code> sur votre projet.</li>
            <li>Créez un store et mettez la variable <code>loggedIn</code> dedans.</li>
            <li>Dans <code>LoginForm.vue</code>, lors du submit, vérifier si l'utilisateur a entré l'adresse mail <code>test@test.com</code> et le mot de passe <code>test123</code>, si c'est le cas mettre à <code>true</code> la valeur de <code>loggedIn</code> dans le store (en utilisant un dispatch).</li>
            <li>Si l'utilisateur a entré de fausses informations, afficher un message d'erreur</li>
            <li>Se connecter avec les identifiants cités ci-haut, puis rafraîchir la page. <i>Question: pourquoi le formulaire de login ne s'affiche plus ?</i></li>
            <li>Ajouter un bouton de déconnexion <code>&lt;button id="logout-btn"&gt;</code> qui modifie la valeur de <code>loggedIn</code> du store</li>
          </ol>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            flat
            nuxt
            to="/reactivity"
          >
            <v-icon left>
              navigate_before
            </v-icon>
            Réactivité
          </v-btn>
          <v-spacer />
          <v-btn
            color="primary"
            flat
            nuxt
            to="/routing"
          >
            Routage
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
      example_shared_state: `const state = {}
// or import state from "@/services/state.js"

const vueA = new Vue({
  data: state
})

const vueB = new Vue({
  data(){
    return {
      sharedState: state,
      privateState: {}
    }
  }
})`,
      example_store: `//store.js
const state = { message: "bonjour" }

export const store = {
  get(prop){
    if(DEBUG_MODE) console.log("[store] get", prop)
    return state[prop]
  },
  set(prop, value){
    if(DEBUG_MODE) console.log("[store] set", prop)
    state[prop] = value
  }
}`,

      example_store_template: `<!-- MyComponent.vue -->
<script>
import store from "@/services/store.js"

export default {
  data(){
    return {
      privateState: {},
      store
    }
  },
  computed: {
    message(){
      return this.store.get("message")
    }
  },
  methods: {
    exit(){
      this.store.set("message", "bye!")
    }
  }
}
<\/script>`,
      vuex_store: `import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState()
  ],
  state: {
    loggedIn: false
  },
  mutations: {
    setLoggedIn (state, loggedIn) {
      state.loggedIn = loggedIn
    }
  },
  actions: {
    setLoggedIn ({commit}, loggedIn) {
      commit('setLoggedIn', loggedIn)
    }
  }
})`
    }
  }
}
</script>
