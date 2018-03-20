import BaseService from '../core/base-service';
import Goods from '../db/entity/goods';
import Store from '../db/entity/store';
import GoodsCategory from '../db/entity/goods-category';

export default class GoodsService extends BaseService {

  private async _getInstance(name = 'goods') {
    const db = await this.db;
    const repo = db.getRepository(Goods);
    const query = repo.createQueryBuilder(name);

    return { db, repo, query };
  }

  async query({ page, rows, name }) {
    const { db, query } = await this._getInstance();

    try {
      const list = await query
        .where('goods.isDelete != 1')
        .andWhere(`(goods.name LIKE '%${name}%' OR goods.type != 1)`)
        .orderBy('goods.no', 'DESC')
        // .skip((page - 1) * rows)
        // .take(rows)
        .getMany();
      const total = await query
        .where('goods.isDelete != 1')
        .andWhere(`(goods.name LIKE '%${name}%' AND goods.type = 1)`)
        .getCount();
      const idMax = await query
        .where('goods.isDelete != 1')
        .andWhere(`goods.name LIKE '%${name}%'`)
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
    const { db, repo } = await this._getInstance();
    const goods = repo.create(rowData)
    // Store
    // db.manage.save()
    try {
      await db.save(goods);
      this.log.info('新增一个分类：', goods);
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
