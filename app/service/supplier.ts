import BaseService from '../core/base-service';
import Supplier from '../db/entity/supplier';
import GoodsCategory from '../db/entity/goods-category';

interface query {
  page: number,
  rows: number
}

interface query {
  areaCode: string, // 省份ID,城市ID
  categoryID: number, // 供应商类别 默认0(全部)
  supplierID: number, // 供应商编号
  supplierName: string // 供应商名称
}

export default class SupplierService extends BaseService {

  async query({ page, rows, areaCode, categoryID, supplierID, supplierName }: query) {
    const db = await this.db;
    const repo = db.getRepository(Supplier);
    const where1 = supplierID > 0 ? `supplier.id = ${supplierID}` : '1 = 1';
    const where2 = categoryID > 0 ? `supplier.categoryID = ${categoryID}` : '1 = 1';

    try {
      const query = await repo
        .createQueryBuilder('supplier')
        .where(`supplier.isDelete != :isDelete AND ${where1} AND ${where2}`, { isDelete: 1 })
        .andWhere(`supplier.areaCode LIKE '${areaCode}%'`)
        .andWhere(`supplier.supplierName LIKE '%${supplierName}%'`)
        .orderBy('supplier.id', 'ASC')
        .skip((page - 1) * rows)
        .take(rows);
      const total = await query.getCount();
      const list = await query
        .leftJoin('supplier.categoryID', 'category')
        .select([
          'supplier.id as id',
          'supplier.level as level',
          'supplier.supplierName as supplierName',
          'supplier.linkmanName as linkmanName',
          'supplier.tel as tel',
          'supplier.areaCode as areaCode',
          'supplier.areaName as areaName',
          'supplier.address as address',
          'supplier.supplierType as supplierType',
          'supplier.taxNo as taxNo',
          'supplier.payType as payType',
          'supplier.accountNo as accountNo',
          'supplier.bankName as bankName',
          'supplier.bankUsername as bankUsername',
          'supplier.bankAddress as bankAddress',
          'category.id as categoryID',
          'category.name as categoryName'
        ])
        .getRawMany();
      this.log.debug('供货商列表:', list)
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
      rowData.categoryID = { id }
      await repo.save(rowData);
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
      this.log.info('更新一条供货商记录：', rowData);
      await db.close();

    } catch (e) {
      await db.close();
      this.error(e);
    }
  }
}
