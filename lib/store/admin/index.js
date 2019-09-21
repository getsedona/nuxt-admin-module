/*
 * Admin Module
 * Private Vuex Module
 */

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
