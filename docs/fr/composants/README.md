# Composants

Jusqu'ici, vous avez vu les options `components` et `data` pour un composant. Nous allons aborder dans cette section toutes les autres.

## Méthodes
Les méthodes du composant sont déclarées dans la propriété `methods`. Elles peuvent alors être appelées depuis une expression dans le template ou depuis une autre méthode du composant avec `this.maMethode()`.

```vue{2,11,14}
<template>
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
      // alors il peut être pertinent de l'externaliser dans un module à part
      alert(message + '!')
    }
  }
}
</script>
```

## Computed et watchers

Il est courant de vouloir placer au sein de vos templates des données qui peuvent être directement déduites à partir d'autres, ou formatées d'une certaine manière. S'il est possible de mettre n'importe quelle expression JavaScript dans une directive, une bonne pratique est de limiter la complexité des templates et la duplication de code en déclarant des **propriétés calculées** dans l'option `computed` du composant.

Une propriété calculée est une donnée pouvant être calculée directement et de façon synchrone à partir d'autres données disponibles (props, data ou autres computed). Cela peut s'apparenter à un *getter*, mais il est aussi possible de spécifier un *setter* pour une propriété calculée. Vue identifiera les variables dont dépend une propriété calculée pour garantir la réactivité quand l'une des dépendances est mutée.

Vue permet également de déclarer des observateurs pour exécuter une certaine fonction lorsqu'une propriété (prop, data ou computed) est mutée. On parle alors de **propriété observée** par un *watcher*. Les propriétés à observer sont à déclarer dans l'option `watch` du composant.

```js{10,15}
var vm = new Vue({
  el: "#app",
  data(){
    return {
      count1: 0,
      count2: 0,
      lastUpdate: null
    }
  },
  computed: {
    total () {
      return this.count1 + this.count2
    }
  },
  watch: {
    total () {
      this.lastUpdate = new Date()
    }
  }
})
```

Pour distinguer les cas d'usage computed vs watcher, on privilégiera le plus souvent les propriétés calculées lorsque c'est possible. Un watcher est plus approprié quand ce qui vous intéresse lors d'une mutation n'est pas tant la nouvelle valeur, mais **le moment où elle survient** ; pour effectuer des requêtes serveur ou des actions externes à Vue par exemple.

## TP: Recherche de films

1. Créer un nouveau composant `SearchFilm.vue` contenant un formulaire de recherche ainsi que la liste de films en résultats dessous :

```vue
<template>
  <div id="search-film">
    <form>
      <label for="search">Rechercher :</label>
      <input id="search" type="text">
    </form>

    <ul class="films">
      <!-- la liste de films à déplacer de LoginForm à ici -->
    </ul>
  </div>
</template>
```

2. Insérez ce composant `SearchFilm` aux côtés de `LoginForm` dans `App.vue` et déplacez les data et autres options correspondantes dans ce nouveau composant.

3. Assignez la variable `films` à une liste vide `[]` initialement. A la soumission du formulaire de recherche, lancez une méthode `searchFilms` qui mettra les 3 films d'exemple dans cette liste.

4. Déclarez une variable computed `numberResults` correspondant au nombre de résultats de recherche, et affichez ce nombre de résultats dans un paragraphe au-dessus de la liste de films.

5. Déclarez une data `query` associée au contenu du champ de recherche, et faites-en sorte que la liste des résultats soit réinitialisée chaque fois que le champ de recherche est modifié, au moyen d'un watcher.

## Cycle de vie d'un composant

Vue travaille avec les composants suivant un schéma bien précis, de leur création jusqu'à leur destruction en passant par les mises à jour de données et leur insertion dans le DOM. Voici le schéma complet :

<VueVersionSwitch slotKey="lifecycle" />

::: slot lifecycle-vue2
![Vue Lifecycle](../../assets/vue2_lifecycle_fr.png)
:::

::: slot lifecycle-vue3
![Vue Lifecycle](../../assets/vue3_lifecycle_fr.svg)
:::

Chaque étape du cycle de vie d'un composant appelle deux fonctions callback, l'une juste avant que le framework intervienne, et l'autre juste après. On peut via ces callbacks définir un comportement spécifique pour le composant à ces moments précis :

