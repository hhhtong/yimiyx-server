import BaseService from '../core/base-service';
import { Supplier } from '../db/entity/supplier';
import { GoodsCategory } from '../db/entity/goods-category';

interface query {
  page: number,
  rows: number
}

interface query {
  areaCode: string, // 省份ID,城市ID
  goodsCategoryID: number, // 供应商类别 默认0(全部)
  supplierID: number, // 供应商编号
  supplierName: string // 供应商名称
}

export default class SupplierService extends BaseService {

  async query({ page, rows, areaCode, goodsCategoryID, supplierID, supplierName }: query) {
    const db = await this.db;
    const repo = db.getRepository(Supplier);
    const where1 = supplierID > 0 ? `supplier.id = ${supplierID}` : '1 = 1';
    const where2 = goodsCategoryID > 0 ? `supplier.goodsCategoryID = ${goodsCategoryID}` : '1 = 1';

    try {
      const [list, total] = await repo
        .createQueryBuilder('supplier')
        .leftJoinAndSelect('goods_category', 'category', 'category.id = supplier.goods_category_id')
        .where(`supplier.isDelete != 1 AND ${where1} AND ${where2}`)
        .andWhere(`supplier.areaCode LIKE '${areaCode}%'`)
        .andWhere(`supplier.supplierName LIKE '%${supplierName}%'`)
        .orderBy('supplier.id', 'ASC')
        .skip((page - 1) * rows)
        .take(rows)
        .getManyAndCount();
      const list1 = await repo
        .createQueryBuilder('supplier')
        .leftJoinAndSelect('goods_category', 'category', 'category.id = supplier.goods_category_id')
        .select([
          'category.no',
          'category.name',
          'supplier.id',
          'supplier.bankAddress',
          'supplier.bankName',
          'supplier.bankUsername'
        ])
        .getQuery();
        // .getMany();
      this.log.debug('12@%@%@%@@%@%@%@%@@%', list1)
      // this.log.debug('供货商列表:', list)
      await db.close();
      return { list, total };
    } catch (e) {
      await db.close();
      this.error(e);
    }
  }

  async insert(rowData) {
    const log = this.app.logger;
    const db = await this.db;
    const supplier: any = new Supplier();

    for (const key in rowData) {
      if (rowData.hasOwnProperty(key)) {
        supplier[key] = rowData[key];
      }
    }

    try {
      await db.manager.save(supplier);
      this.log.info('新增一条供货商记录：', supplier);
      await db.close();
    } catch (e) {
      await db.close();
      this.error(e);
    }
  }

  async update(id, rowData) {
    const log = this.app.logger;
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
