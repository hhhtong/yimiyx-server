import { Repository } from 'typeorm'
import BaseService from '../../core/base-service'
import PurchaseOrder from '../../model/entity/purchase-order'
import PurchaseMainOrder from '../../model/entity/purchase-main-order'
import PurchaseChildOrder from '../../model/entity/purchase-child-order'
import {
  PurchaseOrderQuery,
  PurchaseOrderResult
} from '../../common/QueryInterface'

export default class SupplierService extends BaseService {
  // -------------------------------------------------------------------------
  // Public Properties
  // -------------------------------------------------------------------------

  // - 采购单__实体
  readonly PO: Repository<PurchaseOrder>
  // - 采购商品__实体
  readonly PMO: Repository<PurchaseMainOrder>
  // - 采购子商品__实体
  readonly PCO: Repository<PurchaseChildOrder>

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------

  constructor(ctx) {
    super(ctx)
    this.PO = this.conn.getRepository(PurchaseOrder)
    this.PMO = this.conn.getRepository(PurchaseMainOrder)
    this.PCO = this.conn.getRepository(PurchaseChildOrder)
  }

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  // - 根据条件查找采购单集合
  async find({
    page = 1,
    rows = 20,
    dateRange,
    categoryID = 0,
    supplierID = 0,
    supplierName
  }: PurchaseOrderQuery): Promise<PurchaseOrderResult> {
    let where: string = 'ISNULL(PO.deletedAt)'

    if (dateRange) {
      where += ` AND PO.createdAt BETWEEN '${dateRange[0]}' AND '${
        dateRange[1]
      }'`
    }

    const where1: string = supplierID > 0 ? `S.id = ${supplierID}` : '1 = 1'
    const where2: string = categoryID > 0 ? `C.id = ${categoryID}` : '1 = 1'
    const where3: string =
      supplierName && supplierName.trim() !== ''
        ? `S.supplierName LIKE '%${supplierName}%'`
        : '1 = 1'

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
      order: { createdAt: 'DESC' }, // - PO.createdAt
      skip: (page - 1) * rows,
      take: rows
    })

    const total: number = await this.PO.createQueryBuilder('PO')
      .where(where)
      .getCount()

    return { list, total }
  }

  // - 根据一组采购单的 id 获取相关联的采购商品单列表
  async findByIds(ids: string[]): Promise<PurchaseOrder[] | undefined> {
    return this.PO.findByIds(ids, {
      relations: [
        'category',
        'supplier',
        'mainOrders',
        'mainOrders.goods',
        'mainOrders.childOrders'
      ]
    })
  }

  // - 查找符合id的采购单所有关联信息
  async findOne(id: string): Promise<PurchaseOrder> {
    return (
      (await this.PO.findOne(id, {
        relations: [
          'category',
          'supplier',
          'mainOrders',
          'mainOrders.goods',
          'mainOrders.childOrders'
        ]
      })) || this.purchaseOrderInstance
    )
  }

  get purchaseOrderInstance() {
    return this.PO.create()
  }

  // - 插入采购单数据
  async insertPurchaseOrder(rowData: Partial<PurchaseOrder>): Promise<boolean> {
    try {
      await this.PO.save(this.PO.create(rowData))
      return true
    } catch (err) {
      this.error(err)
      return false
    }
  }

  // - 插入采购的商品单数据
  async insertPurchaseMainOrder(
    rowData: Partial<PurchaseMainOrder>[]
  ): Promise<PurchaseMainOrder[] | undefined> {
    try {
      return await this.PMO.save(this.PMO.create(rowData))
    } catch (err) {
      this.error(err)
    }
  }

  // - 插入采购的商品单的子订单数据
  async insertPurchaseChildOrder(
    rowData: Partial<PurchaseChildOrder>[]
  ): Promise<PurchaseChildOrder[] | undefined> {
    try {
      return await this.PCO.save(this.PCO.create(rowData))
    } catch (err) {
      this.error(err)
    }
  }

  // - 假删除一条采购单数据
  async deletePurchaseOrder(rowData: Partial<PurchaseOrder>): Promise<void> {
    try {
      await this.PO.save({ ...rowData, deletedAt: new Date() })
    } catch (err) {
      this.error(err)
    }
  }

  // - 更新采购单数据
  async updatePurchaseOrder(rowData: Partial<PurchaseOrder>) {
    try {
      await this.PO.save(rowData)
    } catch (err) {
      this.error(err)
    }
  }
}
