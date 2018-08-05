import BaseController from '../core/base-controller';
import { getConnection } from 'typeorm';
import PurchaseOrder from '../model/entity/purchase-order';

export default class TestController extends BaseController {

  async index() {
    const list = await this.findByIds([
      'CG20180604012316T8WXRN',
      'CG20180604230155Y8VO4H',
      'CG2018060523133306BCW2'
    ]);
    this.success(list);
  }

  async findByIds(ids: string[]) {
    try {
      const list = await getConnection()
        .getRepository(PurchaseOrder)
        .find({
          join: {
            alias: 'PO',
            leftJoinAndSelect: {
              category: 'PO.category',
              supplier: 'PO.supplier',
              mainOrders: 'PO.mainOrders',
              goods: 'mainOrders.goods',
              childOrders: 'mainOrders.childOrders'
            }
          },
          where: 'supplier.id = 1 AND goods.id = 192'
        })
      // console.log('@@@@@@@@@@@@@@@', list instanceof Promise);
      return Promise.resolve(list);
    } catch (e) {
      this.ctx.logger.error(e)
    }
  }
}