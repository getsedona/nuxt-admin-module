import Vue from 'vue'
import { Context } from '@nuxt/vue-app'
import * as adminModule from './store/admin'
// import * as blocksModule from './store/blocks'
import * as blocksModulePublic from './store/blocks-public'
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

  if (store === undefined) {
    throw new Error('Nuxt Admin Module requires vuex store')
  }
  store.registerModule('admin', adminModule)
  // store.registerModule('blocks', blocksModule)
  store.registerModule('blocks', blocksModulePublic)

  /// Load blocks meta
  if (process.server && Array.isArray(options.blockFiles)) {
    options.blockFiles.forEach(async (file) => {
      const block = await import(`~/components/blocks/${file}`)
      if (typeof block === 'object') {
        const blockMeta = Object.assign({}, block.meta, { file, name: block.default.name })
        store.commit(`admin/${adminModule.LOAD_BLOCK_META}`, { block: blockMeta })
      }
    })
  }

  inject('admin', admin)

  store.commit(`admin/${adminModule.LOAD_CONFIG}`, { config: options })

  if (process.client) {
    const Quasar = await import('./quasar')
    Vue.use(Quasar.default)
  }
}
