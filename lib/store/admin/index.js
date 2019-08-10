/*
 * Admin Module
 * Private Vuex Module
 */
import get from 'lodash/get'
import { setIdToMenuItems } from '../../utils/nanoid'

export const namespaced = true

export const strict = process.env.NODE_ENV !== 'production'

export const state = () => ({
  config: [],
  breadcrumbs: [
    {
      id: 'home',
      title: 'Home',
    },
  ],
})

export const getters = {
  prevBreadcrumbItem: (store) => () => {
    if (store.breadcrumbs.length === 1 || store.breadcrumbs.length === 2) {
      return store.breadcrumbs[0]
    }
    return store.breadcrumbs[store.breadcrumbs.length - 1]
  },
  toolBarSettngs: (store) => () => {
    const defaults = {
      showHome: true,
      title: '',
      buttons: [],
    }
    return get(store.config, 'toolbar', defaults)
  },
}

export const actions = {}

export const LOAD_CONFIG = 'load admin config'
export const ADD_TO_BREADCRUMBS = 'add menu item to breadcrumbs'

export const mutations = {
  /**
   * Load module config
   *
   * @param {object} store Vuex store
   * @param {object} { config = {} }
   */
  [LOAD_CONFIG](store, { config = {} }) {
    config.items = setIdToMenuItems(config.items)
    store.config = config
  },
  [ADD_TO_BREADCRUMBS](store, { id, title }) {
    store.breadcrumbs.push({ id, title })
  },
}
