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
          Outillage
        </v-card-title>
        <v-card-text>
          <v-alert
            :value="true"
            color="info"
            icon="info"
            outline
          >
            Il est recommandé de travailler sous une VM Linux, par exemple
            <a
              target="_blank"
              href="https://github.com/jhipster/jhipster-devbox"
            >JHipster Devbox</a>, ou
            <a
              target="_blank"
              href="https://gitlab.kazan.priv.atos.fr/mts-erable-otvp/mts-erable-dev-vm"
            >Erable Dev VM (Chips Devbox)</a>
          </v-alert>

          <h2 class="subheading primary--text pa-2">
            Node.js
          </h2>
          <p>
            Installez
            <a
              href="https://nodejs.org/"
              target="_blank"
            >Node.js</a> (version 8.x minimum). Vous pouvez utilisez
            <a
              target="_blank"
              href="https://github.com/creationix/nvm"
            >nvm</a> si vous devez installez plusieurs versions différentes de Node.js sur la même machine.
          </p>

          <h2 class="subheading primary--text pa-2">
            Visual Studio Code et Vetur
          </h2>
          <p>Vous aurez besoin d'un bon éditeur de code pour JavaScript lors de cette formation</p>
          <p>
            Nous vous conseillons
            <a
              href="https://code.visualstudio.com/"
              target="_blank"
            >Visual Studio Code</a>, un éditeur gratuit assez léger qui est aujourd'hui très populaire dans la communauté JavaScript.
          </p>
          <p>
            VS Code dispose de nombreuses extensions pour enrichir l'éditeur. Installez l'extension
            <a
              href="https://marketplace.visualstudio.com/items?itemName=octref.vetur"
              target="_blank"
            >Vetur</a> qui aidera l'éditeur à mieux appréhender la syntaxe des fichiers composants
            <code>*.vue</code>.
          </p>

          <h2 class="subheading primary--text pa-2">
            Vue Devtools
          </h2>
          <p>
            Téléchargez l'extension
            <a
              href="https://github.com/vuejs/vue-devtools"
              target="_blank"
            >vue-devtools</a> disponible sur Chrome, Firefox ou en application standalone. Cela vous aidera pour le débogage lors des TP.
          </p>

          <h2 class="subheading primary--text pa-2">
            Vue CLI
          </h2>
          <p>Maintenant, installons les outils nécessaires au développement de projets Vue.js sur votre machine :</p>
          <p>
            Nous aurons besoin d'installer l'utilitaire en ligne appelé
            <a
              target="_blank"
              href="https://cli.vuejs.org/"
            >Vue CLI</a>. Cet utilitaire permet de créer et configurer des projets Vue beaucoup plus facilement.
          </p>
          <p>
            Depuis votre Terminal, lancez la commande suivante pour installer
            <code>@vue/cli</code> en dépendance globale
          </p>
          <code-copy language="console">
            npm install -g @vue/cli
          </code-copy>
          <p>
            Vous avez désormais accès à la commande
            <code>vue</code> depuis un terminal. Essayez-la pour vérifier la bonne installation et pour avoir plus d'informations sur les commandes disponibles:
          </p>
          <pre><code>$ vue
Usage: vue &lt;command> [options]

Options:
  -V, --version                              output the version number
  -h, --help                                 output usage information

