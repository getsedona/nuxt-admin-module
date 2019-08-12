import { Context } from '@nuxt/vue-app'
import * as blocksPublicModule from './store/blocks'
import { getPublicInfo } from './utils/blocks-meta-loader'

const options = JSON.parse('<%= JSON.stringify(options) %>')

/**
 * Module
 *
 * @exports
 * @param {Context} { app, store } Nuxt context
 */
export default async function({ store }) {
  if (store === undefined) {
    throw new Error('Nuxt Admin Module requires vuex store')
  }

  store.registerModule('blocks', blocksPublicModule)

  /// Load blocks meta
  if (process.server && Array.isArray(options.blockFiles)) {
    const blocksMeta = await getPublicInfo(options.blockFiles)
    store.commit(`blocks/${blocksPublicModule.LOAD_BLOCKS_META}`, { blocks: blocksMeta })
  }

  const adminModule = await import('./store/admin')
  store.registerModule('admin', adminModule)
}
