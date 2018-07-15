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

/**
 * 出售中或已下架进行状态反转
 */
export function goodsStatusToggle(data) {
  return request({
    url: '/goods/toggleStatus',
    method: 'post',
    data
  })
}

/**
 * 保存商品详细, 通常用于第一次上架该商品
 */
export function goodsSaveDesc(data) {
  return request({
    url: '/goods/saveDesc',
    method: 'post',
    data
  })
}