import BaseController from '../core/base-controller';

export default class SupplierController extends BaseController {

  async add() {
    const { service, ctx } = this;
    await service.supplier.insert(ctx.params);
    this.success()
  }

  async delete() {
    const { service, ctx } = this;
    await service.supplier.delete(ctx.params);
  }

  async update() {
    const { service, ctx } = this;
    await service.supplier.update(ctx.params);
  }
}
