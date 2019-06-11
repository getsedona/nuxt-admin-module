export default {
  modules: [
    [
      '../lib/module',
      {
        menuItems: [
          {
            title: 'Edit',
            subTitle: 'Edit current post',
            icon: 'edit',
            // component: resolve(__dirname, 'admin/components/posts-list'),
            section: 'context',
          },
          {
            title: 'Edit',
            subTitle: 'Edit current post',
            icon: 'edit',
            component: '@@/example/admin/components/posts-list',
            section: 'context',
          },
          {
            // title: 'Edit',
            // subTitle: 'Edit current post',
            // icon: 'peoples',
            component: '@@/example/admin/components/posts-list',
            section: 'general',
          },
        ],
      },
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
