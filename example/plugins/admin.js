/**
 *
 *
 * @exports
 * @param {*} { store, query } context
 * @param {*} inject inject function
 */
export default function({ store, query }, inject) {
  if (query.loggedIn) {
    store.commit('auth/SET_LOGGEDIN')
    store.dispatch('admin/load')
  }
}
