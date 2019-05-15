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
      <div class="text-xs-center">
        <img
          src="~/assets/vue.svg"
          alt="Vue.js"
          class="mb-5"
          height="100"
        >
      </div>
      <v-card>
        <v-card-title class="headline primary--text">
          Présentation de Vue.js
        </v-card-title>
        <v-card-text>
          <p>Vue (prononcé /vjuː/, comme le terme anglais view) est un framework évolutif pour construire des interfaces utilisateur. À la différence des autres frameworks monolithiques, Vue a été conçu et pensé pour pouvoir être adopté de manière incrémentale. Le cœur de la bibliothèque est concentré uniquement sur la partie vue, et il est vraiment simple de l’intégrer avec d’autres bibliothèques ou projets existants. D’un autre côté, Vue est tout à fait capable de faire tourner des applications web monopages quand il est couplé avec des outils modernes et des bibliothèques complémentaires.</p>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-title class="headline primary--text">
          Historique
        </v-card-title>
        <v-card-text>
          <p>Vue.js a été créé à l'origine par une seule personne, Evan You, ancien ingénieur de Google ayant notamment travaillé avec Angular.js puis sur le framework Meteor. Après avoir expérimenté une mécanique de réactivité qu'il jugeait plus intéressante que celle d'Angular, il décide de publier ses premiers résultats en juillet 2013. Cinq ans plus tard, Vue.js est le 3ème projet sur Github en nombre de stars et Evan enchaîne les conférences à travers le monde.</p>
          <div class="text-xs-center">
            <img
              src="~/assets/img/evanyou.jpg"
              height="400"
            >
          </div>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-title class="headline primary--text">
          L'équipe de développement
        </v-card-title>
        <v-card-text>
          <p>
            Vue dispose aujourd'hui d'une équipe internationale d'une trentaine de personnes, constituée de contributeurs bénévoles qui se sont formés avec les années. La décentralisation complète de l'équipe est à la fois une contrainte et une force qui lui a permis de diffuser le framework beaucoup plus rapidement à plusieurs endroits à la fois. On peut ainsi trouver facilement un contributeur Vue.js pas loin de chez soi, par exemple Guillaume Chau alias <a
              href="https://twitter.com/akryum"
              target="_blank"
            >Akryum</a> à Lyon. Cela permet aussi d'avoir du support rapidement peu importe le fuseau horaire.
          </p>
          <div class="text-xs-center">
            <img
              src="~/assets/img/team.jpg"
              height="400"
            >
            <a
              href="https://vuejs.org/v2/guide/team.html"
              target="blank"
            >https://vuejs.org/v2/guide/team.html</a>
          </div>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-title class="headline primary--text">
          Business model et financement
        </v-card-title>
        <v-card-text>
          <p>Contrairement à React et Angular qui sont portés respectivement par les entreprises Facebook et Google, Vue.js est totalement indépendant et entièrement piloté par la communauté. Ce sont donc les intérêts de la communauté qui priment pour le pilotage du projet et la roadmap à suivre.</p>
          <p>Toutefois, cela soulève la question du financement. Beaucoup de contributeurs sont bénévoles mais pour répondre au gain de popularité du framework, plusieurs ont quitté leur emploi ou sont passés à mi-temps pour s'impliquer sur Vue. Pour se rémunérer, ils comptent ainsi sur du sponsoring et sur des donations individuelles via des sites tels que Patreon. Grâce au succès du framework, Evan et son équipe ont aujourd'hui un soutien financier suffisant pour travailler à plein temps sur Vue, mais également pour organiser des conférences à travers le monde. Et les sources des donations sont suffisamment variées pour préserver l'indépendance du framework.</p>
          <div class="text-xs-center">
            <img
              src="~/assets/img/financement.jpg"
              height="400"
            >
          </div>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-title class="headline primary--text">
          Popularité
        </v-card-title>
        <v-card-text>
          <p>Vue.js a battu des records en termes de hausse de popularité depuis 2015. Il s'agit aujourd'hui du 3ème projet en nombre de stars sur Github. Malgré l'absence de financement, de nombreux meetups et conférences se sont auto-organisés dans différents pays. Il s'agit de l'un des succès les plus retentissants dans le monde open-source depuis ces cinq dernières années.</p>
          <p>Le secret de son succès ? Rien de révolutionnaire: un focus sur la simplicité, une courbe d'apprentissage très faible, une excellente documentation et une communauté à l'écoute.</p>
          <div class="text-xs-center">
            <img
              src="~/assets/img/popularite.jpg"
              height="400"
            >
          </div>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-title class="headline primary--text">
          Comparaison avec les autres frameworks
        </v-card-title>
        <v-card-text>
          <p>Tâchons de comparer Vue avec les deux autres frameworks JS les plus populaires, React et Angular.</p>
          <div class="text-xs-center">
            <img
              src="~/assets/img/react-vue-angular.jpg"
              width="400"
            >
          </div>
          <h2 class="title my-3">
            Points communs entre ces 3 frameworks
          </h2>
          <ul>
            <li>Très populaires, utilisé par de grosses entreprises</li>
            <li>Matures, stables, support à long terme financé</li>
            <li>Codebase orientée composants</li>
            <li>Adapté aux stacks modernes (ES6+ / TypeScript)</li>
            <li>Large écosystème de composants et d’outillage</li>
          </ul>
          <h2 class="title my-3">
            Positionnement / autodescription
          </h2>
          <div class="text-xs-center">
            <img
              src="~/assets/img/autodescription.jpg"
              width="960"
            >
          </div>
          <p>React, Vue et Angular se positionnent dans des catégories différentes et cela s'observe dès les premières lignes d'introduction. React se définit comme une <i>bibliothèque</i> indépendante du reste de la stack technique. Angular se définit comme <i>le framework unique</i> répondant à tous les besoins, desktop comme mobile. Tandis que Vue se positionne entre deux comme un framework progressif, polyvalent et que l'on peut adopter par étapes. Un juste milieu entre une bibliothèque et un framework tout équipé.</p>

          <h2 class="title my-3">
            Langages, style et stack technique
          </h2>
          <div class="text-xs-center">
            <table class="mx-auto">
              <thead>
                <th />
                <th width="300">
                  React
                </th>
                <th width="300">
                  Vue.js
                </th>
                <th width="300">
                  Angular
                </th>
              </thead>
              <tbody>
                <tr>
                  <td>Langage</td>
                  <td>JSX*</td>
                  <td>JSX et TypeScript en option</td>
                  <td>TypeScript*</td>
                </tr>
                <tr>
                  <td>Paradigme</td>
                  <td>Favorise la prog fonctionnelle</td>
                  <td>Favorise la prog déclarative</td>
                  <td>Mélange prog déclarative orientée classes et prog fonctionnelle (RxJS)</td>
                </tr>
                <tr>
                  <td>Gestion d'état</td>
                  <td>State centralisé non mutable (Flux)</td>
                  <td>State centralisé en option (Vuex), sinon interne et mutable</td>
                  <td>State interne et mutable, pas de state centralisé officiel</td>
                </tr>
                <tr>
                  <td>Gestion de la réactivité</td>
                  <td>Manuelle (<code>setState</code> + VDOM diffing)</td>
                  <td>Automatique (observers/Proxies)</td>
                  <td>Automatique (Zones/dirty-checking)</td>
                </tr>
                <tr>
                  <td>Stack</td>
                  <td>Ne se suffit pas à lui-même, à intégrer dans une stack web avec d’autres outils en externe. Ecosystème riche.</td>
                  <td>Quelques outils officiels maintenus par la team Vue, d’autres à chercher en externe. Promeut des solutions tierces si elles sont appopriées.</td>
                  <td>Framework full stack et auto-suffisant, avec options de sécurité incluses nativement. Complet mais plus fermé.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style="font-style: italic; color: gray;">
            * non obligatoire mais fortement recommandé
            <br>State = objet de données représentant l’état de l’application ; interne = propre à chaque composant
          </p>

          <h2 class="title my-3">
            Comparaison en métaphore
          </h2>
          <div class="text-xs-center">
            <img
              src="~/assets/img/react-vue-angular.jpg"
              width="800"
            >
            <img
              src="~/assets/img/react-vue-angular-metaphore.jpg"
              width="800"
            >
          </div>
          <v-layout>
            <v-flex xs4>
              <ul>
                <li>Fait une seule chose mais le fait très bien</li>
                <li>A ne pas mettre entre toutes les mains</li>
                <li>Innovant et disruptif</li>
                <li>Prévoir des pièces de rechange</li>
              </ul>
            </v-flex>
            <v-flex xs4>
              <ul>
                <li>Accessible et simple à prendre en main</li>
                <li>Familiarité à l’utilisation</li>
                <li>Efficace rapidement, peut peiner sur la longueur</li>
                <li>Assez conventionnel, mais gros potentiel de tuning</li>
              </ul>
            </v-flex>
            <v-flex xs4>
              <ul>
                <li>Tout équipé toutes options</li>
                <li>Catégorie poids lourd</li>
                <li>Plus lent au démarrage, mais tient bien la longueur</li>
                <li>Pièces de rechange hors-constructeur plus dures à trouver sur le marché</li>
              </ul>
            </v-flex>
          </v-layout>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="primary"
            flat
            nuxt
            to="/"
          >
            <v-icon left>
              navigate_before
            </v-icon>Accueil
          </v-btn>
          <v-spacer />
          <v-btn
            color="primary"
            flat
            nuxt
            to="/tools"
          >
            Outillage
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
  components: {}
}
</script>

<style scoped>
table {
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #eee;
  padding: 2px;
}

th,
td:first-child {
  background-color: #eee;
  border: 1px solid #ccc;
}
</style>
