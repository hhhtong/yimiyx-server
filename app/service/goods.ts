import BaseService from '../core/base-service';
import Goods from '../db/entity/goods';

export default class GoodsService extends BaseService {

  private async _getInstance(name = 'category') {
    const db = await this.db;
    const repo = db.getRepository(Goods);
    const query = repo.createQueryBuilder(name);

    return { db, repo, query };
  }

  async queryOneList(type = 1) {
    const { db, query } = await this._getInstance();

    try {
      const list = await query
        .where('category.isDelete != 1')
        .andWhere(`category.type = ${type}`)
        .getMany();

      this.log.debug('一级分类options:', list)

      await db.close();
      return list;
    } catch (error) {
      await db.close();
      this.error(error);
    }
  }

  async query({ page, rows, name }) {
    const { db, query } = await this._getInstance();

    try {
      const list = await query
        .where('category.isDelete != 1')
        .andWhere(`(category.name LIKE '%${name}%' OR category.type != 1)`)
        .orderBy('category.no', 'DESC')
        // .skip((page - 1) * rows)
        // .take(rows)
        .getMany();
      const total = await query
        .where('category.isDelete != 1')
        .andWhere(`(category.name LIKE '%${name}%' AND category.type = 1)`)
        .getCount();
      const idMax = await query
        .where('category.isDelete != 1')
        .andWhere(`category.name LIKE '%${name}%'`)
        .select("MAX(id) AS idMax")
        .getRawMany();

      this.log.debug('分类列表:', list)

      await db.close();
      return { list, total, idMax: idMax[0].idMax };
    } catch (error) {
      await db.close();
      this.error(error);
    }
  }

  async insert(rowData) {
    const log = this.app.logger;
    const db = await this.db;
    const category: any = new Goods();

    for (const key in rowData) {
      if (rowData.hasOwnProperty(key)) {
        category[key] = rowData[key];
      }
    }

    try {
      await db.manager.save(category);
      this.log.info('新增一个分类：', category);
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
      this.log.info('删除一些分类：', ids);
      await db.close();
    } catch (error) {
      await db.close();
      this.error(error);
    }
  }
}
