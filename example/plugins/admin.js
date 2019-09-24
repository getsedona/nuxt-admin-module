/**
 *
 *
 * @exports
 * @param {any} context context
 */
export default async function(context) {
  if (context.query.loggedIn) {
    await context.$adminLoader.load()
    await context.store.commit('auth/SET_LOGGEDIN')
  }
}
