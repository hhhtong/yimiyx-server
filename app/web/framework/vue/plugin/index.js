// - MyPlugin

import Vue from 'vue'
import helper from './helper'
import request from '@/libs/request'

const MyPlugin = {
  /**
   * 自定义方法
   * 组件内使用：this.$helper
   * 全局使用：Vue.helper
   */
  install (Vue) {
    const $helper = {
      configurable: false,
      writable: true,
      enumerable: false,
      value: helper
    }
    const $request = {
      ...$helper,
      value: request
    }

    Object.defineProperties(Vue.prototype, { $helper, $request })
    Object.defineProperties(Vue, { helper: $helper, request: $request })
  }
}

Vue.use(MyPlugin)
