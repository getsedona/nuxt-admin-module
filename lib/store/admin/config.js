/*
 * Config Module
 * Private Vuex Module
 */
import get from 'lodash/get'

export const namespaced = true

export const strict = process.env.NODE_ENV !== 'production'

export const state = () => ({
  data: JSON.parse('<%= JSON.stringify(options) %>'),
})

export const getters = {
  toolBarSettngs: (store) => () => {
    const defaults = {
      showHome: true,
      title: '',
      buttons: [],
    }
    return get(store, ['data', 'toolbar'], defaults)
  },
}

export const mutations = {}
