import request from '@/libs/request'

/**
 * 获取商品列表
 * @param {Object} params
 * └─ @prop {Number?} page 页数
 * └─ @prop {Number?} rows 行数
 * └─ @prop {String?} isOnline 是否上架
 * └─ @prop {String?} goodsNo 商品编号
 * └─ @prop {String?} goodsName 商品名字
 */
export function goodsGet(params) {
  return request({
    url: '/goods',
    method: 'get',
    params
  })
}

/**
 * 保存商品 新加 | 修改
 * @param {Object} data
 * └─ @prop {String} goodsName 商品名称
 * └─ @prop {String} goodsAlias 商品别名
 * └─ @prop {Number}} spec 商品规格
 * └─ @prop {String} specUnit 商品规格单位
 * └─ @prop {String?} madeIn 产地
 * └─ @prop {Number} stockQty 库存
 */
export function goodsSave(data) {
  return request({
    url: '/goods/save',
    method: 'post',
    data
  })
}

/**
 * 删除商品
 * @param {Object} data 商品的当前行数据row
 */
export function goodsDel(data) {
  return request({
    url: '/goods/delete',
    method: 'post',
    data
  })
}

/**
 * 获取商品列表
 * @param {String} goodsNo 商品编号
 */
export function goodsDescGet(goodsNo) {
  return request({
    url: '/goods/desc',
    method: 'get',
    params: { goodsNo }
  })
}

/**
 * 出售中或已下架进行状态反转
 * @param {Object} data
 * └─ @prop {String} goodsNo 商品编号
 * └─ @prop {Number} isOnline 当前状态
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
 * @param {Number} id
 * @param {Object} data
 * └─ @prop {Array} tags 商品标签
 * └─ @prop {String} unitPrice 进价
 * └─ @prop {String} resalePrice 售价
 * └─ @prop {Number} goodsAmount 出售数量
 */
export function goodsSaveDesc(id, data) {
  return request({
    url: `/goods/saveDesc?id=${id}`,
    method: 'post',
    data
  })
}