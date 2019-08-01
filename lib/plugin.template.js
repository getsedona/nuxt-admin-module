import Vue from 'vue'
import { Context } from '@nuxt/vue-app'
import * as adminModule from './store/admin'
import admin from './admin'

const options = JSON.parse('<%= JSON.stringify(options) %>')

/**
 * Module
 *
 * @exports
 * @param {Context} { app, store } Nuxt context
 * @param {Function} inject Inject function
 */
export default async function({ app, store }, inject) {
  app.head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Material+Icons',
  })
  app.head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Roboto',
  })

  store.registerModule('admin', adminModule)

  /// Load blocks meta
  if (process.server && Array.isArray(options.blockFiles)) {
    const blocksMetaInfo = []
    options.blockFiles.forEach(async (file) => {
      const block = await import(`~/components/blocks/${file}`)
      if (typeof block === 'object') {
        blocksMetaInfo.push(Object.assign({}, block.meta, { file, name: block.default.name }))
      }
    })
    store.commit(`admin/${adminModule.LOAD_BLOCKS_META}`, { blocks: blocksMetaInfo })
  }

  inject('admin', admin)

  store.commit(`admin/${adminModule.LOAD_CONFIG}`, { config: options })

  if (process.client) {
    const Quasar = await import('./quasar')
    Vue.use(Quasar.default)
  }
}
