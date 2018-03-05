import { Service } from 'egg';
import { Supplier } from '../db/entity/supplier';

export default class SupplierService extends Service {

  async query({ page, rows }) {
    const log = this.app.logger;
    const db = await this.ctx.db;
    const repo = db.getRepository(Supplier);

    try {
      const [list, total] = await repo
        .createQueryBuilder('supplier')
        .where('supplier.is_delete != 1')
        .orderBy('supplier.created_at', 'DESC')
        .skip((page - 1) * rows)
        .take(rows)
        .getManyAndCount();
      log.debug('供货商列表:', list)
      await db.close();
      return { list, total };
    } catch (e) {
      log.error(e.message);
      await db.close();
    }
  }

  async insert(rowData) {
    const log = this.app.logger;
    const db = await this.ctx.db;
    const supplier: any = new Supplier();

    for (const key in rowData) {
      if (rowData.hasOwnProperty(key)) {
        supplier[key] = rowData[key];
      }
    }

    try {
      await db.manager.save(supplier);
      log.info('新增一条供货商记录：', supplier);
      await db.close();
    } catch (e) {
      log.error(e.message);
      await db.close();
    }
  }

  async update(id, rowData) {
    const log = this.app.logger;
    const db = await this.ctx.db;
    const repo = db.getRepository(Supplier)

    try {
      await repo.updateById(id, rowData);
      log.info('更新一条供货商记录：', rowData);
      await db.close();
    } catch (e) {
      log.error(e.message);
      await db.close();
    }
  }
}
