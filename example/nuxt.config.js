import NuxtAdminModule from '..'

export default {
  modules: [
    [
      NuxtAdminModule,
      {
        menuItems: [
          {
            title: 'Edit',
            subTitle: 'Edit current post',
            icon: 'edit',
            component: '~admin/components/posts-list',
            section: 'context',
          },
          {
            title: 'Edit',
            subTitle: 'Edit current post',
            icon: 'edit',
            component: '~admin/components/posts-list',
            section: 'context',
          },
          {
            // title: 'Edit',
            // subTitle: 'Edit current post',
            // icon: 'peoples',
            component: '~admin/components/posts-list',
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
