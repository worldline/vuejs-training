# State management

Nous avons vu dans la section précédente comment communiquaient les composants parents et enfants. Toutefois, à mesure que les applications grandissent et se complexifient, des composants très éloignés dans l'arborescence peuvent être amenées à manipuler les mêmes données. Il devient alors très fastidieux de les faire communiquer entre eux pour travailler sur les mêmes références de données. C'est pourquoi il existe des solutions plus ou moins complexes de gestion d'état, ou *state management*.

## Pourquoi une solution de gestion d'état ?

![Problème multiple vues avec props partagés](../assets/intro-state-management.png)

- parce que propager une variable en `props` d'un composant parent aux composants petits-enfants et arrière-petits-enfants devient vite fastidieux
- pour pouvoir partager de l'information entre différents arbres de composants
- pour déléguer la gestion de données à un service accessible depuis tous les composants
- pour pouvoir persister automatiquement les données (en `localStorage` par ex.)
- pour historiser les états de l'application, faire des rollbacks ou une fonctionnalité *Annuler*
- pour aider au débogage, aux logs, au monitoring ou encore à la transmission de rapports d'erreur

## Données partagées par référence

La solution la plus simple au problème de gestion d'état est de stocker les données au sein d'un ou plusieurs objets déclarés dans leur propre module. Tous les composants voulant manipuler ces données peuvent alors importer l'objet et modifier son contenu en travaillant sur la même référence.

```js
/** services/state.js **/
export const state = {
    user: null,
    loggedIn: false
}
```

```js
/** LoginForm.vue **/
import state from "services/state.js"

export default {
  data: { state },
  methods: {
      login(){
          this.state.user = "John Smith"
          this.state.loggedIn = true
      }
  }
})
```

::: tip
Notez qu'on a intentionnellement déclaré `data` comme un objet et non une fonction, afin que les instances du composant utilisent la même référence de données partagées.

Cependant, on peut aussi tout à fait mélanger donnés locales et données partagées:

```js
data(){
  return {
    sharedState: state,
    privateState: { ... }
  }
}
```
:::

Cette solution peut faire l'affaire dans de nombreux cas, mais montre rapidement ses limites au débogage lorsqu'un grand nombre de composants différents interagissent avec les données. En effet, les mutations des objets d'état ne sont tracées nulle part, il est donc difficile de trouver la source d'un bug.

## Store et mutations contrôlées

Un pattern un peu plus avancé est de déclarer un objet magasin (*store*) qui encapsule l'objet d'état et sert d'interface de contrôle. L'objet d'état n'est pas directement accessible de l'extérieur par référence, mais le store fournit des méthodes pour interagir avec: typiquement un getter/setter. On pourra ensuite ajouter dans ces méthodes des instructions de débogage, monitoring, mesure de performance etc.

```js
/** services/store.js **/
const state = { message: "bonjour" } // pas d'export pour l'état

export const store = {
  get(prop){
    if(DEBUG_MODE) console.log("[store] get", prop)
    return state[prop]
  },
  set(prop, value){
    if(DEBUG_MODE) console.log("[store] set", prop)
    state[prop] = value
  }
}
```

```vue
<!-- MyComponent.vue -->
<script>
import store from "@/services/store.js"

export default {
  data(){
    return {
      privateState: {},
      store
    }
  },
  computed: {
    message(){
      return this.store.get("message")
    }
  },
  methods: {
    exit(){
      this.store.set("message", "bye!")
    }
  }
}
</script>
```

## Vuex

Une fois que l'on dispose d'un store, on est tenté de l'enrichir de nombreuses fonctionnalités en profitant de la centralisation des mutations d'état. Cela a été un terrain de recherche pour de nombreuses équipes de développement, notamment en dehors de l'écosystème Vue avec par exemple les travaux sur l'architecture *Flux* par l'équipe de React.

[Vuex](https://vuex.vuejs.org/) est l'aboutissement de ce pattern de store centralisé. C'est solution officielle de gestion d'état fournie par l'équipe de Vue. Vuex ne trouvera pas forcément sa place dans tous les projets Vue, mais c'est un très bon atout dans de grosses applications manipulant beaucoup de données.

Vuex fonctionne selon les principes suivants:
- Une **mutation** est une fonction qui modifie l'état du store. Elle est obligatoirement **synchrone**.
- Une **action** est une fonction qui déclenche une ou plusieurs mutations. Elle peut être **asynchrone**.
- Les composants modifient l'état applicatif en invoquant des actions
- L'état muté à la suite de mutations met à jour de façon réactive toutes les vues associées, peu importe leur niveau dans l'arborescence

![Vuex et les composants](../assets/vuex.png)

## TP: Implémenter un store Vuex

1. Installer les dépendances `vuex` et `vuex-persistedstate` qu'on utilisera pour persister l'état du store.

```bash
npm install vuex vuex-persistedstate
```

2. Créer un store Vuex en créant un fichier `src/store.js` avec le contenu suivant:

```js{8}
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [ createPersistedState() ],
  state: {
    user: null,
    loggedIn: false
  },
  mutations: {
    setLoggedIn (state, loggedIn) {
      state.loggedIn = loggedIn
    },
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    login ({ commit }, { user }) {
      commit('setLoggedIn', true)
      commit('setUser', user)
    }
  }
})
```

::: warning
Le mode `strict` permet de lancer une erreur si le store Vuex est modifié en dehors des mutateurs. Attention, ce mode est coûteux en performance et doit être désactivé en production !
:::

3. Déclarez le store dans votre application en complétant le fichier `main.js` comme ceci:

```js{1,5}
import store from '@/store'

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
```

4. Dans le code de l'application, supprimez les passages de prop `loggedIn` de composant à composant et récupérez la donnée depuis le store à la place (`this.$store.state.loggedIn`)

::: tip
La fonction utilitaire `mapState` fournie avec Vuex permet d'abréger le code en reliant facilement une donnée du store à une propriété calculée d'un composant

```js
import {mapState} from 'vuex'

export default {    
  computed: {
    // relie this.loggedIn à this.$store.state.loggedIn
    ...mapState([ 'loggedIn' ])
  }
}
```
:::

5. Dans LoginForm.vue, lors du submit, vérifier si l'utilisateur a entré l'adresse mail `test@test.com` et le mot de passe `test1234`. Si c'est le cas, déclencher l'action `login` pour le user `test`.

:::tip
Invoquer une action depuis un composant se fait comme ceci:
```js
this.$store.dispatch('login', { user: 'John Smith' })
```
:::

6. Se connecter avec les identifiants cités ci-haut, vérifier que l'on bascule bien sur le formulaire de recherche de films, puis actualiser la page. 

**Question** : pourquoi on ne retourne plus sur le formulaire de login après actualisation ?

7. Si l'utilisateur a entré de mauvaises informations, afficher un message d'erreur. Pour cela, vous pouvez vous aider d'une `data` supplémentaire comme une String `loginError` par exemple.

8. **Bonus**: Coder une action `logout` et ajouter un bouton de déconnexion `<button id="logout-btn">` qui invoque cette action. Afficher le nom de l'utilisateur à côté de ce bouton.