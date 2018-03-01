import { Service } from 'egg';
import { Supplier } from "../db/entity/supplier";

export default class SupplierService extends Service {

  async query(query) {
    const log = this.app.logger;
    const db = await this.ctx.db;

    try {
      const supplier = await db.manager.find(Supplier);
      log.debug('供货商列表:', supplier)
      await db.close();
      return supplier;
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

  async update(rowData) {
    // delete rowData._index
    // delete rowData._rowKey

    const log = this.app.logger;
    const db = await this.ctx.db;
    const repo = db.getRepository(Supplier)
    log.debug('@@@@@@@@@@@', rowData)
    try {
      await repo.update(rowData);
      log.info('更新一条供货商记录：', rowData);
      await db.close();
    } catch (e) {
      log.error(e.message);
      await db.close();
    }
  }
}
