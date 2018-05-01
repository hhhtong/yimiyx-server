import BaseService from '../core/base-service';
import Supplier from '../db/entity/supplier';

interface query {
  page: number,
  rows: number
}

interface query {
  areaCode?: string, // 省份ID,城市ID
  categoryID?: number, // 商品类别 默认0(全部)
  supplierID?: number, // 供应商编号
  supplierName?: string // 供应商名称
}

export default class SupplierService extends BaseService {

  async query({ page = 1, rows = 20, areaCode = '', categoryID = 0, supplierID = 0, supplierName = '' }: query) {
    const db = await this.db;
    const repo = db.getRepository(Supplier);
    const where1 = supplierID > 0 ? `supplier.id = ${supplierID}` : '1 = 1';
    const where2 = categoryID > 0 ? `supplier.category_id = ${categoryID}` : '1 = 1';

    try {
      const query = await repo
        .createQueryBuilder('supplier')
        .where(`ISNULL(supplier.deletedAt) AND ${where1} AND ${where2}`)
        .andWhere(`supplier.areaCode LIKE '${areaCode}%'`)
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
    const repo = db.getRepository(Supplier);

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
    const repo = db.getRepository(Supplier)

    try {
      await repo.updateById(id, rowData);
      await db.close();

    } catch (e) {
      await db.close();
      this.error(e);
    }
  }
}
