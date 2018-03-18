import request from '@/libs/request'

/**
 * 获取供货商列表
 */
export function goodsGet(params) {
  return request({
    url: '/goods',
    method: 'get',
    params
  })
}

/**
 * 添加供货商
 */
export function goodsAdd(data) {
  return request({
    url: '/goods/add',
    method: 'post',
    data
  })
}

/**
 * 删除供货商
 */
export function goodsDel(data) {
  return request({
    url: '/goods/delete',
    method: 'post',
    data
  })
}

/**
 * 修改供货商
 */
export function goodsUpdate(data) {
  return request({
    url: '/goods/update',
    method: 'post',
    data
  })
}
