export default {
  modules: [
    [
      '../lib/module',
    ],
  ],

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
}
