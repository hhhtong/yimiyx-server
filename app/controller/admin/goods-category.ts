import BaseController from '../../core/base-controller';

export default class GoodsCategoryController extends BaseController {

  async index() {
    const { service, ctx } = this;
    try {
      let { list, total, idMax } = await service.admin.goodsCategory.query(ctx.query);
      this.success({ list: this.$refix(list), listEqual: list, total, idMax });
    } catch (error) {
      this.fail(error);
    }
  }

  async save() {
    const { service, ctx } = this;
    const [treeData, deleteIds]: Array<any[]> = ctx.request.body;

    try {
      if (deleteIds.length > 0) {
        await service.admin.goodsCategory.delete(deleteIds);
      }
      await service.admin.goodsCategory.save(this.$unmixin(treeData));
      this.success();
    } catch (error) {
      this.fail(error);
    }
  }

  async delete() {
    const { service, ctx } = this;
    const rowData: any = ctx.request.body;
    try {
      await service.admin.goodsCategory.delete([rowData.id]);
      this.success();
    } catch (error) {
      this.fail(error);
    }
  }
}
