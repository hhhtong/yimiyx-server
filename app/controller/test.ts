import BaseController from '../core/base-controller';
import { getConnection } from 'typeorm';
import PurchaseOrder from '../db/entity/purchase-order';
import PurchaseMainOrder from '../db/entity/purchase-main-order';
import PurchaseChildOrder from '../db/entity/purchase-child-order';

export default class TestController extends BaseController {

  index() {
    const { service, ctx } = this;
    ctx.type = 'html';
    ctx.body = '<h1>hello world1</h1>'
  }

  async findByIds(ids: string[]) {
    try {
      const list = getConnection()
        .getRepository(PurchaseMainOrder)
        .find({ where: `order_id IN (${ids.toString()})` })
      // childOrders
      // .select([
      //   'PO.*',
      //   `DATE_FORMAT(PO.createdAt,'%Y-%m-%d %H:%i:%s') AS createdAt`,
      //   'category.name',
      //   'supplier.tel',
      //   'supplier.id',
      //   'supplier.supplierName AS supplierName'
      // ])
      // .getRawMany()
      console.log('@@@@@@@@@@@@@@@', list);

      return Promise.resolve(list);
    } catch (e) {
      this.ctx.logger.error(e)
    }
  }
}