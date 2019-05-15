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
          Requêtes HTTP
        </v-card-title>
        <v-card-text>
          <h2 class="subheading primary--text pa-2">
            Architecture
          </h2>
          <p>Dans une Single Page Application, la communication avec le serveur se fait via des requêtes AJAX ou des protocoles plus spécialisés comme les WebSocket. Nous allons voir comment intégrer des appels réseau dans une application Vue.</p>
          <p>
            La méthode <code>fetch</code> permet de lancer une requête HTTP en JavaScript et retourne une <code>Promise</code>. Elle n'est pas supportée sur Internet Explorer mais il existe des <i>polyfills</i> pour compléter le support. Comme alternative, vous pouvez passer par d'autres bibliothèques spécialisées telles que
            <a
              href="https://github.com/axios/axios"
              target="_blank"
            >Axios</a>, qui est recommandée par l'équipe de Vue.
          </p>
          <p>On évitera de faire les appels réseau directement depuis le code d'un composant. Cela empêche de réutiliser le code facilement si un autre composant doit faire le même appel réseau. Optez plutôt pour systématiquement séparer la logique applicative de la logique de vos vues.</p>
          <p>Une convention est de mettre la logique applicative dans des fichiers JS appelés "services", distribués selon les grands pans fonctionnels de votre application et placés dans un dossier <code>services</code></p>

          <h2 class="subheading primary--text pa-2">
            Création de services
          </h2>
          <p>- Créer un service générique permettant d'appeler le backend, pour cela, créer un fichier <code>services/api.js</code> :</p>
          <code-copy
            :code="service_api"
            :copyable="true"
            language="javascript"
          />
          <p>Le header <code>Authorization</code> est utilisé pour envoyer le token d'authentification au backend. Les autres options servent à configurer le cache HTTP et les autorisations cross-origin à appliquer.</p>
          <p>- Créer un <code>UserService</code> qui exploitera les endpoints de l'API concernant la manipulation d'utilisateurs:</p>
          <p><code>services/UserService.js</code> :</p>
          <code-copy
            :code="service_user"
            :copyable="true"
            language="javascript"
          />

          <h2 class="subheading primary--text pa-2">
            Utilisation des services
          </h2>
          <p>Nous allons modifier le formulaire d'authentification pour appeler UserService et le back-end. Ajoutez un second bouton pour s'inscrire à côté de celui pour se login, puis modifiez les méthodes de LoginForm comme ceci:</p>
          <p><code>LoginForm.vue</code>:</p>
          <code-copy
            :code="service_call"
            language="javascript"
          />
          <p>Notez que l'on stocke les informations de l'utilisateur dans le store, afin qu'elles soient accessibles depuis n'importe quel composant. Il vous faut donc déclarer les actions et mutations associées dans le store:</p>
          <code-copy
            :copyable="true"
            :code="store_user"
            language="javascript"
          />
          <h1 class="headline primary--text pa-4">
            TP
          </h1>
          <v-alert
            :value="true"
            color="info"
            icon="info"
            outline
          >
            <p>Nous allons nous servir d'un back-end existant pour la connexion et la recherche de films.</p>
            <p>
              La partie "backend" de ce TP a été déployée sur Heroku ; le contrat d'interface du service est disponible sur : <a
                href="https://vue-js-backend.herokuapp.com/api-docs"
                target="_blank"
              >api-docs</a>
            </p>
          </v-alert>
          <ol class="pt-4">
            <li>Branchez le UserService et les actions de login/inscription en suivant les indications ci-dessus.</li>
            <li>La réponse du back-end contient un token permettant d'authentifier l'utilisateur. Ce token devra être envoyé à chaque appel. En cas de succès, ajouter le token dans le store, sinon afficher le message d'erreur. Vérifiez que le token est bien envoyé en header HTTP.</li>
            <li>Créer une action vuex pour la déconnexion, en supprimant le token et les infos utilisateur du store, et rediriger vers le formulaire de login.</li>
            <li>Créez un service <code>FilmService</code> avec une méthode pour rechercher les films, en suivant la documentation de l'API (<code>GET /movies/search</code>).</li>
            <li>Modifier la page de recherche de films pour appeler le back-end et permettre à l'utilisateur d'entrer le nom d'un film, et d'avoir tout le détail de ce film en sortie.</li>
          </ol>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            flat
            nuxt
            to="/routing"
          >
            <v-icon left>
              navigate_before
            </v-icon>
            Routage
          </v-btn>
          <v-spacer />
          <v-btn
            color="primary"
            flat
            nuxt
            to="/reusability"
          >
            Réutilisabilité
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
      service_api: `import store from "@/store.js"

export const BASE_URL = 'https://vue-js-backend.herokuapp.com'

export async function api (url, params = {}) {
    params = Object.assign({
        mode: "cors",
        cache: "no-cache",
    }, params)

    params.headers = Object.assign({
        Authorization: \`Bearer $\{store.state.token}\`,
        "Content-Type": "application/json"
    }, params.headers)

    let response = await fetch(BASE_URL + url, params)
    let json = await response.json()
    if (!response.ok){
        let errorMessage = json && json.error ? json.error.error || json.error : response.status
        throw new Error(errorMessage);
    }
    return json
}`,
      service_user: `import { api } from '@/services/api.js'

export default {
  register (credentials) {
    return api('/user/register', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
  },
  login (credentials) {
    return api('/user/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
  },
  user () {
    return api('/user')
  }
}`,
      service_call: `import UserService from '@/services/UserService.js'

export default {
  methods: {
    async register () {
      try {
        const response = await UserService.register({
          email: this.email,
          password: this.password,
          firstname: "John",
          lastname: "Smith"
        })
        this.$store.dispatch('setUser', response.user)
        this.$store.dispatch('setToken', response.token)
        this.$router.push('/search')
      } catch (error) {
        this.error = error.toString()
      }
    },
    async login () {
      try {
        const response = await UserService.login({ email: this.email, password: this.password })
        this.$store.dispatch('setUser', response.user)
        this.$store.dispatch('setToken', response.token)
        this.$router.push('/search')
      } catch (error) {
        this.error = error.toString()
      }
    }
  }
}`,
      store_user: `import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [
    createPersistedState()
  ],
  state: {
    loggedIn: false,
    token: undefined,
    user: undefined
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      state.loggedIn = !!user
    },
    setToken (state, token) {
      state.token = token
    }
  },
  actions: {
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    setToken ({commit}, token) {
      commit('setToken', token)
    }
  }
})`
    }
  }
}
</script>
