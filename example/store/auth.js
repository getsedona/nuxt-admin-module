export const state = () => ({
  loggedIn: false,
})

export const actions = {
  login({ commit }) {
    return new Promise((resolve) => {
      window.history.pushState('', '', `${location.href}?loggedIn=true`)
      commit('SET_LOGGEDIN')
      resolve()
    })
  },
  logOut({ commit }) {
    commit('SET_LOGGOUT')
  },
}

export const mutations = {
  SET_LOGGEDIN(store) {
    store.loggedIn = true
  },
  SET_LOGGOUT(store) {
    store.loggedIn = false
  },
}
