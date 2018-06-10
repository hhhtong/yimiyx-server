import { Repository, ObjectLiteral } from 'typeorm';
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

  // -------------------------------------------------------------------------
  // Public Properties
  // -------------------------------------------------------------------------

  readonly Supplier: Repository<ObjectLiteral>

  // -------------------------------------------------------------------------
  // Public Properties
  // -------------------------------------------------------------------------

  constructor(ctx) {
    super(ctx);
    this.Supplier = this.conn.getRepository(Supplier);
  }

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  async query({ page = 1, rows = 20, areaCode = '', categoryID = 0, supplierID = 0, supplierName = '' }: query) {
    const where1 = supplierID > 0 ? `supplier.id = ${supplierID}` : '1 = 1';
    const where2 = categoryID > 0 ? `supplier.category_id = ${categoryID}` : '1 = 1';

    try {
      const query = await this.Supplier
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

      return { list, total };
    } catch (e) {
      this.error(e);
    }
  }

  async insert(rowData) {
    try {
      const id = rowData.categoryID
      rowData = this.Supplier.create(rowData)
      await this.Supplier.save({ ...rowData, category: { id } });
    } catch (e) {
      this.error(e);
    }
  }

  async delete(rowData) {
    try {
      await this.Supplier.save({ ...rowData, deletedAt: new Date() })
    } catch (e) {
      this.error(e);
    }
  }

  async update(rowData) {
    try {
      await this.Supplier.save(rowData)
    } catch (e) {
      this.error(e);
    }
  }
}
