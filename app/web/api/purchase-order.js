import request from '@/libs/request'

/**
 * 获取采购订单列表
 * @param {Object} params
 * ├── @param {Number} page - 页数
 * ├── @param {Number} rows - 条数
 * ├── @param {Array?} dateRange - 日期范围
 * ├── @param {Number?} categoryID - 类目ID
 * ├── @param {Number?} supplierID - 供货商ID
 * └── @param {String?} supplierID - 供货商名称
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
 * ├── @param {Number} categoryID - 类目ID
 * ├── @param {Array} goods - 要采购的商品
 * ├── @param {Number} supplierID - 供货商ID
 * ├── @param {String} transactor - 经办人
 * └── @param {String?} remark - 备注
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
 * @param {Object} data
 * └── @param {String} purchaseID - 采购单ID
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
