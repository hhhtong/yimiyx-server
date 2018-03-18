/* vuex state */
export const state = {
  categoryOptions: []
}

/* vuex getters */
export const getters = {
  token: state => state.user.token
}
