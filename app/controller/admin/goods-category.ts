import BaseController from '../../core/base-controller'
import { GoodsCategoryQuery, GoodsCategoryPartial } from '../../common/QueryInterface'

export default class GoodsCategoryController extends BaseController {

  async index(): Promise<void> {
    let { page, rows, disabledPage , name }: GoodsCategoryQuery = this.ctx.query
    let start = (page - 1) * rows
    let end = start + rows
    if (!name) name = ''
    try {
      let { list, total, idMax } = await this.service.admin.goodsCategory.query(name)
      const listEqual = list
      list = this.$refix(list) as any
      if (!disabledPage) list = list.slice(start, end)

      this.success({ list, listEqual, total, idMax })
    } catch (error) {
      this.fail(error)
    }
  }

  async save(): Promise<void> {
    const { service, ctx } = this
    const [treeData, deleteIds]: Array<any[]> = ctx.request.body

    try {
      if (deleteIds.length > 0) {
        await service.admin.goodsCategory.delete(deleteIds)
      }
      await service.admin.goodsCategory.save(this.$unmixin(treeData) as any)
      this.success()
    } catch (error) {
      this.fail(error)
    }
  }

  async delete(): Promise<void> {
    const params: GoodsCategoryPartial = this.ctx.request.body
    if (params.id) {
      await this.service.admin.goodsCategory.delete([params.id])
      this.success()
    } else {
      this.fail()
    }
  }
}
