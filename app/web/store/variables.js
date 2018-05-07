export const state = {
  // 分类列表【嵌套】
  categoryList: [],
  // 分类列表【平级】
  categoryListEqual: [],
  tableConHeight: null
}

export const getters = {
  token: state => state.user.token
}
