import Vue from 'vue'
import '../filter'
import '../plugin'
import '../directive'
import '../component'

export default function (options) {
  if (options.store) {
    options.store.replaceState(Object.assign({}, window.__INITIAL_STATE__, options.store.state))
  } else if (window.__INITIAL_STATE__) {
    options.data = Object.assign(window.__INITIAL_STATE__, options.data && options.data())
  }
  const app = new Vue(options)
  app.$mount('#app')
}
