import { Service } from 'egg';
import { Supplier } from "../db/entity/supplier";

export default class SupplierService extends Service {

  async query(query) {
    const log = this.app.logger;
    const db = await this.ctx.db;
    const repo = db.getRepository(Supplier);

    try {
      const supplier = await repo.createQueryBuilder("supplier")
        .getMany();
      log.debug('查询出的数据', 'supplier')
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

  async delete(rowData) {
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
      log.info('删除一条供货商记录：', supplier);
      await db.close();
    } catch (e) {
      log.error(e.message);
      await db.close();
    }
  }

  async update(rowData) {
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
      log.info('修改一条供货商记录：', supplier);
      await db.close();
    } catch (e) {
      log.error(e.message);
      await db.close();
    }
  }
}
