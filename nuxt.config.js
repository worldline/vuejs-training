const nodeExternals = require('webpack-node-externals')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Formation Vue.js',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Support de formation Vue.js' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
      { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.14.2/styles/agate.min.css' }
    ]
  },
  plugins: ['~/plugins/vuetify.js', '~/plugins/highlight.js'],
  css: ['~/assets/style/app.styl'],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  router: {
    base: '/vuejs-training/', // Customize the base url
    mode: 'hash' // required to host on pages
  },
  /**
   * Generation route
   */
  generate: { dir: 'public' },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^vuetify/],
    plugins: [
      new VuetifyLoaderPlugin()
    ],
    extractCSS: true,
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
      if (process.server) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }
    }
  }
}
