import BaseService from '../core/base-service';
import PurchaseOrder from '../db/entity/purchase-order';
import PurchaseGoodsOrder from '../db/entity/purchase-goods-order';
import PurchaseGoodsDetail from '../db/entity/purchase-goods-detail';

interface query {
  page: number,
  rows: number
}

interface query {
  dateRange?: string, // 采购单创建时间范围筛选
  categoryID?: number, // 商品类别 默认0(全部)
  supplierID?: number, // 供应商编号
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
        .createQueryBuilder('supplier')
        .where(`ISNULL(supplier.deletedAt) AND ${where1} AND ${where2}`)
        .andWhere(`supplier.supplierName LIKE '%${supplierName}%'`)
        .orderBy('supplier.id', 'ASC')
      const total = await query.getCount();
      const list = await query
        .skip((page - 1) * rows)
        .take(rows)
        .leftJoinAndSelect('supplier.category', 'category')
        .getMany();
      await db.close();
      return { list, total };
    } catch (e) {
      await db.close();
      this.error(e);
    }
  }

  async insert(rowData) {
    const db = await this.db;
    const repo = db.getRepository(PurchaseOrder);

    try {
      const id = rowData.categoryID
      rowData = repo.create(rowData)
      await repo.save({ ...rowData, category: { id } });
      await db.close();
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
