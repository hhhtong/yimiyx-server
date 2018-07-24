import { Repository } from 'typeorm';
import BaseService from '../../core/base-service';
import PurchaseOrder from '../../model/entity/purchase-order';
import PurchaseMainOrder from '../../model/entity/purchase-main-order';
import PurchaseChildOrder from '../../model/entity/purchase-child-order';
import { Query, QueryResult } from '../../common/query-interface';

interface IQuery extends Query {
  dateRange?: string[], // 采购单创建时间范围筛选
  categoryID?: number, // 商品类别 默认0(全部)
  supplierID?: number, // 供应商ID
  supplierName?: string // 供应商名称
}

export default class SupplierService extends BaseService {

  // -------------------------------------------------------------------------
  // Public Properties
  // -------------------------------------------------------------------------

  // - 采购单__实体
  readonly PO: Repository<PurchaseOrder>;
  // - 采购商品__实体
  readonly PMO: Repository<PurchaseMainOrder>;
  // - 采购子商品__实体
  readonly PCO: Repository<PurchaseChildOrder>;

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

  // - 根据条件查找采购单集合
  async find({
    page = 1,
    rows = 20,
    dateRange,
    categoryID,
    supplierID,
    supplierName }: IQuery): Promise<QueryResult<PurchaseOrder>> {
    let where: string = 'ISNULL(PO.deletedAt)';

    if (dateRange) {
      where += ` AND PO.createdAt BETWEEN '${dateRange[0]}' AND '${dateRange[1]}'`;
    }

    const where1: string = supplierID > 0 ? `S.id = ${supplierID}` : '1 = 1';
    const where2: string = categoryID > 0 ? `C.id = ${categoryID}` : '1 = 1';
    const where3: string = supplierName && supplierName.trim() !== '' ? `S.supplierName LIKE '%${supplierName}%'` : '1 = 1';

    try {
      const list: PurchaseOrder[] = await this.PO.find({
        join: {
          alias: 'PO',
          leftJoinAndSelect: {
            C: 'PO.category',
            S: 'PO.supplier',
            MO: 'PO.mainOrders',
            G: 'MO.goods',
            CO: 'MO.childOrders'
          }
        },
        where: `${where} AND ${where1} AND ${where2} AND ${where3}`,
        order: { 'createdAt': 'DESC' }, // - PO.createdAt
        skip: (page - 1) * rows,
        take: rows
      })

      const total: number = await this.PO
        .createQueryBuilder('PO')
        .where(where)
        .getCount();

      return { list, total };
    } catch (e) {
      this.error(e);
    }
  }

  // - 根据一组采购单的 id 获取相关联的采购商品单列表
  async findByIds(ids: string[]): Promise<QueryResult<PurchaseOrder>> {
    try {
      return await this.PO.findByIds(ids, {
        relations: [
          'category',
          'supplier',
          'mainOrders',
          'mainOrders.goods',
          'mainOrders.childOrders'
        ]
      })
    } catch (e) {
      this.error(e);
    }
  }

  // - 查找符合id的采购单所有关联信息
  async findOne(id: number): Promise<QueryResult<PurchaseOrder>> {
    try {
      return await this.PO.findOne(id, {
        relations: [
          'category',
          'supplier',
          'mainOrders',
          'mainOrders.goods',
          'mainOrders.childOrders'
        ]
      })
    } catch (e) {
      this.error(e);
    }
  }

  // - 插入采购单数据
  async insertPurchaseOrder(rowData): Promise<QueryResult<PurchaseOrder>> {
    try {
      return await this.PO.save(this.PO.create(rowData));
    } catch (e) {
      this.error(e);
    }
  }

  // - 插入采购的商品单数据
  async insertPurchaseMainOrder(rowData): Promise<QueryResult<PurchaseMainOrder>> {
    try {
      return await this.PMO.save(this.PMO.create(rowData));
    } catch (e) {
      this.error(e);
    }
  }

  // - 插入采购的商品单的子订单数据
  async insertPurchaseChildOrder(rowData): Promise<QueryResult<PurchaseChildOrder>> {
    try {
      return await this.PCO.save(this.PCO.create(rowData));
    } catch (e) {
      this.error(e);
    }
  }

  // - 假删除一条采购单数据
  async deletePurchaseOrder(rowData): Promise<void> {
    try {
      await this.PO.save({ ...rowData, deletedAt: new Date() });
    } catch (e) {
      this.error(e);
    }
  }

  // - 更新采购单数据
  async updatePurchaseOrder(rowData) {
    try {
      await this.PO.save(rowData);
    } catch (e) {
      this.error(e);
    }
  }
}
