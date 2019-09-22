import { Context } from '@nuxt/vue-app'
import * as blocksPublicModule from './store/blocks'
import { getPublicInfo } from './utils/blocks-meta-loader'
import { load, unload } from './utils/admin-loader'

const options = JSON.parse('<%= JSON.stringify(options) %>')

/**
 * Plugin
 *
 * @exports
 * @param {Context} context Nuxt context
 * @param {Function} inject inject function
 */
export default async function(context, inject) {
  if (context.store === undefined) {
    throw new Error('Nuxt Admin Module requires vuex store')
  }

  context.store.registerModule('blocks', blocksPublicModule)

  /// Load blocks meta

  if (Array.isArray(options.blockFiles) && options.blockFiles.length > 0) {
    const blocksMeta = await getPublicInfo(options.blockFiles)
    context.store.commit(`blocks/${blocksPublicModule.LOAD_BLOCKS_META}`, { blocks: blocksMeta })
  }

  const adminModule = await import('./store/admin')
  context.store.registerModule('admin', adminModule)

  inject('adminLoader', {
    load: () => load(context),
    unload: () => unload(context),
  })
  context.$adminLoader = {
    load: () => load(context),
    unload: () => unload(context),
  }
  /* Vue.prototype.$adminLoader = {
    load: () => load(context),
    unload: () => unload(context),
  } */
}
