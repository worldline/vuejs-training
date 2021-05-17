# Routage

Les applications Vue sont la plupart du temps des Single Page Applications (SPA), c'est-à-dire que le serveur dessert toujours une seule et même page, et la navigation entre les pages est gérée côté client en JavaScript. Cette approche permet des transitions plus fluides entre pages, et de réduire le nombre d'appels nécessaires au serveur pour naviguer entre les pages. Cela s'avère essentiel pour les Progressive Web Apps ou les applications web souhaitant disposer de fonctionnalités offline.

Le routage d'une SPA est donc géré côté client, et l'équipe de Vue fournit une bibliothèque à cet effet: `vue-router`. Ce routeur permet d'associer des routes (URL) à des composants Vue, et propose de nombreuses fonctionnalités :

- Arborescence de routes
- Configuration modulaire basée sur les composants
- Gestion de paramètres dynamiques : path, query, wildcards...
- Intégration avec le système de transitions de Vue
- Deux modes de fonctionnement :
  - par `hash` (monsite.com/**#**/page1)
  - ou par `history` (manipulation de l'historique en JS avec auto-fallback pour IE)

## Installation

Si vous ne l'avez pas installé pendant la configuration initiale du projet avec vue-cli, vous pouvez installer `vue-router` maintenant avec `npm`.

Créez un dossier `src/router` et un fichier `router/index.js` qui contiendra la configuration du routeur. Le fichier `main.js` devra être modifié pour déclarer ce nouveau routeur dans l'application:

<VueVersionSwitch slotKey="install-router" />

::: slot install-router-vue2
```bash
npm install vue-router@3
```

```js{6}
import router from "./router";

new Vue({
  render: h => h(App),
  store,
  router
}).$mount("#app");
```
:::

::: slot install-router-vue3
```bash
npm install vue-router@4
```

```js{4}
import router from "./router";

createApp(App)
	.use(router)
	.use(store)
	.mount("#app")
```
:::

## Configuration du routeur

Le routeur est créé en prenant en paramètres un ensemble de routes. Chaque route associe un pattern d'URL à un certain composant. Au chargement de la page, ou à chaque changement d'URL, le routeur va résoudre quelle route est associée à cette nouvelle URL.

<VueVersionSwitch slotKey="router-config" />

::: slot router-config-vue2
```js
/** src/router/index.js **/
import Router from "vue-router";
import Vue from "vue";

import HelloWorld from "@/components/HelloWorld";

Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: "/hello/:name",
      name: "hello",
      component: HelloWorld
    }
  ]
});
```
:::

::: slot router-config-vue3
```js
/** src/router/index.js **/
import { createRouter, createWebHashHistory } from 'vue-router'
import HelloWorld from "@/components/HelloWorld";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/hello/:name",
      name: "hello",
      component: HelloWorld
    }
  ]
})
```
:::

Une fois la résolution de la route terminée, un composant a été associé à l'URL en cours. Ce composant est alors injecté à la place de l'élément `<router-view />`. Cet élément est généralement placé dans le composant racine `App.vue`. Les éléments autour de `<router-view />` forment le layout structurant votre application : un header, une barre de navigation, un footer etc.

```vue
<template>
  <div class="app">
    <header><h1>Mon site web</h1></header>
    <router-view />
    <footer>Made with Vue</footer>
  </div>
</template>
```

## Navigation et router-link

Vue-router inclut un composant `<router-link>` déclaré globalement, qui peut se substituer aux balises `<a>` pour tout ce qui est navigation interne via ce routeur.

L'avantage de ce composant par rapport aux balises classiques `<a>` est que les liens s'adaptent à votre configuration (hash ou history) et peuvent être statiques ou dynamiquement générés par des noms de route et des listes de paramètres :

```vue
<router-link to="/home">Page d'accueil</router-link>
<router-link :to="{ name: 'hello', params: { name: 'John' } }">
  Lien dynamique
</router-link>
```

Vue-router apporte également des méthodes à tous les composants pour naviguer programmatiquement entre les pages:

```js
this.$router.go(-1); // aller à page précédente

let nextId = this.$route.params.id + 1; // récupérer les paramètres d'URL
this.$router.push(`/article/${nextId}`); // naviguer vers une nouvelle page par URL
```

## TP: Implémentation du routeur

1. Si ce n'est pas déjà fait, installez vue-router sur votre projet en suivant les instructions ci-dessus. Ajoutez l'élément `<router-view>` dans `App.vue` puis créez le fichier `src/router/index.js` pour commencer à configurer les routes.

2. Ajouter une route `/login` reliée à la view `LoginForm` et une route `/search` reliée à `SearchFilm`.

::: tip
Par convention, on appelle les composants rattachés à des routes des _views_, et on les place généralement dans le dossier `src/views` plutôt que `src/components`.
:::

3. A l'aide de la documentation de [vue-router](https://router.vuejs.org/api/), remplacez la bascule entre `LoginForm` et `SearchFilm` à base de `v-if` par une navigation d'une route à une autre.

4. **Bonus** : en utilisant les [Navigation Guards](https://router.vuejs.org/guide/advanced/navigation-guards.html) de vue-router, redirigez l'utilisateur voulant accéder à la page de recherche de films vers `/login` si l'utilisateur n'est pas authentifié.
