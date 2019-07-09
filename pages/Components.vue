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
        <v-card-title class="headline">
          Composants
        </v-card-title>
        <v-card-text>
          <p>Jusqu'ici, vous avez vu les options <code>name</code> et <code>data</code> pour un composant. Nous allons aborder dans cette section toutes les autres.</p>
          <h2 class="subheading primary--text pa-2">
            Méthodes
          </h2>

          <p>Les méthodes du composant sont déclarées dans la propriété <code>methods</code>. Elles peuvent alors être appelées depuis une expression dans le template ou depuis une autre méthode du composant avec <code>this.maMethode()</code>.</p>

          <code-copy
            language="html"
            :code="exampleMethods"
          />

          <h2 class="subheading primary--text pa-2">
            Computed et watchers
          </h2>
          <p>Il est courant de vouloir placer au sein de vos templates des données qui peuvent être directement déduites à partir d'autres, ou formattées d'une certaine manière. S'il est possible de mettre n'importe quelle expression JavaScript dans une directive, une bonne pratique est de limiter la complexité des templates et la duplication de code en déclarant des propriétés <strong>calculées</strong> dans l'option <code>computed</code> du composant.</p>
          <p>Une propriété calculée est une donnée pouvant être calculée directement et de façon synchrone à partir d'autres données disponibles (props, data ou autres computed). Cela peut s'apparenter à un <strong>getter</strong>, mais il est aussi possible de spécifier un <strong>setter</strong> pour une propriété calculée. Vue identifiera les variables dont dépend une propriété calculée pour garantir la réactivité quand l'une des dépendances est mutée.</p>
          <p>Vue permet également de déclarer des observateurs pour exécuter une certaine fonction lorsqu'une propriété (prop, data ou computed) est mutée. On parle alors de propriété <strong>observée</strong> par un <strong>watcher</strong>. Les propriétés à observer sont à déclarer dans l'option <code>watch</code> du composant.</p>

          <code-copy
            language="javascript"
            :code="exampleComputedWatchers"
          />

          <p>Pour distinguer les cas d'usage computed vs watcher, on privilégiera le plus souvent les propriétés calculées lorsque c'est possible. Un watcher est plus approprié quand ce qui vous intéresse lors d'une mutation n'est pas tant la nouvelle <i>valeur</i>, mais le <i>moment</i> où elle survient ; pour effectuer des requêtes serveur ou des actions externes à Vue par exemple.</p>

          <h2 class="subheading primary--text pa-2">
            Cycle de vie d'un composant
          </h2>
          <p>Vue travaille avec les composants suivant un schéma bien précis, de leur création jusqu'à leur destruction en passant par les mises à jour de données et leur insertion dans le DOM. Voici le schéma complet:</p>
          <img
            src="https://fr.vuejs.org/images/lifecycle.png"
            height="1519"
            width="600"
            alt="Vue Lifecycle"
          >
          <p>Chaque étape du cycle de vie d'un composant appelle deux fonctions callback, l'une juste avant que le framework intervienne, et l'autre juste après. On peut via ces callbacks définir un comportement spécifique pour le composant à ces moments précis:</p>
          <code-copy
            language="javascript"
            :code="example_lifecycle"
          />

          <p>Typiquement, on utilise <code>created</code> comme l'équivalent d'une fonction constructeur, pour initialiser certaines données ou lancer des requêtes HTTP. On utilise <code>mounted</code> lorsque certaines étapes à l'initialisation nécessitent d'interagir avec le DOM. Enfin, on utilise <code>destroyed</code> pour faire le ménage lorsque le composant n'est plus utilisé, par exemple supprimer des event listeners globaux pour éviter des fuites mémoire. Les autres callbacks sont réservés à des cas d'usage plus spécifiques.</p>

          <h2 class="subheading primary--text pa-2">
            Communication entre composants: communication descendante avec les <strong>props</strong>
          </h2>
          <p>Comme tout autre élément HTML, les composants Vue peuvent recevoir des arguments, que l'on appelle les <strong>props</strong> ou propriétés. On se sert des props pour transmettre de l'information d'un composant parent à un composant enfant.</p>
          <code-copy
            language="html"
            code="<ma-popin title='Confirmation' :actions='confirmActions'></ma-popin>"
          />
          <p>Vous devez déclarer dans l'option <code>props</code> du composant la liste des propriétés acceptées. Les props reçues peuvent être utilisées dans les templates ou les méthodes de la même manière que les <code>data</code>. La différence est que l'on évitera de réassigner ou muter des props: puisque ces valeurs proviennent du composant parent, il faut plutôt communiquer avec ce parent (communication ascendante) pour qu'il effectue lui-même le changement. La valeur changée sera alors automatiquement reportée sur les composants enfant.</p>

          <code-copy
            language="html"
            :code="example_props"
          />

          <p>
            Facultativement, vous pouvez indiquer le type des props ou fournir des options de validation. Vue rejettera les valeurs non valides avec des messages d'erreur explicites, ce qui s'avère utile lorsque l'on utilise des composants d'origine tierce. Pour plus d'informations sur les options acceptées, <a
              href="https://vuejs.org/v2/guide/components-props.html"
              target="_blank"
            >se référer à la documentation</a>.
          </p>

          <code-copy
            language="html"
            :code="example_props2"
          />

          <h2 class="subheading primary--text pa-2">
            Communication entre composants: communication ascendante avec les <strong>events</strong>
          </h2>

          <p>Bien qu'un composant enfant puisse techniquement lire et réassigner les données de son composant parent, il s'agit d'une mauvaise pratique car cela induit une liaison forte entre les composants: le composant perd en généricité, il est plus difficilement réutilisable et le risque de boucle infinie est accentué.</p>
          <p>Les composants enfant communiquent donc avec leurs parents au moyen d'événements: ils émettent des évènements qui se propagent de parent en parent, de la même manière que les événements du DOM comme un clic de souris. Un bon composant est agnostique de son environnement, il ne connaît pas ses parents et ne sait pas si les événements qu'il emet vont être interceptés (ou "écoutés").</p>

          <p>Pour <strong>émettre</strong> un événement, on utilise la méthode <code>$emit</code> disponible dans tous les composants Vue. Celle-ci prend en paramètre le nom de l'événement, et optionnellement une valeur à transmettre. Si vous avez besoin de transmettre plusieurs valeurs, encapsulez-les dans un objet.</p>

          <p>Pour <strong>écouter</strong> un événement émis par un composant enfant, on utilise la même directive <code>v-on</code> que pour les événements du DOM. La valeur transmise avec l'événement peut être récupérée via la variable <code>$event</code>.</p>

          <code-copy
            language="html"
            :code="example_events"
          />

          <h2 class="subheading primary--text pa-2">
            Distribution de contenu avec les <strong>slots</strong>
          </h2>

          <p>Comme les composants Vue sont déclarés sous forme de balises, on peut leur passer des attributs, les props, mais également placer d'autres éléments ou contenu à l'intérieur de ces balises:</p>
          <code-copy language="html">
            &lt;navigation-link url="/profile"&gt;Mon profil&lt;navigation-link&gt;
          </code-copy>

          <p>Le contenu enfant est alors placé dans un conteneur qu'on appelle le <strong>slot par défaut</strong>. On peut alors le réinjecter depuis le template du composant avec <code>&lt;slot&gt;&lt;/slot&gt;</code>. Dans l'exemple ci-dessus, l'élément slot sera remplacé au rendu par le texte "Mon profil".</p>
          <p>Les slots peuvent contenir n'importe quel contenu HTML, y compris d'autres composants Vue. Ils sont très utiles pour déclarer des composants ayant une fonction de <i>contenant</i> plutôt que de <i>contenu</i>, comme par exemple des boîtes de dialogue ou des éléments de mise en page.</p>

          <code-copy
            language="html"
            :code="example_slots"
          />

          <p>En plus du slot par défaut, vous pouvez <strong>nommer</strong> certains slots pour distribuer du contenu à plusieurs emplacements différents, au moyen de la directive <code>slot</code> dans le contenu à placer et de l'attribut <code>name</code> de l'élément <code>&lt;slot&gt;</code> pour identifier le contenant correspondant.</p>

          <h2 class="subheading primary--text pa-2">
            Référencer un élément dans un template
          </h2>
          <p>Pour récupérer une référence vers un élément ou un composant enfant dans un template, utilisez la directive <code>ref</code>. Une fois le composant monté sur le DOM, l'élément sera accessible via <code>vm.$refs[votreReference]</code>.</p>
          <code-copy
            language="html"
            :code="example_refs"
          />
          <code-copy
            language="javascript"
            :code="example_refs_js"
          />

          <h2 class="subheading primary--text pa-2">
            API complète d'un composant Vue
          </h2>
          <code-copy
            language="javascript"
            :code="componentApi"
          />

          <h2 class="subheading primary--text pa-2">
            Propriétés d'instance de vue
          </h2>
          <ul>
            <li><code>vm.$data</code></li>
            <li><code>vm.$props</code></li>
            <li><code>vm.$slots</code></li>
            <li><code>vm.$refs</code></li>
            <li><code>vm.$listeners</code></li>
            <li><code>vm.$options</code>: les options passées au composant</li>
            <li><code>vm.$el</code>: référence à l'élément HTML racine sur lequel le composant est monté</li>
            <li><code>vm.$parent</code>: composant parent</li>
            <li><code>vm.$root</code>: composant racine</li>
            <li><code>vm.$children</code>: composants enfant</li>
          </ul>

          <h2 class="subheading primary--text pa-2">
            Méthodes d'instance de vue
          </h2>
          <ul>
            <li><code>vm.$watch</code>: déclare programmatiquement un watcher</li>
            <li><code>vm.$set</code>: assigne une donnée en forçant la réactivité</li>
            <li><code>vm.$delete</code>: supprime une donnée en forçant la réactivité</li>
            <li><code>vm.$on</code>: déclare programmatiquement un listener</li>
            <li><code>vm.$once</code>: déclare un listener avec le modificateur <code>once</code></li>
            <li><code>vm.$off</code>: supprime un listener</li>
            <li><code>vm.$emit</code>: émet un événement</li>
            <li><code>vm.$mount</code>: attache le composant à un élément du DOM</li>
            <li><code>vm.$destroy</code>: supprime l'instance de composant</li>
            <li><code>vm.$forceUpdate</code>: force la mise à jour complète du composant (<strong>à éviter</strong>)</li>
            <li><code>vm.$nextTick</code>: reporte l'exécution d'une fonction au prochain tick (boucle d'événements)</li>
          </ul>

          <h1 class="headline primary--text pa-4">
            TP
          </h1>
          <ol>
            <li>Refactorez le code existant en créant un composant <code>Film.vue</code> servant à afficher les détails d'un film. Ajoutez des <code>props</code> et des événéments pour passer les données d'un composant à un autre.</li>
            <li>Créer un autre composant <code>SearchFilm.vue</code> contenant un champ de recherche (input de type text), un bouton pour lancer la recherche, et la liste des résultats dans des <code>Film</code> en dessous.</li>
            <li>Afficher ce formulaire de recherche seulement si l'utilisateur est loggé.</li>
            <li><i>Question :</i> quelles difficultés avez-vous rencontré pour utiliser la variable <code>loggedIn</code> dans plusieurs composants à la fois ?</li>
            <li>Assignez la variable <code>films</code> dans le formulaire de recherche à une liste vide <code>[]</code> initialement. Au submit du formulaire de recherche, lancez une méthode <code>searchFilms</code> qui complétera cette liste avec les données des films vus précédemment.</li>
            <li><i>Question :</i> essayez dans la méthode <code>searchFilms</code> d'assigner les données de cette façon : <code>Object.assign(this.films, filmsData)</code>. Pourquoi la vue ne se met-elle plus à jour ?</li>
          </ol>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            flat
            nuxt
            to="/directives"
          >
            <v-icon left>
              navigate_before
            </v-icon>
            Directives
          </v-btn>
          <v-spacer />
          <v-btn
            color="primary"
            flat
            nuxt
            to="/reactivity"
          >
            Réactivité
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
      exampleMethods: `<template>
  <button @click="greet">Greet</button>
</template>
<script>
export default {
  data() {
    return  {
      name: 'Mark'
    }
  },
  methods: {
    greet: function (event) {
      // 'this' pointe vers l'instance de vue
      this.say('Hi '+ this.name)
    },
    say(message){
      // si une méthode est indépendante de l'instance (pas de référence à 'this')
      // il est pertinent de l'externaliser dans un module à part
      alert(message + '!')
    }
  }
}
<\/script>`,
      exampleComputedWatchers: `var vm = new Vue({
  el: "#app",
  data: () => ({
    count1: 0,
    count2: 0,
    lastUpdate: null
  }),
  computed: {
    total () {
      return count1 + count2
    }
  },
  watch: {
    total () {
      this.lastUpdate = new Date()
    }
  }
})`,
      example_lifecycle: `export default {
  mounted () {
    console.log("Le composant a été inséré dans le DOM, this.$el pointe vers l'élément correspondant.")
    this.$el.parentNode.classList.remove("loading")
  }
}`,
      example_props: `<template>
  <article>
    <h3>{{ title }}</h3>
    <p>{{ content }}</p>
  </article>
</template>

<script>
export default {
  name: 'blog-post',
  props: ['title','content']
}
<\/script>

<!-- dans un template parent -->
<blog-post title="Hello Vue.js" />

<blog-post :title="article.title" :content="article.content" />
<!-- raccourci équivalent -->
<blog-post v-bind="article" />
      `,
      example_props2: `<script>
export default {
  name: 'my-account',
  props: {
    propA: Number, // null matches any type
    propB: [String, Number], // multiple valid types
    propC: {
      type: String,
      default: "test"
    },
    propD: {
      required: true,
      validator: value => value.startsWith("_")
    }
  }
}
<\/script>`,
      example_events: `<template>
  <article>
    <h3>My article</h3>
    <p>Lorem ipsum...</p>

    <textarea v-model="comment" />
    <button @click="sendComment">Comment</button>
  </article>
</template>

<script>
export default {
  name: 'blog-post',
  data () {
    return {
      comment: ''
    }
  },
  methods: {
    sendComment () {
      this.$emit('comment', this.comment)
    }
  }
}
<\/script>

<!-- dans un template parent -->
<blog-post @comment="onNewComment($event)" />`,
      example_slots: `<!-- MyPopin.vue -->
<template>
<div class="popin">
  <div class="popin-header">
    <slot name="header" />
  </div>

  <main class="popin-content">
    <slot />
  </main>
</div>
</template>

<!-- dans un template parent -->
<my-popin>
  <h1 slot="header">Popin title</h1>
  <p>Popin content</p>
</my-popin>`,
      example_refs: `<p ref="label">My content</p>
<child-component ref="subcontent"></child-component>`,
      example_refs_js: `vm.$refs.label // reference to paragraph element
vm.$refs.subcontent // reference to ChildComponent instance`,
      componentApi: `export default {
  name: 'MonComposant', // for debugging purposes
  components: {}, // declared child components
  mixins: [], // share common functionality with component mixins
  extends: {}, // compose new components from others
  props: {}, // component properties/variables
  data() {}, // variables
  computed: {},
  watch: {},
  methods: {},
  // component lifecycle hooks
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {},
  destroyed() {},
  errorCaptured() {},
}`
    }
  },
  components: {
    CodeCopy
  }
}
</script>
