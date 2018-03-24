import BaseController from '../core/base-controller';

export default class GoodsController extends BaseController {

  async index() {
    const { service, ctx } = this;
    try {
      let { list, total } = await service.goods.query(ctx.query);
      this.success({ list, total });
    } catch (error) {
      this.fail(error);
    }
  }

  async add() {
    const { service, ctx } = this;
    const rowData = ctx.request.body;
    // 以数组中的第一个类目作为序号前缀
    rowData.goodsNo = rowData.categorys[0].no
    // 获取Goods表中的categorys[]
    rowData.categorys = rowData.categorys.map(item => item.categoryIds)
    try {
      await service.goods.insert(rowData);
      this.success();
    } catch (error) {
      this.fail(error);
    }
  }

  async delete() {
    const { service, ctx } = this;
    const rowData: any = ctx.request.body
    try {
      await service.goods.delete([rowData.id], { isDelete: 1 });
      this.success();
    } catch (error) {
      this.fail(error);
    }
  }

  async update() {
    const { service, ctx } = this;
    const [treeData, deleteIds]: any = ctx.request.body

    try {
      if (deleteIds.length > 0) {
        await service.goods.delete(deleteIds, { isDelete: 1 });
      }
      // await service.goods.update(rowData);
      this.success();
    } catch (error) {
      this.fail(error);
    }
  }
}
