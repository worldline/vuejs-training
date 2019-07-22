# Réusabilité et composition

## Mixins

Les [mixins](https://fr.vuejs.org/v2/guide/mixins.html) permettent de créer des ensembles de fonctionnalités réutilisables pour les composants de Vue. En les déclarant via l'option `mixins`, toutes les options du mixin seront fusionnées (merge) avec les options du composant.

```js
// définir un objet mixin
const helloMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

// définition d'un composant qui utilise ce mixin
const Component = Vue.extend({
  mixins: [helloMixin],
  created(){
    console.log('another created callback')
  }
})

let component = new Component()
```

::: tip
En cas de conflit de noms entre une option du mixin et celle du composant, la stratégie de fusion appliquée est la suivante:
- `data`, `methods`, `components` & `directives`: les options du composants ont la priorité
- hooks du cycle de vie (par ex. `mounted`) : déclenchés successivement, les callbacks du mixin en premier
:::

## Directives personnalisées

Vue permet de déclarer ses propres [directives personnalisées](https://fr.vuejs.org/v2/guide/custom-directive.html) - les éléments de syntaxe qui sont utilisés dans les templates de composant. Cette fonction est souvent utilisée par des bibliothèques tierces. Les directives personnalisées permettent de réutiliser de la logique applicative sur plusieurs éléments sans passer par un composant dédié. Veillez toutefois à ne pas en abuser car il est difficile de les tracer et elles peuvent rentrer en conflit avec des évolutions futures de Vue.

```js
// Register a global custom directive called 'v-focus'
Vue.directive('focus', {
  // When the bound element is inserted into the DOM...
  inserted: function (el) {
    // Focus the element
    el.focus()
  }
})
```

## Plugins

Enfin, Vue propose un système de [plugins](https://fr.vuejs.org/v2/guide/plugins.html) servant à ajouter des fonctionnalités au niveau global de l'application. Là encore, il s'agit d'une fonctionnalité principalement utilisée par les bibliothèques tierces et il convient de ne pas en abuser. Les plugins peuvent entre autres:
- ajouter des mixins globales ou de nouveaux composants déclarés globalement
- ajouter des méthodes ou propriétés globalement à tous les composants
- ajouter des directives/filtres/transitions

```js
const NotificationPlugin = {
  install(){
    Vue.component('Notification', NotificationComponent);
    Vue.directive('notify', NotificationDirective):
  }
}

Vue.use(NotificationPlugin)
```

La plupart des bibliothèques tierces de Vue utilisent ce format de plugin pour sa praticité. C'est le cas de `vue-router` par exemple. Les plugins sont reconnus comme tels et placés dans leur propre catégorie sur l'interface Vue UI.