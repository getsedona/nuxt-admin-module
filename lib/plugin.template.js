import Vue from 'vue'
import * as adminModule from './store/admin'

const options = <%= JSON.stringify(options) %>

export default async function({ app, store }) {
  app.head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Material+Icons',
  })
  app.head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Roboto',
  })

  store.registerModule('admin', adminModule)
  store.commit(`admin/${adminModule.LOAD_CONFIG}`, { config: options })

  const Quasar = await import('quasar')
  Vue.use(Quasar.default, {
    framework: {
      components: ['QBtn', 'QIcon', 'QToolbar', 'QToolbarTitle', 'QScrollArea', 'QList', 'QItem'],
    },
    extras: ['roboto-font'],
  })
}
