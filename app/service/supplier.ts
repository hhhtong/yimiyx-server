import { Service } from 'egg';
import { Logger } from 'egg-logger';
import { Supplier } from "../entity/supplier";

const log = new Logger()

export default class SupplierService extends Service {
  async insert(rowData) {
    const db = await this.ctx.db;
    const supplier: any = new Supplier(rowData);

    try {
      await db.manager.save(supplier);
      log.info('插入数据成功：', supplier);
    } catch (e) {
      log.error(e.message)
    }
  }
}
