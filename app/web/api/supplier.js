import request from '@/libs/request'

/**
 * 添加供货商
 */
export function addSupplier (params) {
  return request({
    url: '/supplier/add',
    method: 'post',
    params
  })
}

/**
 * 删除供货商
 */
export function delSupplier (params) {
  return request({
    url: '/supplier/delete',
    method: 'post',
    params
  })
}

/**
 * 修改供货商
 */
export function updateSupplier (params) {
  return request({
    url: '/supplier/update',
    method: 'post',
    params
  })
}
