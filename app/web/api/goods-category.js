import request from '@/libs/request'

/**
 * 获取供货商列表
 */
export function categoryGet(params) {
  return request({
    url: '/goodsCategory',
    method: 'get',
    params
  })
}

/**
 * 添加供货商
 */
export function categoryAdd(data) {
  return request({
    url: '/goodsCategory/add',
    method: 'post',
    data
  })
}

/**
 * 删除供货商
 */
export function categoryDel(data) {
  return request({
    url: '/goodsCategory/delete',
    method: 'post',
    data
  })
}

/**
 * 修改供货商
 */
export function categoryUpdate(data) {
  return request({
    url: '/goodsCategory/update',
    method: 'post',
    data
  })
}
