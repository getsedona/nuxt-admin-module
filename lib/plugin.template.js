import { Context } from '@nuxt/vue-app'
import * as blocksPublicModule from './store/blocks'
import * as adminPublicModule from './store/admin'
import { load, unload } from './utils/admin-loader'

// const options = JSON.parse('<%= JSON.stringify(options) %>')

/**
 * Plugin
 *
 * @exports
 * @param {Context} context Nuxt context
 * @param {Function} inject inject function
 */
export default function(context, inject) {
  if (context.store === undefined) {
    throw new Error('Nuxt Admin Module requires vuex store')
  }

  context.store.registerModule('blocks', blocksPublicModule)
  context.store.registerModule('admin', adminPublicModule)

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
