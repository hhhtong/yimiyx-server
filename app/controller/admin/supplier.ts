import BaseController from '../../core/base-controller';
// import * as moment from 'moment';

export default class SupplierController extends BaseController {

  async index(): Promise<void> {
    const { service, ctx } = this;
    try {
      const result: object = await service.admin.supplier.query(ctx.query);
      // list.forEach(item => item.createdAt = moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'))
      this.success(result);
    } catch (error) {
      this.fail(error);
    }
  }

  async add(): Promise<void> {
    const { service, ctx } = this;
    try {
      await service.admin.supplier.insert(ctx.request.body);
      this.success();
    } catch (error) {
      this.fail(error);
    }
  }

  async delete(): Promise<void> {
    const { service, ctx } = this;
    const rowData: any = ctx.request.body;

    try {
      await service.admin.supplier.delete(rowData);
      this.success();
    } catch (error) {
      this.fail(error);
    }
  }

  async update(): Promise<void> {
    const { service, ctx } = this;
    const rowData: any = ctx.request.body;

    try {
      await service.admin.supplier.update(rowData);
      this.success();
    } catch (error) {
      this.fail(error);
    }
  }
}
