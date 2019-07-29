import Vue from 'vue'
import { Context } from '@nuxt/vue-app'
import * as adminModule from './store/admin'

const options = JSON.parse('<%= JSON.stringify(options) %>')

/**
 * Module
 *
 * @exports
 * @param {Context} { app, store } Nuxt context
 */
export default async function({ app, store }) {
  app.head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Material+Icons',
  })
  app.head.link.push({
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Roboto',
  })

  store.registerModule('admin', adminModule)
  store.commit(`admin/${adminModule.LOAD_CONFIG}`, { config: options })

  if (process.client) {
    const Quasar = await import('./quasar')
    Vue.use(Quasar.default)
  }
}
