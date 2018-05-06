import BaseController from '../core/base-controller';

export default class GoodsController extends BaseController {

  async index() {
    const { service, ctx } = this;
    try {
      let { list, total } = await service.goods.query(ctx.query);

      for (const item of list) {
        item.categorys = this.$refix(item.categorys)
      }
      this.success({ list, total });
    } catch (error) {
      this.fail(error);
    }
  }

  async save() {
    const { service, ctx } = this;
    const rowData = ctx.request.body;

    if (!rowData.goodsNo) { // 无goodsNo参数时 表示新增
      // 以数组中的第一个类目作为序号前缀
      rowData.goodsNo = await this.service.goods.getMaxGoodsNo(rowData.categorys[0].no)
    }
    // 获取Goods表中的categorys[]
    let categorys = []
    for (const item of rowData.categorys) {
      categorys = [...categorys, ...item.ids.map(id => ({ id }))]
    }

    rowData.categorys = categorys
    try {
      await service.goods.save(rowData);
      this.success();
    } catch (error) {
      this.fail(error);
    }
  }

  async delete() {
    const { service, ctx } = this;
    const rowData: any = ctx.request.body
    try {
      await service.goods.delete(rowData.id);
      this.success();
    } catch (error) {
      this.fail(error);
    }
  }
}
