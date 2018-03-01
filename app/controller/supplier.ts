import BaseController from '../core/base-controller';
import dateFormat from '../../libs/tools/dateFormat';

export default class SupplierController extends BaseController {

  async index() {
    const { service, ctx } = this;
    const list = await service.supplier.query(ctx.query);
    this.success({ list, total: list.length });
  }

  async add() {
    const { service, ctx } = this;
    const rowData = { ...ctx.request.body, createdAt: dateFormat(new Date()) };
    await service.supplier.insert(rowData);
    this.success();
  }

  async delete() {
    const { service, ctx } = this;
    const rowData = { ...ctx.request.body, isDelete: 1 };
    await service.supplier.update(rowData);
    this.success()
  }

  async update() {
    const { service, ctx } = this;
    await service.supplier.update(ctx.request.body);
    this.success()
  }
}
