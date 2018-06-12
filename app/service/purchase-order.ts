import { Repository, ObjectLiteral, createQueryBuilder } from 'typeorm';
import BaseService from '../core/base-service';
import PurchaseOrder from '../db/entity/purchase-order';
import PurchaseMainOrder from '../db/entity/purchase-main-order';
import PurchaseChildOrder from '../db/entity/purchase-child-order';

interface IQuery {
  page: number,
  rows: number
}

interface IQuery {
  dateRange?: any, // 采购单创建时间范围筛选
  categoryID?: number, // 商品类别 默认0(全部)
  supplierID?: number, // 供应商ID
  supplierName?: string // 供应商名称
}

// type IResult<T> = {
//   [P in keyof T]?: IResult<T[P]>;
// list: Object[],
// total: number
// }

export default class SupplierService extends BaseService {

  // -------------------------------------------------------------------------
  // Public Properties
  // -------------------------------------------------------------------------

  //- 采购单__实体
  readonly PO: Repository<ObjectLiteral>;
  //- 采购商品__实体
  readonly PMO: Repository<ObjectLiteral>;
  //- 采购子商品__实体
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

  //- 根据条件查找采购单集合
  async findConditions({ page, rows, dateRange, categoryID, supplierID, supplierName }: IQuery): Promise<Object> {
    const where1 = supplierID > 0 ? `supplier.id = ${supplierID}` : '1 = 1';
    const where2 = categoryID > 0 ? `supplier.category_id = ${categoryID}` : '1 = 1';

    try {
      const query = await this.PO
        .createQueryBuilder('PO')
        // .leftJoin('PO.mainOrders', 'mainOrder')
        .leftJoin('PO.category', 'category')
        .leftJoin('PO.supplier', 'supplier')
        .select([
          'PO.*',
          `DATE_FORMAT(PO.createdAt,'%Y-%m-%d %H:%i:%s') AS createdAt`,
          'category.name',
          'supplier.tel',
          'supplier.id',
          'supplier.supplierName AS supplierName'
        ])
        .where(`ISNULL(PO.deletedAt) AND ${where1} AND ${where2}`)
        .andWhere(`supplier.supplierName LIKE '%${supplierName}%'`);

      // console.log('@@@@@@@@@@@@@@@@@@@@@@@@', query.getSql());

      const total = await query.getCount();
      let list = await query
        .orderBy('PO.createdAt', 'DESC')
        .skip((page - 1) * rows)
        .take(rows)
        .getRawMany();

      list = this.ctx.helper.toCamelObj(list);
      this.findByIds(list.map(item => item.id));
      return Promise.resolve({ list, total });
    } catch (e) {
      this.error(e);
    }
  }

  //- 根据一组采购单的 id 获取相关联的采购商品单列表
  async findByIds(ids: string[]) {
    try {
      const list: Object[] = await this.PO
        .findByIds(ids, {
          relations: [
            'category',
            'supplier',
            'mainOrders',
            'mainOrders.goods',
            'mainOrders.childOrders'
          ]
        })
      // console.log('@@@@@@@@@@@@@@@', list);
      return Promise.resolve(list);
    } catch (e) {
      this.error(e);
    }
  }

  //- 查找符合id的采购单所有关联信息
  async findOne(id: number) {
    try {
      const data: Object = await this.PO.findOne(id, {
        relations: [
          'category',
          'supplier',
          'mainOrders',
          'mainOrders.goods',
          'mainOrders.childOrders'
        ]
      })
      return Promise.resolve(data);
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

  //- 假删除一条采购单数据
  async deletePurchaseOrder(rowData) {
    try {
      await this.PO.save({ ...rowData, deletedAt: new Date() });
    } catch (e) {
      this.error(e);
    }
  }

  //- 更新采购单数据
  async updatePurchaseOrder(rowData) {
    try {
      await this.PO.save(rowData);
    } catch (e) {
      this.error(e);
    }
  }
}
