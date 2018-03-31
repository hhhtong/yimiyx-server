import BaseController from '../core/base-controller';
// import * as moment from 'moment';

export default class SupplierController extends BaseController {

  async index() {
    const { service, ctx } = this;
    try {
      const result: object = await service.supplier.query(ctx.query);
      // list.forEach(item => item.createdAt = moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'))
      this.success(result);
    } catch (error) {
      this.fail(error);
    }
  }

  async add() {
    const { service, ctx } = this;
    const rowData = { ...ctx.request.body, createdAt: new Date() };
    try {
      await service.supplier.insert(rowData);
      this.success();
    } catch (error) {
      this.fail(error);
    }
  }

  async delete() {
    const { service, ctx } = this;
    const rowData: any = ctx.request.body;

    try {
      await service.supplier.update(rowData.id, { deletedAt: new Date() });
      this.success();
    } catch (error) {
      this.fail(error);
    }
  }

  async update() {
    const { service, ctx } = this;
    const rowData: any = ctx.request.body;

    try {
      await service.supplier.update(rowData.id, rowData);
      this.success();
    } catch (error) {
      this.fail(error);
    }
  }
}
