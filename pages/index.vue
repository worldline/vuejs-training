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
          Bienvenue
        </v-card-title>
        <v-card-text>
          <div class="text-xs-center">
            <img
              src="~/assets/vue.svg"
              alt="Vue.js"
              class="mb-5"
              height="100"
            >
          </div>
          <p>Bienvenue dans cette formation dédiée à Vue.js et son écosystème :-)</p>
          <v-card-title class="subheading primary--text">
            Prérequis
          </v-card-title>
          <ul>
            <li>Avoir des bases en JavaScript et un peu sur l'écosystème Node.js</li>
            <li>Avoir des bases en HTML</li>
            <li>
              Préparer son environnement de dev et ses installations pour le début de la formation (voir
              <router-link to="tools">
                section Outillage
              </router-link>)
            </li>
          </ul>
          <br>

          <h2 class="subheading primary--text pa-2">
            Liens utiles
          </h2>
          <ul>
            <li>
              <a
                href="https://fr.vuejs.org/v2/guide/"
                target="_blank"
              >Documentation officielle de Vue.js en français</a>
            </li>
            <li>
              <a
                href="https://github.com/worldline/vuejs-training"
                target="_blank"
              >Repo Github de ce support de formation</a>
            </li>
            <li>
              <a
                href="http://slides.com/sylvainpv/introduction-vuejs-10#/"
                target="_blank"
              >Slides: Introduction to Vue.js - COTRECS octobre 2018</a>
            </li>
          </ul>

          <h2 class="subheading primary--text pa-2">
            Plan de la formation
          </h2>
          <ol>
            <li>
              Presentation
              <ul>
                <li>Qu'est-ce que Vue.js</li>
                <li>Historique</li>
                <li>Equipe, financement, communauté et stats</li>
                <li>Comparaison avec React et Angular</li>
              </ul>
            </li>

            <li>
              Outillage
              <ul>
                <li>Setup et installation des outils requis</li>
                <li>Utilisation de Vue.js sans vue-cli</li>
                <li>Création d'un projet Vue</li>
              </ul>
            </li>
            <li>
              Vues
              <ul>
                <li>Fichiers monocomposants *.vue</li>
                <li>Aperçu de l'architecture d'un projet Vue</li>
                <li>Arborescence de composants</li>
                <li>Interpolation dans les templates</li>
              </ul>
            </li>
            <li>
              Directives
              <ul>
                <li>Lier des attributs, styles et classes</li>
                <li>Formulaires et champs de saisie</li>
                <li>Conditions</li>
                <li>Boucles</li>
                <li>Evénéments</li>
              </ul>
            </li>
            <li>
              Composants
              <ul>
                <li>Méthodes</li>
                <li>Propriétés calculées et observées</li>
                <li>Cycle de vie du composant</li>
                <li>Communication entre composants</li>
                <li>Slots</li>
                <li>Références</li>
              </ul>
            </li>
            <li>Réactivité dans Vue</li>
            <li>
              Gestion d'état
              <ul>
                <li>Etat partagé</li>
                <li>Pattern de store</li>
                <li>VueX</li>
              </ul>
            </li>
            <li>Routage avec vue-router</li>
            <li>Requêtes HTTP et services</li>
            <li>
              Réutilisabilité et composition
              <ul>
                <li>Mixins</li>
                <li>Directives personnalisées</li>
                <li>Plugins</li>
              </ul>
            </li>
            <li>Ecosystème logiciel de Vue.js</li>
            <li>Tester son application</li>
          </ol>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            flat
            nuxt
            to="/presentation"
          >
            Presentation
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
export default {
  name: 'Index',
  components: {}
}
</script>
