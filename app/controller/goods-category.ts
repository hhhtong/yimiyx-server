import BaseController from '../core/base-controller';

export default class GoodsCategoryController extends BaseController {

  async index() {
    const { service, ctx } = this;
    const list = await service.goodsCategory.query(ctx.query);
    this.success({ list, total: list.length });
  }

  async add() {
    const { service, ctx } = this;
    const rowData = { ...ctx.request.body, createdAt: new Date() };
    await service.goodsCategory.insert(rowData);
    this.success();
  }

  async delete() {
    const { service, ctx } = this;
    const rowData: any = ctx.request.body
    await service.goodsCategory.update(rowData.id, { isDelete: 1 });
    this.success()
  }

  async update() {
    const { service, ctx } = this;
    const rowData: any = ctx.request.body
    await service.goodsCategory.update(rowData.id, rowData);
    this.success()
  }
}
