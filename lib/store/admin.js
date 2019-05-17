export const namespaced = true

export const state = () => ({
  menuItems: [],
})

export const getters = {}

export const actions = {}

export const LOAD_MENU_ITEMS = 'load menu items'

export const mutations = {
  [LOAD_MENU_ITEMS](store, { items = [] }) {
    store.menuItems = items
  },
}
