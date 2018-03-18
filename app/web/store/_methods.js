import { categoryGet } from '@/api'

/* vuex mutations */
export const mutations = {
  UPDATE_CATEGORY_OPTIONS(state, options) {
    state.categoryOptions = options
  }
}

/* vuex actions */
export const actions = {
  updateCategoryOptions({ state, commit }) {
    categoryGet().then(result => {
      if (result.code === 50000) {
        const list = [{ id: 0, name: '全部' }, ...result.data.list]
        commit('UPDATE_CATEGORY_OPTIONS', list)
      }
    })
  }
}
