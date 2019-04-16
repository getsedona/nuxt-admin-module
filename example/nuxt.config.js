import NuxtAdminModule from '..'

export default {
  modules: [
    [
      NuxtAdminModule,
      {
        testKey: 'testParamValue',
      },
    ],
  ],

  build: {
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },
  },
}
