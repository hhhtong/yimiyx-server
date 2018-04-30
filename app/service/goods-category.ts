import BaseService from '../core/base-service';
import GoodsCategory from '../db/entity/goods-category';

export default class GoodsCategoryService extends BaseService {

  private async _getInstance(name = 'category') {
    const db = await this.db;
    const repo = db.getRepository(GoodsCategory);
    const query = repo.createQueryBuilder(name);

    return { db, repo, query };
  }

  async query({ page = 1, rows = 20, name = '' }) {
    let { db, query } = await this._getInstance();

    try {
      const list = await query
        .andWhere(`(category.name LIKE '%${name}%' OR category.type != 1)`)
        .orderBy('category.no', 'DESC')
        // .skip((page - 1) * rows)
        // .take(rows)
        .getMany();
      const total = await query
        .andWhere(`(category.name LIKE '%${name}%' AND category.type = 1)`)
        .getCount();
      const idMax = await query
        .andWhere(`category.name LIKE '%${name}%'`)
        .select("MAX(id) AS idMax")
        .getRawMany();

      await db.close();
      return { list, total, idMax: idMax[0].idMax };
    } catch (error) {
      await db.close();
      this.error(error);
    }
  }

  async insert(rowData) {
    const db = await this.db;
    const category: any = new GoodsCategory();

    for (const key in rowData) {
      if (rowData.hasOwnProperty(key)) {
        category[key] = rowData[key];
      }
    }

    try {
      await db.manager.save(category);
      await db.close();
    } catch (error) {
      await db.close();
      this.error(error);
    }
  }

  async update(rowData: any[any]) {
    const { db, repo } = await this._getInstance();

    try {
      await repo.save(rowData);
      this.log.info('更新一个分类：', rowData);
      await db.close();
    } catch (error) {
      await db.close();
      this.error(error);
    }
  }

  async delete(ids: any[number], rowData: object) {
    const { db, repo } = await this._getInstance();

    try {
      for (const id of ids) {
        await repo.updateById(id, rowData);
      }
      await db.close();
    } catch (error) {
      await db.close();
      this.error(error);
    }
  }
}
