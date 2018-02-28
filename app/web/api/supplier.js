import request from '@/libs/request'

/**
 * 添加供货商
 */
export function supplierAdd(params) {
  // return request.post('/supplier/add', params)
  return request({
    url: '/supplier/add',
    method: 'post',
    params
  })
}

/**
 * 删除供货商
 */
export function supplierDel(params) {
  return request({
    url: '/supplier/delete',
    method: 'post',
    params
  })
}

/**
 * 修改供货商
 */
export function supplierUpdate(params) {
  return request({
    url: '/supplier/update',
    method: 'post',
    params
  })
}
