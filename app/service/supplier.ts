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
      log.info('插入数据成功：', supplier);
      await db.close()
    } catch (e) {
      log.error(e.message)
      await db.close()
    }
  }
}