Commands:
  create [options] &lt;app-name>                create a new project powered by vue-cli-service
  add [options] &lt;plugin> [pluginOptions]     install a plugin and invoke its generator in an already created project
  invoke [options] &lt;plugin> [pluginOptions]  invoke the generator of a plugin in an already created project
  inspect [options] [paths...]               inspect the webpack config in a project with vue-cli-service
  serve [options] [entry]                    serve a .js or .vue file in development mode with zero config
  build [options] [entry]                    build a .js or .vue file in production mode with zero config
  ui [options]                               start and open the vue-cli ui
  init [options] &lt;template> &lt;app-name>       generate a project from a remote template (legacy API, requires @vue/cli-init)
  config [options] [value]                   inspect and modify the config
  upgrade [semverLevel]                      upgrade vue cli service / plugins (default semverLevel: minor)
  info                                       print debugging information about your environment

  Run vue &lt;command> --help for detailed usage of given command.
          </code></pre>
          <p class="mt-3">
            La commande
            <code>vue ui</code> est très utile pour les débutants: elle fournit une interface graphique sur navigateur dédiée à la gestion des projets Vue et aux tâches courantes d'un projet Vue. L'UI peut remplacer la ligne de commande pour de nombreuses tâches, comme par exemple:
          </p>
          <ul>
            <li>créer ou importer un projet Vue</li>
            <li>ajouter des plug-ins pour plus de fonctionnalités</li>
            <li>configurer l'outillage du projet</li>
            <li>lancer son application</li>
            <li>lancer les tests unitaires</li>
            <li>etc.</li>
          </ul>
          <div class="text-xs-center">
            <img
              src="~/assets/img/vue-cli-3-serve.gif"
              height="400"
            >
            <p>Vue UI: lancement du projet en mode développeur, avec les statistiques en temps réel du bundler (Webpack)</p>
          </div>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-title
          class="headline primary--text"
        >
          Utilisation de Vue.js sans Vue CLI ni étape de build (runtime only)
        </v-card-title>
        <v-card-text>
          <p>Il est tout à fait possible d'utiliser Vue.js sans tout cet outillage sur le poste de développeur. Vue est à la base une bibliothèque JavaScript qui peut être importée et utilisée directement sur les navigateurs des clients.</p>
          <code-copy :code="code_hello_vue" />
          <p>Toutefois, ce mode d'utilisation trouve rapidement ses limites, et l'outillage développeur qui accompagne les projets Vue s'avère très précieux avec le temps. Mais cela peut être utile si vous voulez intégrer des composants Vue dans un projet fait avec un autre framework, ou si vous voulez faire un prototype rapide sans devoir installer d'outillage.</p>
        </v-card-text>
      </v-card>

      <v-card>
        <v-card-title class="headline primary--text">
          Création de votre premier projet
        </v-card-title>
        <v-card-text>
          <p>
            Placez-vous dans votre répertoire de travail et créez un projet appelé
            <code>search-films</code> en lançant la commande :
          </p>
          <code-copy
            code="vue create search-films"
            language="console"
          />
          <p>
            <strong>search-films</strong> étant le nom du répertoire dans lequel nous allons initier notre projet.
          </p>
          <p>
            Choisissez la configuration par défaut
            <code>Default (babel, eslint)</code>.
            <i>Babel</i> est l'outil qui va compiler et convertir votre code afin qu'il soit supporté au mieux par un maximum de navigateurs, tandis que
            <i>eslint</i> est un linter, un outil d'analyse qualité qui va parcourir votre code et vous signaler des erreurs potentielles.
          </p>
          <p>A la fin de l'installation, un dossier a été créé pour votre projet. Naviguez vers le répertoire de votre projet</p>
          <code-copy code="cd search-films" />

          <v-card-title class="subheading primary--text">
            Travailler en mode développeur
          </v-card-title>
          <p>Pour travailler sur l'application et la tester en direct, lancez la commande suivante:</p>
          <code-copy code="npm run serve" />
          <p>
            Votre application sera alors accessible sur
            <a
              href="http://localhost:8080"
            >localhost:8080</a> (port par défaut si disponible).
          </p>

          <p>
            En utilisant
            <code>Visual Studio Code</code>, ouvrez votre projet puis naviguez dans les différents fichiers pour vous approprier l'arborescence du projet.
          </p>

          <v-card-title class="subheading primary--text">
            Build pour la production
          </v-card-title>
          <p>Vous pouvez à tout moment packager votre projet pour la production avec la commande :</p>
          <code-copy code="npm run build" />
          <p>
            Cette commande compilera votre projet en utilisant
            <code>Webpack</code> pour en générer des fichiers JS et CSS optimisés et compressés, prêts a être déployés sur un serveur Apache ou Nginx.
          </p>
          <v-alert
            :value="true"
            color="info"
            icon="info"
            outline
          >
            Les commandes de base de Vue CLI sont listées dans le README.md à la racine du projet
          </v-alert>

          <v-card-title class="subheading primary--text">
            Configuration du projet
          </v-card-title>
          <p>
            À la racine du projet, créez un fichier
            <code>vue.config.js</code>, puis placez-y le contenu suivant
          </p>
          <code-copy :code="code_vue_config" />
          <p>
            Votre projet sera maintenant accessible sur le port 3000 en mode développeur. Consultez la
            <a
              href="https://cli.vuejs.org/config/"
              target="_blank"
            >documentation de configuration</a> pour en savoir plus sur les options disponibles.
          </p>
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="primary"
            flat
            nuxt
            to="/presentation"
          >
            <v-icon left>
              navigate_before
            </v-icon>Présentation
          </v-btn>
          <v-spacer />
          <v-btn
            color="primary"
            flat
            nuxt
            to="/vues"
          >
            Vues
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
  data () {
    return {
      code_hello_vue: `<!DOCTYPE html>
<html>
 <head>
  <meta charset="utf-8">
  <title>Hello Vue</title>
  <script src="https://unpkg.com/vue"><\/script>
 </head>
 <body>
  <div id="app">
   <p>Hello {{name}} !</p>
  </div>

  <script>
  var vm = new Vue({ el: '#app', data: { name: 'Vue' } });
  <\/script>
 </body>
</html>`,
      code_vue_config: `module.exports = {
  devServer: {
    port: 3000
  }
}`
    }
  },
  components: {
    CodeCopy
  }
}
</script>
