import request from '@/libs/request'

/**
 * 获取商品分类列表(一级)
 */
export function getCategoryOptions() {
  return request({
    url: '/goodsCategory/getCategoryOptions',
    method: 'get'
  })
}

/**
 * 获取商品分类列表
 */
export function categoryGet(params) {
  return request({
    url: '/goodsCategory',
    method: 'get',
    params
  })
}

/**
 * 添加商品分类
 */
export function categoryAdd(data) {
  return request({
    url: '/goodsCategory/add',
    method: 'post',
    data
  })
}

/**
 * 删除商品分类
 */
export function categoryDel(data) {
  return request({
    url: '/goodsCategory/delete',
    method: 'post',
    data
  })
}

/**
 * 修改商品分类
 */
export function categoryUpdate(data) {
  return request({
    url: '/goodsCategory/update',
    method: 'post',
    data
  })
}
