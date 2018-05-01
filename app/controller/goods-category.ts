import BaseController from '../core/base-controller';

export default class GoodsCategoryController extends BaseController {

  async index() {
    const { service, ctx } = this;
    try {
      let { list, total, idMax } = await service.goodsCategory.query(ctx.query);
      this.success({ list: this.$refix(list), listEqual: list, total, idMax });
    } catch (error) {
      this.fail(error);
    }
  }

  async add() {
    const { service, ctx } = this;
    const rowData = { ...ctx.request.body, createdAt: new Date() };
    try {
      await service.goodsCategory.insert(rowData);
      this.success();
    } catch (error) {
      this.fail(error);
    }
  }

  async delete() {
    const { service, ctx } = this;
    const rowData: any = ctx.request.body
    try {
      await service.goodsCategory.delete([rowData.id], { deletedAt: new Date() });
      this.success();
    } catch (error) {
      this.fail(error);
    }
  }

  async update() {
    const { service, ctx } = this;
    const [treeData, deleteIds]: any = ctx.request.body
    const rowData: any = this.unmixin(treeData);

    try {
      if (deleteIds.length > 0) {
        await service.goodsCategory.delete(deleteIds, { deletedAt: new Date() });
      }
      await service.goodsCategory.update(rowData);
      this.success();
    } catch (error) {
      this.fail(error);
    }
  }
}
