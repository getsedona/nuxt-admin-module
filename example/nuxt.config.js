const baseRoute = (env) => (env === 'GH_PAGES' ? '/nuxt-admin-module/' : '/')

export default {
  modules: ['../lib/module.js', '@nuxtjs/axios'],

  plugins: ['~/plugins/admin'],

  css: [{ src: 'sedona-components/src/index.less', lang: 'less' }],

  build: {
    extend(config, { isDev, isClient }) {
      if (isDev) {
        if (isClient) {
          config.module.rules.push({
            enforce: 'pre',
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            exclude: /(node_modules)/,
          })
          config.devtool = 'source-map'
        } else {
          config.devtool = 'inline-source-map'
        }
      }
    },
    extractCSS: true,
  },

  router: {
    base: baseRoute(process.env.DEPLOY_ENV),
  },

  generate: {
    dir: './../dist-docs',
  },

  axios: {
    baseURL: process.env.DEPLOY_ENV === 'GH_PAGES' ? 'https://getsedona.github.io/nuxt-admin-module' : 'http://localhost:3000',
  },
}
