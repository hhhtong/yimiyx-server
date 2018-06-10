import request from '@/libs/request'

/**
 * 获取采购订单列表
 * @param {Object} params
 * ├── @prop {Number} page - 页数
 * ├── @prop {Number} rows - 条数
 * ├── @prop {Array?} dateRange - 日期范围
 * ├── @prop {Number?} categoryID - 类目ID
 * ├── @prop {Number?} supplierID - 供货商ID
 * └── @prop {String?} supplierID - 供货商名称
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
 * @param {Object} data
 * ├── @prop {Number} categoryID - 类目ID
 * ├── @prop {Array} goods - 要采购的商品
 * ├── @prop {Number} supplierID - 供货商ID
 * ├── @prop {String} transactor - 经办人
 * └── @prop {String?} remark - 备注
 */
export function purchaseOrderAdd(data) {
  return request({
    url: '/purchaseOrder/add',
    method: 'post',
    data
  })
}

/**
 * 查看采购单详情
 * @param {String} id - 采购单号
 */
export function purchaseOrderDetails(id) {
  return request({
    url: '/purchaseOrder/details',
    method: 'get',
    params: { id }
  })
}

/**
 * 删除采购单
 * @param {Object} data
 * └── @prop {String} purchaseID - 采购单ID
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
