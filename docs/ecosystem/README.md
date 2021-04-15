# Vue Ecosystem

Thanks to its popularity, Vue has been enriched by a vast ecosystem of plugins and tools. A (long) list is available here: [awesome-vue](https://github.com/vuejs/awesome-vue).

Here is a selection:

<VueVersionSwitch slotKey="ecosystem" />

::: slot ecosystem-vue2
- [vue-devtools](https://github.com/vuejs/vue-devtools)
  A browser extension very useful for debugging Vue applications. Available on Chrome, Firefox or standalone application.

- [Vue Styleguide](https://vuejs.org/v2/style-guide/)
  A style guide maintained by the official team to list conventions and best practices around Vue projects.

- [vue-axe](https://github.com/vue-a11y/vue-axe)
  An audit tool for checking the accessibility of your Vue applications. It indicates in the developer console the list of accessibility issues identified in your application.

- [vuepress](https://vuepress.vuejs.org/)
  A documentation site builder using Vue (used for this website)
:::

::: slot ecosystem-vue3
- [vue-devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg)
  A browser extension very useful for debugging Vue applications. Available on Chrome, Firefox or standalone application.

- [Vue Styleguide](https://v3.vuejs.org/style-guide/)
  A style guide maintained by the official team to list conventions and best practices around Vue projects.

- [vue-axe](https://github.com/vue-a11y/vue-axe-next)
  An audit tool for checking the accessibility of your Vue applications. It indicates in the developer console the list of accessibility issues identified in your application.

- [vuepress](https://github.com/vuepress/vuepress-next)
  A documentation site builder using Vue (used for this website)
:::

## UI Frameworks

There are many UI frameworks out there with a large number of predefined and already styled components, supposed to meet all your interface needs.

- [Vuetify](https://github.com/vuetifyjs/vuetify)
- [Quasar](https://github.com/quasarframework/quasar)
- [Vue-material](https://github.com/vuematerial/vue-material)
- [buefy](https://github.com/rafaelpimpa/buefy)
- [vue-sax](https://lusaxweb.github.io/vuesax/)

::: warning
A UI Framework does not replace the work of a designer, ergonomist or CSS developer.
:::

## Server-side rendering

Server-side rendering (SSR) consists of replacing traditional front-end servers (Apache / nginx) with JS interpreters (most often Node.js) that will run Vue on the back-end and generate pages on the server side. This helps support clients that have JavaScript disabled, improves search engine indexing, and can improve initial rendering performance.

[Nuxt](http://nuxtjs.org/) is the SSR framework of reference for Vue.js. It provides routing based on the source files and directories, and provides a seamless switch between server-side rendering and client-side taking control after initial render.

## End of exercises - do what you want

- Test some tools that interest you
- Using the UI framework of your choice, beautify your web application :)
