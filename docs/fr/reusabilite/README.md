# Réusabilité et composition

Nous allons passer en revue les différents outils fournis par Vue lorsque nos applications changent d'échelle et que l'on souhaite réutiliser des parties de logique ou de vues au sein de l'application.

## Mixins

Les [mixins](https://fr.vuejs.org/v2/guide/mixins.html) permettent de créer des ensembles de fonctionnalités réutilisables pour les composants de Vue. En les déclarant via l'option `mixins`, toutes les options du mixin seront fusionnées (merge) avec les options du composant.

```js
// définir un objet mixin
const helloMixin = {
  created: function() {
    this.hello();
  },
  methods: {
    hello: function() {
      console.log("hello from mixin!");
    }
  }
};

// définition d'un composant qui utilise ce mixin
const Component = Vue.extend({
  mixins: [helloMixin],
  created() {
    console.log("another created callback");
  }
});

let component = new Component();
```

::: tip
En cas de conflit de noms entre une option du mixin et celle du composant, la stratégie de fusion appliquée est la suivante :

- `data`, `methods`, `components` & `directives` : les options du composants ont la priorité
- hooks du cycle de vie (par ex. `mounted`) : déclenchés successivement, les callbacks du mixin en premier
:::

## Directives personnalisées

Vue permet de déclarer ses propres [directives personnalisées](https://fr.vuejs.org/v2/guide/custom-directive.html) - les éléments de syntaxe qui sont utilisés dans les templates de composant. Cette fonction est souvent utilisée par des bibliothèques tierces. Les directives personnalisées permettent de réutiliser de la logique applicative sur plusieurs éléments sans passer par un composant dédié. Veillez toutefois à ne pas en abuser car il est difficile de les tracer et elles peuvent rentrer en conflit avec des évolutions futures de Vue.

```js
// Register a global custom directive called 'v-focus'
Vue.directive("focus", {
  // When the bound element is inserted into the DOM...
  inserted: function(el) {
    // Focus the element
    el.focus();
  }
});
```

## Plugins

Vue propose un système de [plugins](https://fr.vuejs.org/v2/guide/plugins.html) servant à ajouter des fonctionnalités au niveau global de l'application. Là encore, il s'agit d'une fonctionnalité principalement utilisée par les bibliothèques tierces et il convient de ne pas en abuser. Les plugins peuvent entre autres:

- ajouter des mixins globales ou de nouveaux composants déclarés globalement
- ajouter des méthodes ou propriétés globalement à tous les composants
- ajouter des directives/filtres/transitions

```js
const NotificationPlugin = {
  install(){
    Vue.component('Notification', NotificationComponent);
    Vue.directive('notify', NotificationDirective);
  }
}

Vue.use(NotificationPlugin)
```

La plupart des bibliothèques tierces de Vue utilisent ce format de plugin pour sa praticité. C'est le cas de `vue-router` par exemple. Les plugins sont reconnus comme tels et placés dans leur propre catégorie sur l'interface Vue UI.

## API de Composition

::: tip
Cette section est une nouveauté de Vue 3.0
:::

Petit à petit, certains composants d'une application peuvent devenir très sophistiqués et contenir de plus en plus de data, méthodes, computed, watchers et autres options. Il convient dans la mesure du possible de les découper en plus petits composants, mais cela ne suffit pas parfois pour s'y retrouver. Dans cette situation, le fait de séparer la déclaration des méthodes de celles des data, par exemple, peut commencer à poser problème ; on souhaiterait idéalement regrouper ensemble les options par cohérence de la logique métier, et non par type (méthode, data etc.). Des variables destinées à être utilisées conjointement se retrouvent très éloignées et dispersées dans le code de gros composants complexes.

Pour palier à ce problème, Vue 3 propose une API alternative aux options de composants: la **Composition API**.

Prenons cet exemple utilisant l'API Options que vous connaissez:

```vue
<template>
  <button @click="increment">Clicked {{ count }} {{label}}</button>
</template>

<script>
export default {
  data(){
    return {
      count: 0
    }
  },
  computed: {
    label(){
      return this.count === 1 ? "time" : "times"
    }
  },
  methods: {
    increment(){
      this.count++;
    }
  }
}
</script>
```

Voilà comment il peut être réécrit en utilisant la Composition API:

```vue
<template>
  <button @click="increment">Clicked {{ count }} {{label}}</button>
</template>

<script setup>
import { ref, computed } from "vue"

export const count = ref(0)
export const label = computed(() => count === 1 ? "time" : "times")
export const increment = () => count.value++
</script>
```

Outre le fait que le code est plus synthétique, vous pouvez observer les changements suivants:
- avec l'attribut spécial `setup` de la balise `<script>`, les data, computed, méthodes et autres options peuvent être déclarées n'importe où dans n'importe quel ordre avec le mot-clé `export` ; plus besoin de les regrouper par type
- les options ne sont plus rattachées à un objet (`this.count`) mais manipulées comme des variables indépendantes ; cela implique de les déclarer via des fonctions spécifiques fournies par Vue
- pour les data, il est nécessaire d'encapsuler les valeurs primitives telles que le nombre `count` dans une structure d'objet afin de pouvoir les modifier sans changer de référence (mutation plutôt que réassignation) ; Vue propose à cet effet le conteneur `ref` qui permet de muter la valeur primitive via la propriété `.value`
- pour les data de type objet, qui n'ont pas ce problème de réassignation, on pourra les déclarer avec `reactive`

En bref, avec l'API Options est exporté par défaut un objet contenant toutes les options regroupées par type, tandis qu'avec l'API Composition, on exporte individuellement les différentes options. La Composition API tient son nom du fait que l'on peut déplacer certaines de ses options dans des fichiers séparés, que l'on viendra réutiliser et composer entre vos différents composants. En ce sens, elle peut supplanter les mixins et les plugins, qui seront donc peut-être amenées à disparaître à l'avenir si ce style d'écriture est adopté massivement par la communauté.