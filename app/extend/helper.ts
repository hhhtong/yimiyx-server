import dateFormat from '../../libs/tools/dateFormat'

export default {
  dateFormat,
  prefixZero(num, len) {
    // this 是 helper 对象，在其中可以调用其他 helper 方法
    // this.ctx => context 对象
    // this.app => application 对象
    num = (num).toString();
    len = len - num.length
    for (let i = 0; i < len; i++) {
      num = `0${num}`
    }
    return num
  },
  getRandomNum(minnum = 0, maxnum = 1) {
    return Math.floor(minnum + Math.random() * (maxnum - minnum))
  }
}
