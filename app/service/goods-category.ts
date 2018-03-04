import { Service } from 'egg';
import { GoodsCategory } from '../db/entity/goods-category';

export default class GoodsCategoryService extends Service {

  async query({ page, rows }) {
    const log = this.app.logger;
    const db = await this.ctx.db;
    const repo = db.getRepository(GoodsCategory)

    try {
      const category = await repo
        .createQueryBuilder('category')
        .skip((page - 1) * rows)
        .take(rows)
        .getMany();
      log.debug('分类列表:', category)
      await db.close();
      return category;
    } catch (e) {
      log.error(e.message);
      await db.close();
    }
  }

  async insert(rowData) {
    const log = this.app.logger;
    const db = await this.ctx.db;
    const category: any = new GoodsCategory();

    for (const key in rowData) {
      if (rowData.hasOwnProperty(key)) {
        category[key] = rowData[key];
      }
    }

    try {
      await db.manager.save(category);
      log.info('新增一条分类：', category);
      await db.close();
    } catch (e) {
      log.error(e.message);
      await db.close();
    }
  }

  async update(id, rowData) {
    const log = this.app.logger;
    const db = await this.ctx.db;
    const repo = db.getRepository(GoodsCategory)

    try {
      await repo.updateById(id, rowData);
      log.info('更新一条分类：', rowData);
      await db.close();
    } catch (e) {
      log.error(e.message);
      await db.close();
    }
  }
}
