const baseRoute = (env) => (env === 'GH_PAGES' ? '/nuxt-admin-module/' : '/')

export default {
  modules: [['../lib/module'], '@nuxtjs/axios'],

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
  },

  router: {
    base: baseRoute(process.env.DEPLOY_ENV),
  },

  generate: {
    dir: './../docs',
  },
}