```js{2}
export default {
  mounted () {
    console.log(`Le composant a été inséré dans le DOM,
        this.$el pointe vers l'élément correspondant.`)
    this.$el.querySelector('input').focus()
  }
}
```

Typiquement, on utilise `created` comme l'équivalent d'une fonction constructeur, pour initialiser certaines données ou lancer des requêtes HTTP. On utilise `mounted` lorsque certaines étapes à l'initialisation nécessitent d'interagir avec le DOM. Enfin, on utilise `destroyed` (`unmounted` avec Vue 3) pour faire le ménage lorsque le composant n'est plus utilisé, par exemple supprimer des event listeners globaux pour éviter des fuites mémoire. Les autres callbacks sont réservés à des cas d'usage plus spécifiques.

## Communication entre composants

### Communication descendante avec les **props**

Comme tout autre élément HTML, les composants Vue peuvent recevoir des arguments, que l'on appelle les **props** ou propriétés. On se sert des props pour transmettre de l'information d'un composant parent à un composant enfant.

```vue
<ma-popin title="Confirmer l'opération" :actions="confirmActions"></ma-popin>
```

Vous devez déclarer dans l'option `props` du composant la liste des propriétés acceptées. Les props reçues peuvent être utilisées dans les templates ou les méthodes de la même manière que les `data`. La différence est que l'on évitera de réassigner ou muter des props : puisque ces valeurs proviennent du composant parent, il faut plutôt communiquer avec ce parent (*communication ascendante*) pour qu'il effectue lui-même le changement. La valeur changée sera alors automatiquement reportée sur les composants enfant.

```vue{11}
<!-- BlogPost.vue -->
<template>
  <article>
    <h3>{{ title }}</h3>
    <p>{{ content }}</p>
  </article>
</template>

