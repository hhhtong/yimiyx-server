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
    const id = 'CG' + ctx.helper.dateFormat(new Date(), 'YYYYMMDDHHmmss') + ctx.helper.uuid(6, 36);
    const rowData = {
      id,
      goodsCategory: { id: categoryID },
      supplier: { id: supplierID },
      purchaseGoodsOrder: this.__generatePurchaseGoodsOrder(goods),
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

  // 生成采购商品单主订单数据
  async __generatePurchaseGoodsOrder(_goods) {
      let purchaseGoodsOrder = [];
      for (const goods of _goods) {
        // 采购商品单编号生成规则： M(代表主订单) + 商品编号(0502020001) + E0STI4(6位随机UUID)
        const purchaseGoodsID = `M${goods.goodsNo}${this.ctx.helper.uuid(6, 36)}`;
        purchaseGoodsOrder.push({
          purchaseGoodsID,
          goods,
          purchaseGoodsDetail: this.__generatePurchaseGoodsDetail(goods),
          status: 1,
          purchaseNum: goods.purchaseNum
        });
      }
      // 插入订单数据并返回插入的数据
      return await this.service.purchaseOrder.insertPurchaseGoodsOrder(purchaseGoodsOrder);
  }

  // 生成采购商品单子订单数据
  async __generatePurchaseGoodsDetail({ goodsNo, specNum }) {
      let purchaseGoodsDetail = [];
      for (let index = 0; index < specNum; index++) {
        // 采购商品单编号生成规则： C(代表子订单) + 商品编号(0502020001) + 四位自然数递增(从0001开始) + E0STI4(6位随机UUID)
        const goodsDetailID = 'C' + goodsNo + this.ctx.helper.prefixZero(index, 4) + this.ctx.helper.uuid(6, 36);
        purchaseGoodsDetail.push({ goodsDetailID });
      }
      // 插入订单数据并返回插入的数据
      return await this.service.purchaseOrder.insertPurchaseGoodsDetail(purchaseGoodsDetail);
  }
}
