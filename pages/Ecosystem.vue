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
          Ecosystème logiciel de Vue
        </v-card-title>
        <v-card-text>
          <p>
            Grâce à sa popularité, Vue s'est enrichi d'un vaste écosystème de plugins et d'outillage. Une (longue) liste est disponible ici: <a
              href="https://github.com/vuejs/awesome-vue"
              target="_blank"
            >awesome-vue</a>.
          </p>
          <p>En voici une sélection de quelques-uns:</p>

          <h2 class="subheading primary--text pa-2">
            <a
              href="https://github.com/vuejs/vue-devtools"
              target="_blank"
            >vue-devtools</a>
          </h2>
          <p>Une extension navigateur très utile pour déboguer des applications Vue. Disponible sur Chrome, Firefox ou en application standalone.</p>

          <h2 class="subheading primary--text pa-2">
            <a
              href="https://vuejs.org/v2/style-guide/"
              target="_blank"
            >Vue Styleguide</a>
          </h2>
          <p>Un guide de style maintenu par l'équipe officielle pour lister les conventions et bonnes pratiques autour de projets Vue.</p>

          <h2 class="subheading primary--text pa-2">
            <a
              href="https://vue-test-utils.vuejs.org/"
              target="_blank"
            >vue-test-utils</a>
          </h2>
          <p>
            La suite d'outils officielle pour faire des tests unitaires sur des applications Vue. Un <a
              href="https://fr.vuejs.org/v2/guide/unit-testing.html"
              target="_blank"
            >guide d'introduction</a> est également disponible dans la doc officielle. Notez que les tests unitaires sont excellents pour tester la logique, là où les tests end to end ou les tests manuels sont plus pertinents pour tester des pans entiers d'interface.
          </p>

          <h2 class="subheading primary--text pa-2">
            <a
              href="https://github.com/vue-a11y/vue-axe"
              target="_blank"
            >vue-axe</a>
          </h2>
          <p>Un outil d'audit pour l'accessibilité de vos applications Vue. Il indique en console développeur la liste des défauts d'accessibilité repérés dans le code.</p>

          <h2 class="subheading primary--text pa-2">
            <a
              href="https://github.com/kaorun343/vue-property-decorator"
              target="_blank"
            >vue-property-decorator</a>
          </h2>
          <p>
            Une liste de décorateurs utiles si vous codez votre application Vue en TypeScript avec une API à base de l'opérateur <code>class</code>. A noter qu'une telle bibliothèque va probablement être <a
              href="https://github.com/vuejs/rfcs/blob/class-api/active-rfcs/0000-class-api.md"
              target="_blank"
            >fournie officiellement</a> par l'équipe de Vue avec Vue 3, auquel cas celle-ci sera dépréciée.
          </p>

          <h2 class="subheading primary--text pa-2">
            Frameworks UI
          </h2>
          <p>Il existe de nombreux frameworks UI avec un grand nombre de composants prédéfinis et déjà stylisés, censés répondre à tous vos besoins en termes d'interface. <i>Note: ne remplace pas le travail d'un designer, ergonome et développeur CSS</i>.</p>
          <ul>
            <li>
              <a
                href="https://github.com/vuetifyjs/vuetify"
                target="_blank"
              >Vuetify</a> (utilisé pour ce support)
            </li>
            <li>
              <a
                href="https://github.com/quasarframework/quasar"
                target="_blank"
              >Quasar</a>
            </li>
            <li>
              <a
                href="https://github.com/vuematerial/vue-material"
                target="_blank"
              >Vue-material</a>
            </li>
            <li>
              <a
                href="https://github.com/rafaelpimpa/buefy"
                target="_blank"
              >buefy</a>
            </li>
            <li>
              <a
                href="https://lusaxweb.github.io/vuesax/"
                target="_blank"
              >vue-sax</a>
            </li>
          </ul>

          <h2 class="subheading primary--text pa-2">
            Server-side rendering
          </h2>
          <p>Le rendu côté serveur (SSR) consiste à remplacer les serveurs frontaux classiques (Apache/nginx) par des interpréteurs JS (le plus souvent Node.js) qui vont exécuter Vue et générer les pages côté serveur. Cela permet de supporter les clients ayant JavaScript désactivé, améliore l'indexation sur les moteurs de recherche et améliore les performances au rendu initial.</p>
          <p>
            <a
              href="http://nuxtjs.org/"
              target="_blank"
            >Nuxt</a> est le framework SSR de référence pour Vue.js. Il propose un routage basé sur l'arborescence des sources, et assure une bascule transparente entre le rendu serveur et la prise en main côté client.
          </p>

          <v-card-title class="headline primary--text">
            Fin de TP - exercices libres
          </v-card-title>
          <ul>
            <li>Testez les outils qui vous intéressent</li>
            <li>A l'aide du framework UI de votre choix, enjolivez votre application web :)</li>
          </ul>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            flat
            nuxt
            to="/reusability"
          >
            <v-icon left>
              navigate_before
            </v-icon>
            Réutilisabilité
          </v-btn>
          <v-spacer />
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  name: 'Ecosystem',
  components: {}
}
</script>
