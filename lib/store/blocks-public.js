/*
 * Blocks Module
 * Public Vuex Module
 */

import Vue from 'vue'

export const namespaced = true

export const strict = process.env.NODE_ENV !== 'production'

export const state = () => ({
  items: [],
})

export const getters = {}

export const actions = {}

export const LOAD_BLOCKS_META = 'load blocks meta info'

export const mutations = {
  [LOAD_BLOCKS_META](store, { blocks = [] }) {
    Vue.set(store, 'items', blocks)
  },
}
