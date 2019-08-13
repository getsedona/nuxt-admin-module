/*
 * Admin Module
 * Private Vuex Module
 */
import Vue from 'vue'

export const namespaced = true

export const strict = process.env.NODE_ENV !== 'production'

export const state = () => ({
  breadcrumbs: [
    {
      id: 'home',
      title: 'Home',
    },
  ],
  loaded: false,
})

export const actions = {
  async load({ dispatch, commit }) {
    /* const blocksModule = await import('./blocks')
    const configModule = await import('./config')
    this.registerModule(['admin', 'blocks'], blocksModule)
    this.registerModule(['admin', 'config'], configModule) */

    this.app.head.link.push({
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Material+Icons',
    })
    this.app.head.link.push({
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Roboto',
    })

    await dispatch('blocks/load')

    if (process.browser) {
      const Quasar = await import('./../../quasar')
      Vue.use(Quasar.default)

      const admin = await import('./../../admin')
      Vue.prototype.$admin = admin.default

      commit('SET_LOADED')
    }
  },
  unload({ commit }) {
    commit('SET_UNLOADED')
    this.unregisterModule(['admin', 'blocks'])
    this.unregisterModule(['admin', 'config'])
  },
}

export const getters = {
  prevBreadcrumbItem: (store) => () => {
    if (store.breadcrumbs.length === 1 || store.breadcrumbs.length === 2) {
      return store.breadcrumbs[0]
    }
    return store.breadcrumbs[store.breadcrumbs.length - 1]
  },
}

export const ADD_TO_BREADCRUMBS = 'add menu item to breadcrumbs'

export const mutations = {
  [ADD_TO_BREADCRUMBS](store, { id, title }) {
    store.breadcrumbs.push({ id, title })
  },
  SET_LOADED(store) {
    store.loaded = true
  },
  SET_UNLOADED(store) {
    store.loaded = false
  },
}
