import Vue from 'vue'
import { Context } from '@nuxt/vue-app'

/**
 * Load admin
 *
 * @exports
 * @param {Context} context nuxt context
 */
export async function load(context) {
  context.app.head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Material+Icons',
  })
  context.app.head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Roboto',
  })

  const blocksModule = await import('../store/admin/blocks')
  const configModule = await import('../store/admin/config')
  context.store.registerModule(['admin', 'blocks'], blocksModule)
  context.store.registerModule(['admin', 'config'], configModule)

  if (process.browser) {
    await import('@getsedona/nuxt-admin-module/dist/admin.css')

    const Quasar = await import('../quasar')
    Vue.use(Quasar.default)

    const admin = await import('../admin')
    Vue.prototype.$admin = admin.default

    const Components = await import('@getsedona/nuxt-admin-module/components')
    Vue.component('AdminPanel', Components.AdminPanel)
  }

  context.store.commit('admin/SET_LOADED')
}

/**
 * Unload admin
 *
 * @exports
 * @param {Context} context nuxt context
 */
export function unload(context) {
  context.store.unregisterModule(['admin', 'blocks'])
  context.store.unregisterModule(['admin', 'config'])
}
