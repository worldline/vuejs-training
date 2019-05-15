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
          Routage
        </v-card-title>
        <v-card-text>
          <p>Les applications Vue sont la plupart du temps des Single Page Applications (SPA), c'est-à-dire que le serveur dessert toujours une seule et même page, et la navigation entre les pages est gérée côté client en JavaScript. Cette approche permet des transitions plus fluides entre pages, et de réduire le nombre d'appels nécessaires au serveur pour naviguer entre les pages. Cela s'avère essentiel pour les Progressive Web Apps ou les applications web souhaitant disposer de fonctionnalités offline.</p>
          <p>Le routage d'une SPA est donc géré côté client, et Vue fournit une bibliothèque à cet effet: <code>vue-router</code>. Ce routeur permet d'associer des routes (URL) à des composants Vue, et propose de nombreuses fonctionnalités:</p>
          <ul>
            <li>Routes imbriquées</li>
            <li>Configuration modulaire basée sur les composants</li>
            <li>Gestion de paramètres dynamiqus, path, query, wildcards</li>
            <li>Intégration avec le système de transitions de Vue</li>
            <li>Deux modes de fonctionnement, par hash ou par history (HTML5) avec auto-fallback pour IE9</li>
            <li>etc.</li>
          </ul>

          <h2 class="subheading primary--text pa-2">
            Installation
          </h2>
          <p>Si vous ne l'avez pas installé à la configuration initiale du projet avec vue-cli, vous pouvez l'ajouter avec la commande <code>vue add router</code>. Ouvrez ensuite le fichier <code>src/router.js</code> pour voir comment sont déclarées les routes.</p>

          <h2 class="subheading primary--text pa-2">
            Exemple de configuration
          </h2>
          <code-copy :code="example_router_config" />

          <p>Notez que le fichier <code>main.js</code> a été modifié pour déclarer ce nouveau routeur</p>
          <code-copy
            code="import router from './router'

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')"
          />

          <h2 class="subheading primary--text pa-2">
            Fonctionnement
          </h2>
          <p>Une fois la résolution de la route terminée, un composant a été associé à l'URL en cours. Ce composant est alors injecté à la place de l'élément <code>&lt;router-view&gt;&lt;/router-view&gt;</code>. Placez donc cet élément dans <code>App.vue</code>. Les éléments autour de cet élément forment typiquement le layout structurant pour votre application ; un header, une barre de navigation, un footer etc.</p>
          <code-copy
            code="<template>
  <div class=&quot;app&quot;>
    <router-view></router-view>
    <footer>Made with Vue</footer>
  </div>
</template>"
            language="html"
          />

          <h2 class="subheading primary--text pa-2">
            Navigation et router-link
          </h2>
          <p>vue-router amène un composant déclaré globalement,  <code>&lt;router-link to=""&gt;&lt;/router-link&gt;</code>, qui peut se substituer aux balises <code>&lt;a&gt;</code> pour tout ce qui est navigation interne.</p>
          <code-copy
            :code="example_router_link"
            language="html"
          />
          <p>Il fournit également des méthodes à tous les composants pour naviguer programmatiquement entre les pages</p>
          <code-copy
            language="javascript"
            :code="example_router_api"
          />

          <h1 class="headline primary--text pa-4">
            TP
          </h1>
          <ol>
            <li>Installez vue-router sur votre projet avec la commande <code>vue add router</code>. Attention, le contenu de <code>App.vue</code> sera écrasé !</li>
            <li>Créer une route <code>/login</code> qui affiche le composant de connexion, et <code>/search</code> pour le formulaire de recherche et les résultats.</li>
            <li>
              A l'aide de la documentation de <a
                href="https://router.vuejs.org/api/"
                target="_blank"
              >vue-router</a>, remplacez la bascule entre LoginForm et SearchFilm à base de <code>v-if</code> en naviguant d'une route à une autre à la place.
            </li>
            <li>
              <i>Bonus</i>: en utilisant les <a
                href="https://router.vuejs.org/guide/advanced/navigation-guards.html"
                target="_blank"
              >Navigation Guards</a> de vue-router, redirigez l'utilisateur voulant accéder à la page de recherche de films vers la page d'authentification si l'utilisateur n'est pas loggé.
            </li>
          </ol>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            flat
            nuxt
            to="/state"
          >
            <v-icon left>
              navigate_before
            </v-icon>
            Gestion d'état
          </v-btn>
          <v-spacer />
          <v-btn
            color="primary"
            flat
            nuxt
            to="/http"
          >
            Requêtes HTTP
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
      example_router_config: `import Router from 'vue-router'
import Vue from 'vue'

import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello-world/:name',
      name: 'hello-world',
      component: HelloWorld
    }
  ]
})`,
      example_router_link: `<router-link to="/about">About page</router-link>
<router-link :to=\"{ name: 'RouteName' }\">Go to route by name</router-link>`,

      example_router_api: `vm.$router.go(-1) // go back to previous pages

let nextId = vm.$route.params.id + 1; // access to route params
vm.$router.push(\`/article/$\{nextId}\`) // go to new page by url`
    }
  }
}
</script>
