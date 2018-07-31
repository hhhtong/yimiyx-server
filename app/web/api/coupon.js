import request from '@/libs/request'

/**
 * 获取优惠券列表
 * @param {Object} params
 * └─ @prop {Number} page 页数
 * └─ @prop {Number} rows 行数
 * └─ @prop {Number?} couponMoney1 优惠券面额 起
 * └─ @prop {Number?} couponMoney2 优惠券面额 止
 * └─ @prop {Number?} couponType 优惠券类型
 * └─ @prop {String?} couponName 优惠券名称
 */
export function couponGet(params) {
  return request({
    url: '/coupon',
    method: 'get',
    params
  })
}

/**
 * 保存优惠券 新加 | 修改
 * @param {Object} data
 * └─ @prop {String} couponName 优惠券名称
 * └─ @prop {Number} couponType 优惠券类型
 * └─ @prop {Number} couponMoney 优惠券面额
 * └─ @prop {Number} spendMoney 最低消费金额
 * └─ @prop {String} couponDes 优惠活动描述
 * └─ @prop {Number} sendNum 发放数量
 * └─ @prop {Number} receiveNum 领取数量
 * └─ @prop {Number} receiveNum 领取数量
 * └─ @prop {String} sendStartTime 发放开始时间
 * └─ @prop {String} sendStartTime 发放结束时间
 * └─ @prop {String} validStartTime 活动开始时间
 * └─ @prop {String} validEndTime 活动结束时间
 */
export function couponSave(data) {
  return request({
    url: '/coupon',
    method: 'post',
    data
  })
}

/**
 * 删除优惠券
 * @param {Object} data 优惠券的当前行数据row
 */
export function couponDel(data) {
  return request({
    url: '/coupon',
    method: 'delete',
    data
  })
}
