import BaseController from '../../core/base-controller';
import { GoodsCategoryPartial, GoodsCategoryResult } from '../../common/QueryInterface';

export default class GoodsCategoryController extends BaseController {

  async index(): Promise<void> {
    const { service, ctx } = this;
    try {
      let { list, total, idMax } = await service.admin.goodsCategory.query(ctx.query);
      this.success({ list: this.$refix(list), listEqual: list, total, idMax });
    } catch (error) {
      this.fail(error);
    }
  }

  async save(): Promise<void> {
    const { service, ctx } = this;
    const [treeData, deleteIds]: Array<any[]> = ctx.request.body;

    try {
      if (deleteIds.length > 0) {
        await service.admin.goodsCategory.delete(deleteIds);
      }
      await service.admin.goodsCategory.save(this.$unmixin(treeData) as any);
      this.success();
    } catch (error) {
      this.fail(error);
    }
  }

  async delete(): Promise<void> {
    const { service, ctx } = this;
    const params: GoodsCategoryPartial = ctx.request.body;
    try {
      await service.admin.goodsCategory.delete([params.id]);
      this.success();
    } catch (error) {
      this.fail(error);
    }
  }
}
