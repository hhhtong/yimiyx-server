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
 * 保存供货商 新加 | 修改
 */
export function goodsSave(data) {
  return request({
    url: '/goods/save',
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
