import { Service } from 'egg';
import { GoodsCategory } from '../db/entity/goods-category';

export default class GoodsCategoryService extends Service {

  async query({ page, rows, name }) {
    const log = this.app.logger;
    const db = await this.ctx.db;
    const repo = db.getRepository(GoodsCategory);

    try {
      const query = repo.createQueryBuilder('category')
      const list = await query
        .where('category.is_delete != 1')
        .andWhere(`(category.name LIKE '%${name}%' OR category.type != 1)`)
        .orderBy('category.no', 'DESC')
        // .skip((page - 1) * rows)
        // .take(rows)
        .getMany();
      const total = await query
        .where('category.is_delete != 1')
        .andWhere(`(category.name LIKE '%${name}%' AND category.type = 1)`)
        .getCount();
      const idMax = await query
        .where('category.is_delete != 1')
        .andWhere(`category.name LIKE '%${name}%'`)
        .select("MAX(id) AS idMax")
        .getRawMany();

      log.debug('分类列表:', list)

      await db.close();
      return { list, total, idMax: idMax[0].idMax };
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
      log.info('新增一个分类：', category);
      await db.close();
    } catch (e) {
      log.error(e.message);
      await db.close();
    }
  }

  async update(rowData: any[any]) {
    const log = this.app.logger;
    const db = await this.ctx.db;
    const repo = db.getRepository(GoodsCategory);

    try {
      await repo.save(rowData);
      log.info('更新一个分类：', rowData);
      await db.close();
    } catch (e) {
      log.error(e.message);
      await db.close();
    }
  }

  async delete(ids: any[number], rowData: object) {
    const log = this.app.logger;
    const db = await this.ctx.db;
    const repo = db.getRepository(GoodsCategory);

    try {
      for (const id of ids) {
        await repo.updateById(id, rowData);
      }
      log.info('删除一些分类：', ids);
      // await db.close();
    } catch (e) {
      log.error(e.message);
      await db.close();
    }
  }
}
