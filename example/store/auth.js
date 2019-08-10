export const state = () => ({
  loggedIn: true,
})

export const mutations = {
  SET_LOGGED(state) {
    state.loggedIn = true
  },
}
