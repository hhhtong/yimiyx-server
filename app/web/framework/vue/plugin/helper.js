export default {
  /**
   * 对象是否为空
   * @param {Object} obj 检验对象
   * @returns {Boolean}
   */
  isEmptyObj(obj) {
    return Object.keys(obj).length === 0
  },
  /**
   * 对单元格的内容进行美化
   * @param {String} val 要美化的字符串
   * @param {Function?} fn 若传入一个函数，将调用此方法对val处理
   */
  beautifyCell(val, fn) {
    if (fn) return fn(val)
    return val ? val : '--'
  }
}
