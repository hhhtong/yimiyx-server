import { Repository, SelectQueryBuilder } from 'typeorm';
import BaseService from '../../core/base-service';
import Supplier from '../../model/entity/supplier';
import { Query, QueryResult } from '../../common/query-interface';

interface IQuery extends Query {
  areaCode?: string, // 省份ID,城市ID
  categoryID?: number, // 商品类别 默认0(全部)
  supplierID?: number, // 供应商编号
  supplierName?: string // 供应商名称
}

export default class SupplierService extends BaseService {

  // -------------------------------------------------------------------------
  // Public Properties
  // -------------------------------------------------------------------------

  // - 供货商__实体
  readonly Supplier: Repository<Supplier>

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

  async query({
    page = 1,
    rows = 20,
    areaCode = '',
    categoryID = 0,
    supplierID = 0,
    supplierName = ''
  }: IQuery): Promise<QueryResult<Supplier>> {
    const where1: string = supplierID > 0 ? `supplier.id = ${supplierID}` : '1 = 1';
    const where2: string = categoryID > 0 ? `supplier.category_id = ${categoryID}` : '1 = 1';

    try {
      const query: SelectQueryBuilder<Supplier> = await this.Supplier
        .createQueryBuilder('supplier')
        .where(`ISNULL(supplier.deletedAt) AND ${where1} AND ${where2}`)
        .andWhere(`supplier.areaCode LIKE '${areaCode}%'`)
        .andWhere(`supplier.supplierName LIKE '%${supplierName}%'`)
        .orderBy('supplier.id', 'ASC')
      const total: number = await query.getCount();
      const list: Supplier[] = await query
        .skip((page - 1) * rows)
        .take(rows)
        .leftJoinAndSelect('supplier.category', 'category')
        .getMany();

      return { list, total };
    } catch (e) {
      this.error(e);
    }
  }

  async insert(rowData): Promise<void> {
    try {
      const id: number = rowData.categoryID
      rowData = this.Supplier.create(rowData)
      await this.Supplier.save({ ...rowData, category: { id } });
    } catch (e) {
      this.error(e);
    }
  }

  async delete(rowData): Promise<void> {
    try {
      await this.Supplier.save({ ...rowData, deletedAt: new Date() })
    } catch (e) {
      this.error(e);
    }
  }

  async update(rowData): Promise<void> {
    try {
      await this.Supplier.save(rowData)
    } catch (e) {
      this.error(e);
    }
  }
}
