import Vue from 'vue'

export const state = () => ({
  items: {},
})

export const getters = {
  bySlug: (state) => (slug) => {
    return state.items[slug] || undefined
  },
}

export const actions = {
  async load({ commit }, { slug }) {
    const page = await this.$axios.$get(`/api/page/${slug}.json`)
    commit('SET_PAGE', { slug, page })
  },
  async save() {

  },
}

export const mutations = {
  SET_PAGE(store, { slug, page }) {
    Vue.set(store.items, slug, page)
  },
  ADD_BLOCK(state, { slug, id, component, props }) {
    if (state.items[slug] === undefined) {
      throw new Error(`No page found with slug ${slug}`)
    }
    Vue.set(state.items[slug].content, state.items[slug].content.length, { id, component, props })
  },
  REMOVE_BLOCK(state, { slug, id }) {
    if (state.items[slug] === undefined) {
      throw new Error(`No page found with slug ${slug}`)
    }
    const index = state.items[slug].content.findIndex((item) => item.id === id)
    if (index === undefined) {
      throw new Error(`No block found with id ${id} in page ${slug}`)
    }
    state.items[slug].content.splice(index, 1)
  },
}
