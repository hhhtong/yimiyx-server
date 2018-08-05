import { Repository, SelectQueryBuilder } from 'typeorm'
import BaseService from '../../core/base-service'
import Supplier from '../../model/entity/supplier'
import { SupplierQuery, SupplierResult } from '../../common/QueryInterface'

export default class SupplierService extends BaseService {

  // -------------------------------------------------------------------------
  // Public Properties
  // -------------------------------------------------------------------------

  // - 供货商__实体
  readonly supplier: Repository<Supplier>

  // -------------------------------------------------------------------------
  // Public Properties
  // -------------------------------------------------------------------------

  constructor(ctx) {
    super(ctx)
    this.supplier = this.conn.getRepository(Supplier)
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
  }: SupplierQuery): Promise<SupplierResult> {
    const where1: string = supplierID > 0 ? `supplier.id = ${supplierID}` : '1 = 1'
    const where2: string = categoryID > 0 ? `supplier.category_id = ${categoryID}` : '1 = 1'

    const query: SelectQueryBuilder<Supplier> = this.supplier
      .createQueryBuilder('supplier')
      .where(`ISNULL(supplier.deletedAt) AND ${where1} AND ${where2}`)
      .andWhere(`supplier.areaCode LIKE '${areaCode}%'`)
      .andWhere(`supplier.supplierName LIKE '%${supplierName}%'`)
      .orderBy('supplier.id', 'ASC')
    const total: number = await query.getCount()
    const list: Supplier[] = await query
      .skip((page - 1) * rows)
      .take(rows)
      .leftJoinAndSelect('supplier.category', 'category')
      .getMany()

    return { list, total }
  }

  async insert(raw: Partial<Supplier>, id: number): Promise<void> {
    try {
      raw = this.supplier.create(raw)
      await this.supplier.save({ ...raw, category: { id } })
    } catch (err) {
      this.error(err)
    }
  }

  async delete(raw: Partial<Supplier>): Promise<void> {
    try {
      await this.supplier.save({ ...raw, deletedAt: new Date() })
    } catch (err) {
      this.error(err)
    }
  }

  async update(raw: Partial<Supplier>): Promise<void> {
    try {
      raw = this.supplier.create(raw)
      await this.supplier.save(raw)
    } catch (err) {
      this.error(err)
    }
  }
}
