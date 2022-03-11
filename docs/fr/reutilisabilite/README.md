# Réusabilité et composition

Nous allons passer en revue les différents outils fournis par Vue lorsque nos applications changent d'échelle et que l'on souhaite réutiliser des parties de logique ou de vues au sein de l'application.


## API de Composition

::: tip
L'API de composition est une nouveauté de Vue 3.0, mais peut être utilisée sur les projets Vue 2 grâce au plug-in [@vue/composition-api](https://github.com/vuejs/composition-api).
:::

Avec le temps, certains composants d'une application peuvent devenir très lourds, avec de plus en plus de data, méthodes, computed, watchers et autres options. Il convient dans la mesure du possible de les découper en plus petits composants, mais cela ne suffit pas parfois pour s'y retrouver.

Dans cette situation, des variables destinées à être utilisées conjointement se retrouvent très éloignées et dispersées dans le code de gros composants complexes. Idéalement, on souhaiterait regrouper ensemble les options par même logique métier, et non par type (méthode, data etc.). 

Pour palier à ce problème, Vue 3 propose une API alternative pour déclarer des composants: la **Composition API**.

Prenons cet exemple utilisant l'API Options que vous connaissez:

```vue
<template>
  <ul>
    <li v-for="todo in todos" :key="todo.label">
      <input type="checkbox" v-model="todo.done"> {{todo.label}}
    </li>
    <li>
      <input type="text" v-model="newTodo" placeholder="New task">
      <button @click="addTodo" :disabled="hasNoLabel">Add to todolist</button>
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      todos: [],
      newTodo: ""
    }
  },
  computed: {
    hasNoLabel(){
      return this.newTodo.trim() === ""
    }
  },
  methods: {
    addTodo(){
      this.todos.push({ label: this.newTodo, done: false })
      this.newTodo = ""
    }
  }
}
</script>
```

Voilà comment il peut être réécrit en utilisant la Composition API:

```vue
<template>
  <ul>
    <li v-for="todo in todos" :key="todo.label">
      <input type="checkbox" v-model="todo.done"> {{todo.label}}
    </li>
    <li>
      <input type="text" v-model="newTodo" placeholder="New task">
      <button @click="addTodo" :disabled="hasNoLabel">Add to todolist</button>
    </li>
  </ul>
</template>

<script setup>
import { ref, reactive, computed } from "vue"

const todos = reactive([])
const newTodo = ref("")
const hasNoLabel = computed(() => newTodo.value.trim() === "")

function addTodo(){
  todos.push({ label: newTodo.value, done: false })
  newTodo.value = ""
}
</script>
```

Outre le fait que le code est plus synthétique, vous pouvez observer les changements suivants:
- avec l'attribut  `setup` de la balise `<script>`, les data, computed, méthodes et autres options peuvent être déclarées au niveau racine du script dans n'importe quel ordre ; plus besoin de les regrouper par type
- les options ne sont plus rattachées à un objet (`this.todos`) mais manipulées comme des variables indépendantes ; cela implique de les déclarer via des fonctions spécifiques fournies par Vue
- pour être réactives, les données doivent maintenant être déclarées avec les méthodes `reactive` et `ref`
- `ref` est utilisé pour encapsuler les valeurs primitives telles que la String `newTodo` dans une structure d'objet `{ value }` afin que vous puissiez changer leur valeur sans changer leur référence (mutation et pas réassignation) ; autrement, Vue perdrait la trace de cette variable (voir la [section Réactivité](../reactivite/)).
- les données stockées comme propriétés d'objets ou éléments de listes n'ayant pas ce problème de réassignement, vous pouvez les déclarer avec la méthode `reactive`

En bref, avec l'API Options est exporté par défaut un objet contenant toutes les options regroupées par type, tandis qu'avec l'API Composition, on exporte individuellement les différentes options. La Composition API tient son nom du fait que l'on peut déplacer certaines de ses options dans des fichiers séparés, que l'on viendra réutiliser et composer entre vos différents composants. 

L'API de Composition est aujourd'hui la meilleure façon de composer de la logique dans les composants Vue, et a supplanté la solution précédente, les [mixins](https://vuejs.org/v2/guide/mixins.html), qui pourraient être amenées à disparaître à l'avenir si ce style d'écriture est adopté massivement par la communauté.

## Directives personnalisées

Vue permet de déclarer ses propres [directives personnalisées](https://fr.vuejs.org/v2/guide/custom-directive.html) - les éléments de syntaxe qui sont utilisés dans les templates de composant. Cette fonction est souvent utilisée par des bibliothèques tierces. Les directives personnalisées permettent de réutiliser de la logique applicative sur plusieurs éléments sans passer par un composant dédié. Veillez toutefois à ne pas en abuser car il est difficile de les tracer et elles peuvent rentrer en conflit avec des évolutions futures de Vue.

<VueVersionSwitch slot-key="custom-directive" />

::: slot custom-directive-vue2
```js
// Enregistre une directive personnalisée globale appelée 'v-focus'
Vue.directive("focus", {
  // quand l'élément correspondant est inséré dans le DOM...
  inserted: function(el) {
    // Mettre le focus sur l'element
    el.focus();
  }
});
```
:::

::: slot custom-directive-vue3
```js
// Enregistre pour votre application une directive personnalisée appelée 'v-focus'
app.directive("focus", {
  // quand l'élément correspondant est inséré dans le DOM...
  mounted: function(el) {
    // Mettre le focus sur l'element
    el.focus();
  }
});
```
:::


## Plugins

Vue propose un système de [plugins](https://fr.vuejs.org/v2/guide/plugins.html) servant à ajouter des fonctionnalités au niveau global de l'application. Là encore, il s'agit d'une fonctionnalité principalement utilisée par les bibliothèques tierces et il convient de ne pas en abuser. Les plugins peuvent entre autres:

- ajouter de nouveaux composants déclarés globalement
- ajouter des méthodes ou propriétés globalement à tous les composants
- ajouter des directives/filtres/transitions

<VueVersionSwitch slot-key="custom-plugin" />

::: slot custom-plugin-vue2
```js
const NotificationPlugin = {
  install(){
    Vue.component('Notification', NotificationComponent);
    Vue.directive('notify', NotificationDirective);
  }
}

Vue.use(NotificationPlugin)
```
:::

::: slot custom-plugin-vue3
```js
const NotificationPlugin = {
  install(app){
    app.component('Notification', NotificationComponent);
    app.directive('notify', NotificationDirective);
  }
}

Vue.use(NotificationPlugin)
```
:::

La plupart des bibliothèques tierces de Vue utilisent ce format de plugin pour sa praticité. C'est le cas de `vue-router` par exemple, qui fournit globalement `<router-view>`, `$router` et `$route`.
