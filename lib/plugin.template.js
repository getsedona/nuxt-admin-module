import Vue from 'vue'
import { Context } from '@nuxt/vue-app'
import * as blocksPublicModule from './store/blocks'
import * as adminPublicModule from './store/admin'
import { load, unload } from './utils/admin-loader'

const options = JSON.parse('<%= JSON.stringify(options) %>')

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

  for (const { file, name } of options.blocks) {
    Vue.component(name, (resolve) => require([`~/components/blocks/${file}`], resolve))
  }

  Vue.component('TheBlocks', (resolve) => require(['@getsedona/nuxt-admin-module/lib/components/blocks/the-blocks'], resolve))

  /* Vue.prototype.$adminLoader = {
    load: () => load(context),
    unload: () => unload(context),
  } */
}
