import request from '@/libs/request'

/**
 * 获取采购订单列表
 */
export function purchaseOrderGet(params) {
  return request({
    url: '/purchaseOrder',
    method: 'get',
    params
  })
}

/**
 * 添加采购单
 */
export function purchaseOrderAdd(data) {
  return request({
    url: '/purchaseOrder/add',
    method: 'post',
    data
  })
}

/**
 * 删除采购单
 */
export function purchaseOrderDel(data) {
  return request({
    url: '/purchaseOrder/delete',
    method: 'post',
    data
  })
}

/**
 * 修改采购单
 */
export function purchaseOrderUpdate(data) {
  return request({
    url: '/purchaseOrder/update',
    method: 'post',
    data
  })
}
