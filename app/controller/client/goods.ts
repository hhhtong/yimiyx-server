import BaseController from '../../core/base-controller'

export default class GoodsController extends BaseController {

  async index(): Promise<void> {
    try {
      let list = await this.service.client.goods.queryOnline()
      for (const item of list) this.__dispose(item)
      this.success(list)
    } catch (err) {
      this.fail(err)
    }
  }

  async detail(): Promise<void> {
    const { id } = this.ctx.query
    try {
      let raw = await this.service.client.goods.queryOne(id)
      this.__dispose(raw)
      raw = { ...raw, guaranteePeriod: '3天', storageMethod: '冷藏' } as any
      this.success(raw)
    } catch (err) {
      this.fail(err)
    }
  }

  __dispose(item: any): void {
    const { spec, unitPrice, categorys } = item
    item.carousels = item.carousels ? JSON.parse(item.carousels) : []
    item.specList = [{ spec, unitPrice }] // - 暂时只有一种规格
    if (categorys) {
      item.categoryName = categorys[0].name
    }
    item.tagName = item.tags.map(({ tagName }) => tagName)[0] || '限时特价'
    this.$expel(item, ['spec', 'unitPrice', 'categorys', 'tags'])
  }
}
