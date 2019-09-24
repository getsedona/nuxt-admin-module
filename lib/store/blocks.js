/*
 * Blocks Module
 * Public Vuex Module
 */

import Vue from 'vue'
import get from 'lodash/get'

export const namespaced = true

export const strict = process.env.NODE_ENV !== 'production'

export const state = () => ({
  items: JSON.parse('<%= JSON.stringify(options.blocks) %>'),
})

export const getters = {
  getFileByComponentName: (store) => (name) => {
    return get(store.items.find((item) => item.name === name), 'file', undefined)
  },
}

export const actions = {}

export const LOAD_BLOCKS_META = 'load blocks meta info'

export const mutations = {
  [LOAD_BLOCKS_META](store, { blocks = [] }) {
    Vue.set(store, 'items', blocks)
  },
}
