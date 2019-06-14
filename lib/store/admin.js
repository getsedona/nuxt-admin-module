import Vue from 'vue'
import { setIdToMenuItems } from './../utils/nanoid'

export const namespaced = true

export const state = () => ({
  config: [],
  breadcrumbs: [],
})

export const getters = {}

export const actions = {}

export const LOAD_CONFIG = 'load admin config'
export const ADD_TO_BREADCRUMBS = 'add menu item to breadcrumbs'

export const mutations = {
  [LOAD_CONFIG](store, { config = {} }) {
    config.items = setIdToMenuItems(config.items)
    store.config = config
  },
  [ADD_TO_BREADCRUMBS](store, item) {
    Vue.set(store.breadcrumbs, store.breadcrumbs.length, item)
  },
}
