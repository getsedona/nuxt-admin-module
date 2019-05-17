import NuxtAdminModule from '..'

export default {
  modules: [
    [
      NuxtAdminModule,
      {
        menuItems: [
          {
            title: 'Edit',
            subtitle: 'Edit current post',
            icon: 'edit',
            component: '',
            section: 'context',
          },
          {
            title: 'Edit',
            subtitle: 'Edit current post',
            icon: 'edit',
            component: '',
            section: 'context',
          },
          {
            // title: 'Edit',
            // subtitle: 'Edit current post',
            // icon: 'peoples',
            component: '',
            section: 'general',
          },
        ],
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