<script>
export default {
  props: ['title','content']
}
</script>
```

```vue{2,4}
<!-- dans un template parent -->
<blog-post :title="article.title" :content="article.content" />
<!-- raccourci équivalent -->
<blog-post v-bind="article" />
```

Facultativement, vous pouvez indiquer le type des props ou fournir des options de validation. Vue rejettera les valeurs non valides avec des messages d'erreur explicites, ce qui s'avère utile lorsque l'on utilise des composants d'origine tierce. Pour plus d'informations sur les options acceptées, [se référer à la documentation](https://vuejs.org/v2/guide/components-props.html).

```vue
<script>
export default {
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
</script>
```

### Communication ascendante avec les **events**

Bien qu'un composant enfant puisse techniquement accéder à son composant parent, il s'agit d'une mauvaise pratique car cela induit une liaison forte entre les composants : le composant perd en généricité, il est plus difficilement réutilisable et le risque de boucle infinie est accentué.

Les composants enfant communiquent donc avec leurs parents au moyen d'**événements** : ils émettent des évènements qui se propagent de parent en parent, de la même manière que les événements du DOM comme un clic de souris. **Un bon composant est agnostique de son environnement**, il ne connaît pas ses parents et ne sait pas si les événements qu'il émet vont être interceptés (ou "écoutés").

Pour **émettre** un événement, on utilise la méthode `$emit` disponible dans tous les composants Vue. Celle-ci prend en paramètre le nom de l'événement, et optionnellement une valeur à transmettre. Si vous avez besoin de transmettre plusieurs valeurs, encapsulez-les dans un objet. La liste des événements émis par un composant est décrite via l'option `emits` du composant, non obligatoire mais recommandée pour documenter le fonctionnement du composant.

Pour **écouter** un événement émis par un composant enfant, on utilise la même directive `v-on` que pour les événements du DOM. La valeur transmise avec l'événement peut être récupérée via `$event`.

```vue{18,21}
<template>
  <article>
    <h3>My article</h3>
    <p>Lorem ipsum...</p>

    <textarea v-model="comment" />
    <button @click="sendComment">Comment</button>
  </article>
</template>

<script>
export default {
  data () {
    return {
      comment: ''
    }
  },
  emits: ['comment'],
  methods: {
    sendComment () {
      this.$emit('comment', this.comment)
    }
  }
}
</script>
```

```vue{2}
<!-- dans un template parent -->
<blog-post @comment="onNewComment($event)" />
```

## Slots et distribution de contenu

Comme les composants Vue sont déclarés sous forme de balises, on peut leur passer des attributs, les props, mais également placer d'autres éléments ou contenu à l'intérieur de ces balises :

```vue
<navigation-link url="/profile">Mon profil<navigation-link>
```

Le contenu enfant est alors placé dans un conteneur qu'on appelle le **slot par défaut**. On peut alors le réinjecter depuis le template du composant avec `<slot></slot>`. Dans l'exemple ci-dessus, l'élément slot sera remplacé au rendu par le texte "Mon profil".

Les slots peuvent contenir n'importe quel contenu HTML, y compris d'autres composants Vue. Ils sont très utiles pour déclarer des composants ayant une fonction de *contenant* plutôt que de *contenu*, comme par exemple des boîtes de dialogue ou des éléments de mise en page.

```vue{5,9}
<!-- MyPopin.vue -->
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
```

```vue{3,4}
<!-- dans un template parent -->
<my-popin>
  <h1 slot="header">Popin title</h1>
  <p>Popin content</p>
</my-popin>
```

En plus du slot par défaut, vous pouvez **nommer** certains slots pour distribuer du contenu à plusieurs emplacements différents, au moyen de la directive `slot` dans le contenu à placer et de l'attribut `name` de l'élément `<slot>` pour identifier le contenant correspondant.

## Références d'éléments

Pour récupérer une référence vers un élément ou un composant enfant dans un template, utilisez la directive `ref`. Une fois le composant monté sur le DOM, l'élément sera accessible via `vm.$refs[votreReference]`.

```vue
<p ref="label">Mon paragraphe</p>
<composant-enfant ref="enfant"></composant-enfant>
```

```js
vm.$refs.label // reference à l'élément paragraphe
vm.$refs.enfant // reference à l'instance de ComposantEnfant
```

## TP: Bien décomposer son application

1. Refactorez le code existant en créant un composant `Film.vue` servant à afficher les détails d'un film. Ajoutez des `props` pour passer les données de chaque film de `<SearchFilm>` vers chaque composant `<Film>`.

2. Afficher le composant `SearchFilm` seulement si l'utilisateur est loggé. Vous devrez pour cela déplacer la data `loggedIn` dans le composant `App` et faire communiquer de `LoginForm` à `App` l'action de login.

**Question** : *quelles difficultés avez-vous rencontré pour utiliser la variable `loggedIn` dans plusieurs composants à la fois ?*

3. Lorsque l'utilisateur arrive sur le formulaire de recherche, mettre le focus sur le champ de recherche en déclarant une `ref` et en utilisant la méthode [`focus()`](https://developer.mozilla.org/fr/docs/Web/API/HTMLElement/focus)

4. **Bonus** : Essayez de retirer la déclaration initiale en liste vide de `films` dans les `data` de `SearchFilm`.

**Question** : *Pourquoi la vue ne se met-elle plus à jour alors que la liste semble être remplie correctement ?*


## API des composants Vue

```js
export default {
  name: 'MonComposant', // pour aider lors du débogage
  components: {}, // composants enfant déclarés
  props: {}, // propriétés du composant
  data() {}, // variables d'état du composant
  computed: {}, // propriétés calculées
  watch: {}, // propriétés observées
  methods: {}, // méthodes
  emits: [], // événements émis par ce composant
  // hooks de cycle de vie du composant
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {},
  deactivated() {},
  beforeDestroy() {}, // beforeUnmount avec Vue 3
  destroyed() {}, // unmounted avec Vue 3
  errorCaptured() {},
}
```

### Propriétés d'instance de vue

::: tip
`vm` est souvent utilisé par convention comme référence à une instance de composant Vue.
:::

- `vm.$data`
- `vm.$props`
- `vm.$slots`
- `vm.$refs`
- `vm.$listeners`
- `vm.$options` : les options passées au composant
- `vm.$el` : référence à l'élément HTML racine sur lequel le composant est monté
- `vm.$parent` : composant parent
- `vm.$root` : composant racine
- `vm.$children` : composants enfant

### Méthodes d'instance de vue

- `vm.$watch` : déclare programmatiquement un watcher
- `vm.$set` : assigne une donnée en forçant la réactivité
- `vm.$delete` : supprime une donnée en forçant la réactivité
- `vm.$on` : déclare programmatiquement un listener
- `vm.$once` : déclare un listener avec le modificateur once
- `vm.$off` : supprime un listener
- `vm.$emit` : émet un événement
- `vm.$mount` : attache le composant à un élément du DOM
- `vm.$destroy` : supprime l'instance de composant
- `vm.$forceUpdate` : force la mise à jour complète du composant (à éviter)
- `vm.$nextTick` : reporte l'exécution d'une fonction au prochain tick (boucle d'événements)
