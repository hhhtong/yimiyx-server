export default {
  /**
   * 对象是否为空
   * @param obj 检验对象
   * @returns {boolean}
   */
  isEmptyObj(obj) {
    return Object.keys(obj).length === 0
  }
}
