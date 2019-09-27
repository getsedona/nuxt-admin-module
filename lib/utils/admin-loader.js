import Vue from 'vue'
import { Context } from '@nuxt/vue-app'

/**
 * Load admin
 *
 * @exports
 * @param {Context} context nuxt context
 */
export async function load(context) {
  const blocksModule = await import('../store/admin/blocks')
  const configModule = await import('../store/admin/config')
  await context.store.registerModule(['admin', 'blocks'], blocksModule)
  await context.store.registerModule(['admin', 'config'], configModule)

  if (process.browser) {
    await import('@getsedona/nuxt-admin-module/dist/admin.css')

    const Quasar = await import('../quasar')
    Vue.use(Quasar.default)

    const admin = await import('../admin')
    Vue.prototype.$admin = admin.default

    await import('@getsedona/nuxt-admin-module/lib/assets/fonts/material-icons.css')
    await import('@getsedona/nuxt-admin-module/lib/assets/fonts/roboto.css')
    window._onNuxtLoaded = async ($root) => {
      await loadAdminPanel($root)
    }
    /* if (window.$nuxt === undefined) {
      window._onNuxtLoaded = async ($root) => {
        await loadAdminPanel($root)
      }
    } else {
      console.log(window.$nuxt)
      await loadAdminPanel(window.$nuxt)
    } */
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

/**
 * Load and mount Admin Panel component
 *
 * @param {Vue} $root root compoennt
 * @returns {Promise<undefined>} void
 */
function loadAdminPanel($root) {
  return new Promise(async (resolve) => {
    const AdminPanel = (await import('@getsedona/nuxt-admin-module/lib/components/router-view/admin-panel')).default
    const adminPanel = new AdminPanel({ parent: $root })
    const $nuxt = document.querySelector('#__nuxt')
    $nuxt.append(adminPanel.$mount().$el)
    resolve()
  })
}
