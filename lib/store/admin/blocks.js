/*
 * Blocks Module
 * Private Vuex Module
 */
import get from 'lodash/get'

export const namespaced = true

export const strict = process.env.NODE_ENV !== 'production'

export const state = () => ({
  items: JSON.parse('<%= JSON.stringify(options.blocks) %>'),
})

export const actions = {}

export const getters = {
  /**
   * Get unique and ordered block groups
   *
   * @param {object} store Module store
   * @returns {Set<string>} groups
   */
  blockGroups(store) {
    const groups = get(store, 'items', [])
      .map((item) => item.group || 'general')
      .sort()
    return new Set(groups)
  },
  getMetaByComponent: (store) => (componentName = '') => {
    return store.items.find((item) => item.name === componentName)
  },
  /* blockPropsDefaults: (store, getters) => (componentName = '') => {
    const props = getters.getMetaByComponent(componentName)
    if (props === undefined) {
      return {}
    }
    Object.keys(props).forEach((prop) => {})
}, */
  hasBlock: (store) => (componentName = '') => {
    return store.items.find((item) => item.name === componentName) !== undefined
  },
}

export const LOAD_BLOCKS_META = 'load blocks meta info'

export const mutations = {
  [LOAD_BLOCKS_META](store, { blocks = [] }) {
    store.items = blocks
  },
}
