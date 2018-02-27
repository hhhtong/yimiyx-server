import Vue from 'vue'
import Vuex from 'vuex'
import { state, getters } from './_variables'
import { mutations, actions } from './_methods'
import app from './modules/app'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    app,
    user
  }
})

export default store
