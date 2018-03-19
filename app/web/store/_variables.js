/* vuex state */
export const state = {
  categoryList: [],
  categoryListEqual: []
}

/* vuex getters */
export const getters = {
  token: state => state.user.token
}
