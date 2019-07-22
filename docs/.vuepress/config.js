module.exports = {
  locales: {
    "/": {
      lang: "en-US",// this will be set as the lang attribute on <html>
      title: "Vue.js in depth",
      description: "Vue.js training"
    },
 
    "/fr/": {
      lang: "fr-FR",
      title: "Vue.js en profondeur",
      description: "Une formation d'introduction à Vue.js"
    }
  },

  themeConfig: {
    locales: {
      "/": {
        selectText: "Language",
        label: "English",
        sidebar: [
          "/",
          "/presentation/",
          "/tooling/",
          "/views/",
          "/directives/",
          "/components/",
          "/reactivity/",
          "/state/",
          "/routing/",
          "/http/",
          "/tests/",
          "/reusability/",
          "/ecosystem/"
        ]
      },

      "/fr/": {
        selectText: "Langue",
        label: "Français",
        sidebar: [
          "/fr/",
          "/fr/presentation/",
          "/fr/outillage/",
          "/fr/vues/",
          "/fr/directives/",
          "/fr/composants/",
          "/fr/reactivite/",
          "/fr/etat/",
          "/fr/routage/",
          "/fr/http/",
          "/fr/tests/",
          "/fr/reusabilite/",
          "/fr/ecosysteme/"
        ]
      }
    }
  },

  plugins: [    
    require('./plugins/copy-code/'),
    'vuepress-plugin-global-toc',
    //require('./plugins/global-toc/'),
  ]
}