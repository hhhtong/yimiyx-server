import { Repository, ObjectLiteral } from 'typeorm';
import BaseService from '../core/base-service';
import PurchaseOrder from '../db/entity/purchase-order';
import PurchaseMainOrder from '../db/entity/purchase-main-order';
import PurchaseChildOrder from '../db/entity/purchase-child-order';

interface query {
  page: number,
  rows: number
}

interface query {
  dateRange?: any, // 采购单创建时间范围筛选
  categoryID?: number, // 商品类别 默认0(全部)
  supplierID?: number, // 供应商ID
  supplierName?: string // 供应商名称
}

export default class SupplierService extends BaseService {

  // -------------------------------------------------------------------------
  // Public Properties
  // -------------------------------------------------------------------------

  //- 采购订单
  readonly PO: Repository<ObjectLiteral>;
  //- 采购订单下的某个子商品的主订单
  readonly PMO: Repository<ObjectLiteral>;
  //- 某个子商品主订单下的子订单
  readonly PCO: Repository<ObjectLiteral>;

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------

  constructor(ctx) {
    super(ctx);
    this.PO = this.conn.getRepository(PurchaseOrder);
    this.PMO = this.conn.getRepository(PurchaseMainOrder);
    this.PCO = this.conn.getRepository(PurchaseChildOrder);
  }

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  async query({ page, rows, dateRange, categoryID, supplierID, supplierName }: query) {
    const where1 = supplierID > 0 ? `supplier.id = ${supplierID}` : '1 = 1';
    const where2 = categoryID > 0 ? `supplier.category_id = ${categoryID}` : '1 = 1';

    try {
      const query = await this.PO
        .createQueryBuilder('po')
        // .leftJoin('po.mainOrders', 'mainOrder')
        .leftJoin('po.category', 'category')
        .leftJoin('po.supplier', 'supplier')
        .select([
          'po.*',
          `DATE_FORMAT(po.createdAt,'%Y-%m-%d %H:%i:%s') AS createdAt`,
          'category.name',
          'supplier.tel',
          'supplier.id',
          'supplier.supplierName AS supplierName'
        ])
        .where(`ISNULL(po.deletedAt) AND ${where1} AND ${where2}`)
        .andWhere(`supplier.supplierName LIKE '%${supplierName}%'`);
      const total = await query.getCount();
      let list = await query
        .orderBy('po.createdAt', 'DESC')
        .skip((page - 1) * rows)
        .take(rows);
      // .getRawMany();
      // console.log('@@@@@@@@@@@@@@@@@@@@', list.getQuery());

      list = this.ctx.helper.toCamelObj(await list.getRawMany());
      return { list, total };
    } catch (e) {
      this.error(e);
    }
  }

  //- 插入采购单数据
  async insertPurchaseOrder(rowData) {
    try {
      return await this.PO.save(this.PO.create(rowData));
    } catch (e) {
      this.error(e);
    }
  }

  //- 插入采购的商品单数据
  async insertPurchaseMainOrder(rowData) {
    try {
      return await this.PMO.save(this.PMO.create(rowData));
    } catch (e) {
      this.error(e);
    }
  }

  //- 插入采购的商品单的子订单数据
  async insertPurchaseChildOrder(rowData) {
    try {
      return await this.PCO.save(this.PCO.create(rowData));
    } catch (e) {
      this.error(e);
    }
  }

  async update(rowData) {
    try {
      await this.PO.save(rowData);
    } catch (e) {
      this.error(e);
    }
  }
}
