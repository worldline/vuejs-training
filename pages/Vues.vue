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
          Vues
        </v-card-title>
        <v-card-text>
          <v-card-title class="subheading primary--text">
            Aperçu d'un projet Vue
          </v-card-title>
          <p>Le projet Vue fraîchement créé a les dossiers et fichiers suivants :</p>
          <ul>
            <li><code>src</code> : les sources de votre projet</li>
            <li><code>public</code> : tout le contenu qui sera directement mis à la racine du serveur web, sans être passé par Webpack</li>
            <li><code>package.json</code> : les informations de package NPM du projet (version, dépendances, scripts etc.)</li>
            <li><code>vue.config.js</code> : un fichier de configuration pour Vue CLI pour ce projet</li>
          </ul>
          <p>D'autres fichiers de configuration pour les outils de build peuvent également se trouver ici.</p>
          <p>Dans le dossier <code>src</code>, vous trouvez:</p>
          <ul>
            <li><code>assets</code> : des ressources statiques (images, fichiers) qui seront importées par Webpack au sein de vos composants Vue</li>
            <li><code>components</code> : vos composants Vue (répartis par dossier par "module" de votre application)</li>
            <li><code>views</code> : les composants Vue qui seront rattachés à des routes (URL) par vue-router</li>
            <li><code>App.vue</code> : votre composant Vue racine, qui contient toute l'application</li>
            <li><code>main.js</code> : le point d'entrée du code JavaScript de toute l'application</li>
            <li><code>router.js</code> : la configuration de vue-router et la liste des routes déclarées</li>
          </ul>

          <p>Par la suite, vous pourrez être amenés à créer d'autres dossiers dans <code>src</code> selon vos besoins. On trouve par exemple couramment un dossier <code>services</code> qui contient des briques de logique métier avec des fonctions utilisées dans plusieurs composants. Ou encore un dossier <code>utils</code> pour venir stocker diverses fonctions utilitaires en JavaScript plutôt que de les répéter à plusieurs endroits.</p>

          <v-card-title class="subheading primary--text">
            Fichiers .vue
          </v-card-title>
          <ul>
            <li> Une application dans Vue.js est divisée en plusieurs composants</li>
            <li> Un composant correspond à un fichier <code>.vue</code></li>
            <li>
              Un fichier <code>.vue</code> se compose de trois éléments éléments optionnels :
              <ul>
                <li>La balise <code>&lt;template&gt;</code> contient le code HTML du composant</li>
                <li>La balise <code>&lt;script&gt;</code> (optionnelle) contient le code JavaScript du composant</li>
                <li>La balise <code>&lt;style&gt;</code> (optionnelle) contient le style CSS du composant</li>
              </ul>
            </li>
          </ul>
          <code-copy
            :code="snippets.helloWorldTemplate"
            language="html"
          />
          <p>La partie script du composant doit exporter par défaut un objet avec les propriétés du composant. On retrouve ici la propriété <code>name</code>, utile pour identifier le composant pendant le débogage ; et la propriété <code>data</code> qui fixe les données initiales du composant. Les autres propriétés seront abordées dans la section Composants.</p>
          <v-alert
            type="info"
            :value="true"
          >
            D'après vous, pourquoi la propriété <code>data</code> d'un composant doit être une fonction ?
          </v-alert>

          <v-card-title class="subheading primary--text">
            Travailler en composants
          </v-card-title>
          <p>Les composants Vue décrits précédemment constituent les briques avec lesquelles vous allez concevoir vos interfaces web. Une application web est composée de petits composants réutilisables, imbriqués dans des composants de plus haut niveau pour former le layout, l'agencement de vos éléments sur la page. Cette structure peut être décrite comme un <strong>arbre de composants</strong>.</p>
          <div class="text-xs-center">
            <img
              src="~/assets/img/component-tree.png"
              alt="Component tree"
              class="mb-5"
              height="200"
            >
          </div>

          <p>Pour relier les composants entre eux, on déclare les composants enfants dans le template du composant parent, en utilisant leur nom comme balise. Un composant peut être réutilisé autant de fois que nécessaire, en l'incluant de la façon suivante :</p>
          <code-copy
            language="html"
            :code="snippets.childComponent"
          />

          <p>Notez l'option <code>components</code> dans la partie script du composant. Les composants enfants utilisés dans le template doivent être déclarés ainsi, mais il est également possible de déclarer des composants globalement sur votre application Vue, afin de pouvoir les utiliser partout sans avoir à les déclarer manuellement.</p>

          <p>Dans votre projet Vue, observez comment le composant <code>HelloWorld</code> a été intégré au composant racine <code>App</code>.</p>

          <v-card-title class="subheading primary--text">
            Interpolation de texte dans les templates
          </v-card-title>
          <p>
            Le moyen le plus simple d'insérer des données dynamiquement dans vos composants est par interpolation de texte, au moyen de la syntaxe <code v-pre>{{maVariable}}</code>. A l'intérieur des doubles accolades, vous pouvez indiquer n'importe quelle expression JavaScript valide :
            <code-copy
              class="mt-2"
              language="html"
              :code="snippets.interpolationExample"
            />
          </p><p>L'interpolation ne fonctionne que sur le contenu textuel des éléments. Vous ne pouvez pas l'utiliser pour changer la valeur d'attributs HTML ou pour insérer du code HTML par exemple. Pour cela, vous devrez recourir aux directives, que l'on verra dans la section suivante.</p>

          <v-card-title class="headline primary--text">
            TP
          </v-card-title>
          <ol>
            <li>
              Ajouter la feuille de style CSS qui servira de base pour tout le TP. Vous pouvez la télécharger ici: <a
                href="./stylesheet.css"
                download
              >stylesheet.css</a> ; la placer dans le dossier <code>src</code> et l'inclure dans le projet avec <code>import "./stylesheet.css"</code> dans la partie script de <code>App.vue</code>
            </li>
            <li>Créer un nouveau composant <code>LoginForm.vue</code> contenant un formulaire d'authentification</li>
            <code-copy
              language="html"
              :code="snippets.loginFormExercise"
            />
            <li>Supprimez le contenu existant du template du composant <code>App.vue</code>, et affichez le composant <code>LoginForm.vue</code> à la place avec <code>&lt;login-form /&gt;</code>. Vous devrez également déclarer LoginForm dans l'option <code>components</code> du composant App.</li>
            <li>Complétez le fichier <code>LoginForm.vue</code> pour déclarer le nom du composant, ainsi qu'une option <code>data</code> contenant une propriété <code>title</code>. Utiliser ensuite l'interpolation de texte dans le template pour passer le titre du formulaire ("Authentification") en utilisant cette variable <code>title</code>.</li>
          </ol>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            flat
            nuxt
            to="/tools"
          >
            <v-icon left>
              navigate_before
            </v-icon>
            Outillage
          </v-btn>
          <v-spacer />
          <v-btn
            color="primary"
            flat
            nuxt
            to="/directives"
          >
            Directives
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
  data: () => ({
    snippets: {
      helloWorldTemplate: `<template>
  <div>
    <span>Hello {{who}}</span>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      who: 'World'
    }
  }
}
<\/script>

<style scoped>
span {
  color: blue;
}
</style>`,
      childComponent: `<template>
  <div>
    <mon-composant></mon-composant>
  </div>
</template>

<script>
import MonComposant from '~/components/MonComposant.vue'

export default {
  name: 'ComposantParent',
  components: {
    MonComposant
  }
}
<\/script>`,
      interpolationExample: `<template>
  <p>Commande ref. {{ referenceCommande }} - Total: {{ prix.toFixed(2)+'€' }}</p>
</template>

<script>
  export default {
    name: 'InfoCommande',
    data(){
      return {
        referenceCommande: 'ABCXYZ',
        prix: 17.3
      }
    }
  }
<\/script>`,
      loginFormExercise: `<div id="login-form">
<form>
  <h1>Authentification</h1>
  <p>Remplissez ce formulaire pour vous connecter.</p>
  <hr>

  <label for="email"><b>Email</b></label>
  <input type="text" placeholder="Entrez votre courriel" id="email" name="email" required>

  <label for="psw"><b>Mot de passe</b></label>
  <input type="password" placeholder="Entrez votre mot de passe" id="psw" name="psw" required>

  <p><button type="submit">Se connecter</button></p>
</form>
</div>`
    }
  }),
  components: {
    CodeCopy
  }
}
</script>

<style>
ul {
  margin-bottom: 1em;
}
</style>
