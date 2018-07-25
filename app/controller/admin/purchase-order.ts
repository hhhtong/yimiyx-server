import BaseController from '../../core/base-controller';
import { getConnection, QueryRunner } from 'typeorm';

export default class PurchaseOrderController extends BaseController {

  // -------------------------------------------------------------------------
  // Private Properties
  // -------------------------------------------------------------------------

  // - 采购单，商品单，商品子单的数组集合
  private codes: string[];
  private readonly queryRunner: QueryRunner;

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------

  constructor(ctx) {
    super(ctx);
    this.codes = [];
    this.queryRunner = getConnection().createQueryRunner();
  }

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  async index(): Promise<void> {
    const { service, ctx } = this;
    const { dateRange } = ctx.queries;
    if (dateRange && dateRange.join('').length > 0) {
      ctx.query.dateRange = ctx.helper.transformDateRange(dateRange);
    }

    // qrcode test
    // ctx.app.generateQRCode('CG20180605' + Date.now());

    try {
      const result: any = await service.admin.purchaseOrder.find(ctx.query);
      result.list.forEach(item => {
        // - 将需要用到的字段放到最外层
        item.categoryName = item.category.name;
        item.categoryID = item.category.id;
        item.supplierID = item.supplier.id;
        item.supplierName = item.supplier.supplierName;
        item.supplierTel = item.supplier.tel;

        this.$expel(item, ['category', 'supplier']);
        this.$sqlDateFormat(item, ['createdAt', 'updatedAt']);
      });
      this.success(result);
    } catch (error) {
      this.fail(error);
    }
  }

  async add(): Promise<void> {
    const { service, ctx } = this;
    const { categoryID, supplierID, goods, transactor, remark } = ctx.request.body;
    // - 采购单编号生成规则：CG(`采购`首字母) + 20180415150610(YYYYMMDDHHmmss) + E0STI4(6位随机UUID)
    const id = 'CG' + ctx.helper.moment(new Date()).format('YYYYMMDDHHmmss') + ctx.helper.uuid(6, 36);
    await this.queryRunner.startTransaction(); // - 开启事务

    try {
      const rowData = {
        id,
        category: { id: categoryID },
        supplier: { id: supplierID },
        mainOrders: await this.__generatePurchaseMainOrder(goods),
        transactor,
        remark,
        status: 1
      };

      this.codes.unshift(id);
      this.__generateQRCode();

      await service.admin.purchaseOrder.insertPurchaseOrder(rowData);
      await this.queryRunner.commitTransaction(); // - 提交事务
      this.success();
    } catch (error) {
      await this.queryRunner.rollbackTransaction(); // - 回滚事务
      this.fail(error);
    }
  }

  async delete(): Promise<void> {
    const { service, ctx } = this;
    const rowData: any = ctx.request.body;

    try {
      await service.admin.purchaseOrder.deletePurchaseOrder(rowData);
      this.success();
    } catch (error) {
      this.fail(error);
    }
  }

  // - 该方法暂时没用到
  async update(): Promise<void> {
    const { service, ctx } = this;
    const rowData: any = ctx.request.body;

    try {
      await service.admin.purchaseOrder.updatePurchaseOrder(rowData);
      this.success();
    } catch (error) {
      this.fail(error);
    }
  }

  async details(): Promise<void> {
    const { service, ctx } = this;

    try {
      const result: object = await service.admin.purchaseOrder.findOne(ctx.query.id);
      this.success(result);
    } catch (error) {
      this.fail(error);
    }
  }

  // -------------------------------------------------------------------------
  // Private Methods
  // -------------------------------------------------------------------------

  // - 批量生成二维码
  async __generateQRCode(): Promise<void> {
    for (const code of this.codes) await this.ctx.app.generateQRCode(code);
    this.codes = [];
  }

  // - 生成采购商品单主订单数据
  async __generatePurchaseMainOrder(_goods): Promise<any[]> {
    let mainOrders = [];
    for (const goods of _goods) {
      // - 采购商品单编号生成规则： M(代表主订单) + 商品编号(0502020001) + E0STI4(6位随机UUID)
      const mid = `M${goods.goodsNo}${this.ctx.helper.uuid(6, 36)}`;
      mainOrders.push({
        mid,
        goods,
        childOrders: await this.__generatePurchaseChildOrder(goods),
        status: 1,
        purchaseNum: goods.purchaseNum
      });
      this.codes.unshift(mid);
    }
    mainOrders = await this.service.admin.purchaseOrder.insertPurchaseMainOrder(mainOrders);

    // - 插入订单数据并返回插入的数据
    return mainOrders;
  }

  // - 生成采购商品单子订单数据
  async __generatePurchaseChildOrder({ goodsNo, specNum }): Promise<any[]> {
    let childOrders = [];
    for (let index = 1; index <= specNum; index++) {
      // - 采购商品单编号生成规则： C(代表子订单) + 商品编号(0502020001) + 四位自然数递增(从0001开始) + E0STI4(6位随机UUID)
      const cid = 'C' + goodsNo + this.ctx.helper.prefixZero(index, 4) + this.ctx.helper.uuid(6, 36);
      childOrders.push({ cid });
      this.codes.unshift(cid);
    }
    childOrders = await this.service.admin.purchaseOrder.insertPurchaseChildOrder(childOrders);

    // - 插入订单数据并返回插入的数据
    return childOrders;
  }
}