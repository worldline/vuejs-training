# Gestion d'état

Nous avons vu dans la section précédente comment communiquaient les composants parents et enfants. Toutefois, à mesure que les applications grandissent et se complexifient, des composants très éloignés dans l'arborescence peuvent être amenées à manipuler les mêmes données. Il devient alors très fastidieux de les faire communiquer entre eux pour travailler sur les mêmes références de données. C'est pourquoi il existe des solutions plus ou moins complexes de gestion d'état, ou *state management*.

## Pourquoi une solution de gestion d'état ?

![Problème multiple vues avec props partagés](../../assets/intro-state-management_fr.png)

- parce que propager une variable en `props` d'un composant parent aux composants petits-enfants et arrière-petits-enfants devient vite fastidieux
- pour pouvoir partager de l'information entre différents arbres de composants
- pour déléguer la gestion de données à un service accessible depuis tous les composants
- pour pouvoir persister automatiquement les données (en `localStorage` par ex.)
- pour historiser les états de l'application, faire des rollbacks ou une fonctionnalité *Annuler*
- pour aider au débogage, aux logs, au monitoring ou encore à la transmission de rapports d'erreur

## Données partagées par référence

La solution la plus simple au problème de gestion d'état est de stocker les données au sein d'un ou plusieurs objets déclarés dans leur propre module. Tous les composants voulant manipuler ces données peuvent alors importer l'objet et modifier son contenu en travaillant sur la même référence.

```js
/** stores/state.js **/
export const state = {
    user: null,
    loggedIn: false
}
```

```js
/** LoginForm.vue **/
import state from "stores/state.js"

export default {
  data: { state },
  methods: {
      login(){
          this.state.user = "John Smith"
          this.state.loggedIn = true
      }
  }
}
```

::: tip
Notez qu'on a intentionnellement déclaré `data` comme un objet et non une fonction, afin que les instances du composant utilisent la même référence de données partagées.

Cependant, on peut aussi tout à fait mélanger donnés locales et données partagées :

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

Un pattern un peu plus avancé est de déclarer un objet magasin (*store*) qui encapsule l'objet d'état et sert d'interface de contrôle. L'objet d'état n'est pas directement accessible de l'extérieur par référence, mais le store fournit des méthodes pour interagir avec : typiquement un getter/setter. On pourra ensuite ajouter dans ces méthodes des instructions de débogage, monitoring, mesure de performance etc.

```js
/** stores/store.js **/
import { reactive } from 'vue'

const state = reactive({ message: "bonjour" }); // pas d'export pour l'état

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
import store from "@/stores/store.js"

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

## Pinia

Une fois que l'on dispose d'un store, on est tenté de l'enrichir de nombreuses fonctionnalités en profitant de la centralisation des mutations d'état. Cela a été un terrain de recherche pour de nombreuses équipes de développement, notamment en dehors de l'écosystème Vue avec par exemple les travaux sur l'architecture *Flux* par l'équipe de React.

La communauté Vue est passé par les mêmes étapes pour arriver à [Vuex](https://vuex.vuejs.org/), une proposition pour une solution officielle de gestion d'état avec Vue. Après la sortie de Vue 3 et l'introduction de l'[API de Composition](/fr/reutilisabilite), une nouvelle bibliothèque appelée [Pinia](https://pinia.vuejs.org/) a remplacé VueX au titre de recommandation officielle. C'est ce que nous allons utiliser ici.

Pinia est l'aboutissement de ce pattern de store centralisé. C'est la solution officielle de gestion d'état fournie par l'équipe de Vue. Pinia ne trouvera pas forcément sa place dans tous les projets Vue, mais c'est un très bon atout dans de grosses applications manipulant beaucoup de données.

Pinia fonctionne avec les concepts suivants :

- l'**état**, qui contient les *data* du store à un instant T
- les **actions**, utilisées pour muter l'état du store, équivalent aux *méthodes* des composants
- les **getters**, des raccourcis pour accéder aux données du store, équivalent aux *computed*

Les changements d'état mettent à jour de façon réactive et automatiques toutes les vues utilisant cet état, peu importe leur niveau dans l'arborescence de composants.

## TP : Implémenter un store Pinia

1. Installer les dépendances `pinia` and `pinia-plugin-persistedstate` qu'on utilisera pour persister l'état du store.

<VueVersionSwitch slot-key="install-pinia" />

::: slot install-pinia-vue2
```bash
npm install pinia pinia-plugin-persistedstate @vue/composition-api
```
:::

::: slot install-pinia-vue3
```bash
npm install pinia pinia-plugin-persistedstate
```
:::

2. Créer un store Pinia en créant un fichier `src/stores/session.js` avec le contenu suivant :

```js
import { defineStore } from "pinia";

export const useSession = defineStore('session', {
  persist: true,
  state: () => {
    return {
      user: null,
      loggedIn: false
    }
  },
  actions: {
    login({ user }) {
      this.loggedIn = true
      this.user = user
    }
  }
})
```

3. Déclarez le store dans votre application en complétant le fichier `main.js` comme ceci :

<VueVersionSwitch slot-key="app-store" />

::: slot app-store-vue2
```js{10}
import { createPinia, PiniaVuePlugin } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI) // for Pinia and Vue 2 compat
Vue.use(PiniaVuePlugin)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

new Vue({
  render: h => h(App),
  pinia
}).$mount('#app')
```
:::

::: slot app-store-vue3
```js{8}
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App)
  .use(pinia)
  .mount('#app')
```
:::

4. Dans le code de l'application, récupérez la donnée `loggedIn` depuis le store avec `useSession()`

::: tip
Les fonctions utilitaires `mapState` et `mapActions` fournies avec Pinia permettent d'abréger le code en reliant facilement une donnée du store à une propriété calculée d'un composant, ou un getter à une méthode.

```js
import { useSession } from "@/stores/session"
import { mapState, mapActions } from "pinia";

export default {
    computed: {
        // bind this.loggedIn to useSession().loggedIn
        ...mapState(useSession, ["loggedIn"])
    },
    methods: {
        // bind this.login to useSession().login  
        ...mapActions(useSession, ["login"])
    }
}
```
:::

5. Dans LoginForm.vue, lors du submit, vérifier si l'utilisateur a entré l'adresse mail `test@test.com` et le mot de passe `test1234`. Si c'est le cas, déclencher l'action `login` pour le user `test`.

:::tip
Invoquer une action depuis un composant se fait en l'appelant comme une méthode du store:
```js
const session = useSession()
session.login({ user: { firstname: "John", lastname: "Smith" } });
```
:::

6. Se connecter avec les identifiants cités ci-haut, vérifier que l'on bascule bien sur le formulaire de recherche de films, puis actualiser la page.

**Question** : pourquoi on ne retourne plus sur le formulaire de login après actualisation ?

7. Si l'utilisateur a entré de mauvaises informations, afficher un message d'erreur sous le bouton de connexion. Pour cela, vous pouvez déclarer une String `error` dans les `data` du composant.

8. **Bonus** : Coder une action `logout` et ajouter dans le composant `App` un bouton de déconnexion qui invoque cette action. Afficher le nom de l'utilisateur connecté à côté de ce bouton.