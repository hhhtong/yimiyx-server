import BaseController from '../core/base-controller';
// import * as moment from 'moment';

export default class PurchaseOrderController extends BaseController {

  async index() {
    const { service, ctx } = this;
    try {
      const result: object = await service.purchaseOrder.query(ctx.query);
      // list.forEach(item => item.createdAt = moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'))
      this.success(result);
    } catch (error) {
      this.fail(error);
    }
  }

  async add() {
    const { service, ctx } = this;
    const { categoryID, supplierID, goods, transactor, remark } = ctx.request.body;
    // 采购单编号生成规则：CG(`采购`首字母) + 20180415150610(YYYYMMDDHHmmss) + E0STI4(6位随机UUID)
    const id = `CG${ctx.helper.dateFormat()}${ctx.helper.uuid(6, 52)}`
    const rowData = {
      id,
      goodsCategory: { id: categoryID },
      supplier: { id: supplierID },
      transactor,
      remark,
      status: 1
    }

    try {
      await service.purchaseOrder.insertPurchaseOrder(rowData);
      // await service.purchaseOrder.insertPurchaseGoodsOrder(rowData);
      // await service.purchaseOrder.insertPurchaseGoodsDetail(rowData);
      this.success();
    } catch (error) {
      this.fail(error);
    }
  }

  async delete() {
    const { service, ctx } = this;
    const rowData: any = ctx.request.body;

    try {
      await service.purchaseOrder.update(rowData.id, { deletedAt: new Date() });
      this.success();
    } catch (error) {
      this.fail(error);
    }
  }

  async update() {
    const { service, ctx } = this;
    const rowData: any = ctx.request.body;

    try {
      await service.purchaseOrder.update(rowData.id, rowData);
      this.success();
    } catch (error) {
      this.fail(error);
    }
  }
}
