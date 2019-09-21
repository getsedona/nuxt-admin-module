import Vue from 'vue'
// import { Context } from '@nuxt/vue-app'

/**
 *
 *
 * @exports
 * @param {any} context asd
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

  await context.store.dispatch('admin/blocks/load')

  const admin = await import('../admin')
  if (process.browser) {
    await import('@getsedona/nuxt-admin-module/dist/admin.css')

    const Quasar = await import('../quasar')
    Vue.use(Quasar.default)
    Vue.prototype.$admin = admin.default
  }

  context.store.commit('admin/SET_LOADED')
}

/**
 *
 *
 * @exports
 * @param {any} context asd
 */
export function unload(context) {
  context.store.unregisterModule(['admin', 'blocks'])
  context.store.unregisterModule(['admin', 'config'])
}
