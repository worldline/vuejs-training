# Écosystème de Vue

Grâce à sa popularité, Vue s'est enrichi d'un vaste écosystème de plugins et d'outillage. Une (longue) liste est disponible ici : [awesome-vue](https://github.com/vuejs/awesome-vue).

En voici une sélection de quelques-uns :

<VueVersionSwitch slotKey="ecosystem" />

::: slot ecosystem-vue2
- [vue-devtools](https://github.com/vuejs/vue-devtools)
  Une extension navigateur très utile pour déboguer des applications Vue. Disponible sur Chrome, Firefox ou en application standalone.

- [Vue Styleguide](https://vuejs.org/v2/style-guide/)
  Un guide de style maintenu par l'équipe officielle pour lister les conventions et bonnes pratiques autour de projets Vue.

- [vue-axe](https://github.com/vue-a11y/vue-axe)
  Un outil d'audit pour l'accessibilité de vos applications Vue. Il indique en console développeur la liste des défauts d'accessibilité repérés dans le code.

- [vuepress](https://vuepress.vuejs.org/)
  Un générateur de site de documentation utilisant Vue (utilisé pour ce support de formation).
:::

::: slot ecosystem-vue3
- [vue-devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg)
  Une extension navigateur très utile pour déboguer des applications Vue. Disponible sur Chrome, Firefox ou en application standalone.

- [Vue Styleguide](https://v3.vuejs.org/style-guide/)
  Un guide de style maintenu par l'équipe officielle pour lister les conventions et bonnes pratiques autour de projets Vue.

- [vue-axe](https://github.com/vue-a11y/vue-axe-next)
  Un outil d'audit pour l'accessibilité de vos applications Vue. Il indique en console développeur la liste des défauts d'accessibilité repérés dans le code.

- [vuepress](https://github.com/vuepress/vuepress-next)
  Un générateur de site de documentation utilisant Vue (utilisé pour ce support de formation).
:::

## Frameworks UI

Il existe de nombreux frameworks UI avec un grand nombre de composants prédéfinis et déjà stylisés, censés répondre à tous vos besoins en termes d'interface.

- [Vuetify](https://github.com/vuetifyjs/vuetify)
- [Quasar](https://github.com/quasarframework/quasar)
- [Vue-material](https://github.com/vuematerial/vue-material)
- [buefy](https://github.com/rafaelpimpa/buefy)
- [vue-sax](https://lusaxweb.github.io/vuesax/)

::: warning
Note : ne remplace pas le travail d'un designer, ergonome ou développeur CSS.
:::

## Server-side rendering

Le rendu côté serveur (SSR) consiste à remplacer les serveurs frontaux classiques (Apache/nginx) par des interpréteurs JS (le plus souvent Node.js) qui vont exécuter Vue et générer les pages côté serveur. Cela permet de supporter les clients ayant JavaScript désactivé, améliore l'indexation sur les moteurs de recherche et améliore les performances au rendu initial.

[Nuxt](http://nuxtjs.org/) est le framework SSR de référence pour Vue.js. Il propose un routage basé sur l'arborescence des sources, et assure une bascule transparente entre le rendu serveur et la prise en main côté client.

## Fin de TP - exercices libres

- Testez les outils qui vous intéressent
- A l'aide du framework UI de votre choix, enjolivez votre application web :)
