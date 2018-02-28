import { Service } from 'egg';
import { Supplier } from "../db/entity/supplier";

export default class SupplierService extends Service {

  async insert(rowData) {
    const db = await this.ctx.db;
    const supplier: any = new Supplier();
    const log = this.app.logger;

    for (const key in rowData) {
      if (rowData.hasOwnProperty(key)) {
        supplier[key] = rowData[key];
      }
    }

    try {
      await db.manager.save(supplier);
      log.info('新增一条供货商记录：', supplier);
      await db.close()
    } catch (e) {
      log.error(e.message)
      await db.close()
    }
  }

  async delete(rowData) {
    const db = await this.ctx.db;
    const supplier: any = new Supplier();
    const log = this.app.logger;

    for (const key in rowData) {
      if (rowData.hasOwnProperty(key)) {
        supplier[key] = rowData[key];
      }
    }

    try {
      await db.manager.save(supplier);
      log.info('删除一条供货商记录：', supplier);
      await db.close()
    } catch (e) {
      log.error(e.message)
      await db.close()
    }
  }

  async update(rowData) {
    const db = await this.ctx.db;
    const supplier: any = new Supplier();
    const log = this.app.logger;

    for (const key in rowData) {
      if (rowData.hasOwnProperty(key)) {
        supplier[key] = rowData[key];
      }
    }

    try {
      await db.manager.save(supplier);
      log.info('修改一条供货商记录：', supplier);
      await db.close()
    } catch (e) {
      log.error(e.message)
      await db.close()
    }
  }
}
