import Vue from 'vue'
import get from 'lodash/get'
import { setIdToMenuItems } from './../utils/nanoid'

export const namespaced = true

export const state = () => ({
  config: [],
  breadcrumbs: [],
  blocks: [],
})

export const getters = {
  /**
   * Get unique and ordered block groups
   *
   * @param {object} store Module store
   * @returns {Set<string>} groups
   */
  blockGroups(store) {
    const groups = store.blocks.map((item) => item.group || 'general').sort()
    return new Set(groups)
  },
  blockFileByName: (store) => (name) => {
    return get(store.blocks.find((item) => item.name === name), 'file', undefined)
  },
  blockMetaByComponent: (store) => (componentName = '') => {
    return store.blocks.find((item) => item.name === componentName)
  },
}

export const actions = {}

export const LOAD_CONFIG = 'load admin config'
export const ADD_TO_BREADCRUMBS = 'add menu item to breadcrumbs'

export const LOAD_BLOCKS_META = 'load blocks meta info'

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
    Vue.set(store.breadcrumbs, store.breadcrumbs.length, { id, title })
  },
  [LOAD_BLOCKS_META](store, { blocks = [] }) {
    Vue.set(store, 'blocks', blocks)
  },
}
