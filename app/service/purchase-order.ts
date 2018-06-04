import BaseService from '../core/base-service';
import PurchaseOrder from '../db/entity/purchase-order';
import PurchaseMainOrder from '../db/entity/purchase-main-order';
import PurchaseChildOrder from '../db/entity/purchase-child-order';
import Goods from '../db/entity/goods';
import GoodsCategory from '../db/entity/goods-category';
import Supplier from '../db/entity/supplier';

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

  async query({ page, rows, dateRange, categoryID, supplierID, supplierName }: query) {
    const db = await this.db;
    const repo = db.getRepository(PurchaseOrder);
    const where1 = supplierID > 0 ? `supplier.id = ${supplierID}` : '1 = 1';
    const where2 = categoryID > 0 ? `supplier.category_id = ${categoryID}` : '1 = 1';

    try {
      const query = await repo
        .createQueryBuilder('po')
        .where(`ISNULL(po.deletedAt) AND ${where1} AND ${where2}`)
        // .andWhere(`supplier.supplierName LIKE '%${supplierName}%'`)
        .orderBy('po.createdAt', 'ASC')
      const total = await query.getCount();
      let list = await query
        .skip((page - 1) * rows)
        .take(rows)
        // .leftJoin('po.mainOrders', 'mainOrder')
        .leftJoin('po.category', 'category')
        .leftJoin('po.supplier', 'supplier')
        .select([
          'po.*',
          'category.name AS categoryName',
          'supplier.tel AS supplierTel',
          'supplier.id AS supplierID',
          'supplier.supplierName AS supplierName'
        ])
        // .getRawMany();
      console.log('@@@@@@@@@@@@@@@@@@@@', list.getQuery());

      list = this.ctx.helper.toCamelObj(await list.getRawMany())
      await db.close();
      return { list, total };
    } catch (e) {
      await db.close();
      this.error(e);
    }
  }

  // 插入采购单数据
  async insertPurchaseOrder(rowData) {
    const db = await this.db;
    const repo = db.getRepository(PurchaseOrder);

    try {
      rowData = repo.create(rowData)
      await repo.save(rowData);
      await db.close();
    } catch (e) {
      await db.close();
      this.error(e);
    }
  }

  // 插入采购的商品单数据
  async insertPurchaseMainOrder(rowData) {
    const db = await this.db;
    const repo = db.getRepository(PurchaseMainOrder);

    try {
      rowData = repo.create(rowData)
      rowData = await repo.save(rowData);
      await db.close();
      return rowData;
    } catch (e) {
      await db.close();
      this.error(e);
    }
  }

  // 插入采购的商品单的子订单数据
  async insertPurchaseChildOrder(rowData) {
    const db = await this.db;
    const repo = db.getRepository(PurchaseChildOrder);

    try {
      rowData = repo.create(rowData)
      rowData = await repo.save(rowData);
      await db.close();
      return rowData;
    } catch (e) {
      await db.close();
      this.error(e);
    }
  }

  async update(id, rowData) {
    const db = await this.db;
    const repo = db.getRepository(PurchaseOrder)

    try {
      await repo.updateById(id, rowData);
      await db.close();

    } catch (e) {
      await db.close();
      this.error(e);
    }
  }
}
