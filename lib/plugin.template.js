import Vue from 'vue'
import { Context } from '@nuxt/vue-app'
import * as blocksPublicModule from './store/blocks'
import * as adminPublicModule from './store/admin'
import { load, unload } from './utils/admin-loader'

// import 'quasar/dist/quasar.css'

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

  // console.log(context.app)

  /* if (Array.isArray(context.app.head.link)) {
    context.app.head.link.push({ rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/quasar@1.9.7/dist/quasar.min.css' })
  } else {
    context.app.head.link = [
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/quasar@1.9.7/dist/quasar.min.css' },
    ]
  } */

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

  Vue.component('TheBlocks', (resolve) =>
    require(['@getsedona/nuxt-admin-module/lib/components/blocks/the-blocks'], resolve)
  )

  /* Vue.prototype.$adminLoader = {
    load: () => load(context),
    unload: () => unload(context),
  } */
}
