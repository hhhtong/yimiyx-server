import BaseController from '../core/base-controller';
// import * as moment from 'moment';

export default class SupplierController extends BaseController {

  async index() {
    const { service, ctx } = this;
    const result: object = await service.supplier.query(ctx.query);
    // list.forEach(item => item.createdAt = moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'))
    this.success(result);
  }

  async add() {
    const { service, ctx } = this;
    const rowData = { ...ctx.request.body, createdAt: new Date() };
    await service.supplier.insert(rowData);
    this.success();
  }

  async delete() {
    const { service, ctx } = this;
    const rowData: any = ctx.request.body
    await service.supplier.update(rowData.id, { isDelete: 1 });
    this.success()
  }

  async update() {
    const { service, ctx } = this;
    const rowData: any = ctx.request.body
    await service.supplier.update(rowData.id, rowData);
    this.success()
  }
}
