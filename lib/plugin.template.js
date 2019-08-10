import Vue from 'vue'
import { Context } from '@nuxt/vue-app'
import * as blocksPublicModule from './store/blocks'
import { loadBlocksMetaInfo } from './utils/blocks-meta-loader'

const options = JSON.parse('<%= JSON.stringify(options) %>')

/**
 * Module
 *
 * @exports
 * @param {Context} { app, store } Nuxt context
 * @param {Function} inject Inject function
 */
export default async function({ app, store }, inject) {
  if (store === undefined) {
    throw new Error('Nuxt Admin Module requires vuex store')
  }

  store.registerModule('blocks', blocksPublicModule)

  /// Load blocks meta
  if (process.server && Array.isArray(options.blockFiles)) {
    const blocksMeta = await loadBlocksMetaInfo(options.blockFiles)
    store.commit(`blocks/${blocksPublicModule.LOAD_BLOCKS_META}`, { blocks: blocksMeta.public.values() })
  }

  if (!store.state.auth.loggedIn) {
    return
  }

  app.head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Material+Icons',
  })
  app.head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Roboto',
  })

  const adminModule = await import('./store/admin')
  const blocksModule = await import('./store/admin/blocks')
  store.registerModule('admin', adminModule)
  store.registerModule(['admin', 'blocks'], blocksModule)

  /// Load blocks meta
  if (process.server) {
    const blocksMeta = await loadBlocksMetaInfo(options.blockFiles)
    store.commit(`admin/blocks/${blocksModule.LOAD_BLOCKS_META}`, { blocks: blocksMeta.private || [] })
  }

  const admin = await import('./admin')
  inject('admin', admin.default)

  store.commit(`admin/${adminModule.LOAD_CONFIG}`, { config: options })

  if (process.client) {
    const Quasar = await import('./quasar')
    Vue.use(Quasar.default)
  }
}
