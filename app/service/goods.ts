import BaseService from '../core/base-service';
import Goods from '../db/entity/goods';

interface query {
  page: number,
  rows: number
}

interface query {
  goodsNo?: string, // 商品编号
  goodsName?: string // 商品名称
}

export default class GoodsService extends BaseService {

  private async _getInstance(name = 'goods') {
    const db = await this.db;
    const repo = db.getRepository(Goods);
    const query = repo.createQueryBuilder(name);

    return { db, repo, query };
  }

  async query({ page = 1, rows = 20, goodsNo, goodsName }: query) {
    const { db, query } = await this._getInstance();
    const where1 = +goodsNo ? `goods.goodsNo = ${goodsNo}` : '1 = 1';

    try {
      const list = await query
        .where(`goods.goodsName LIKE '%${goodsName}%' AND ${where1}`)
        .skip((page - 1) * rows)
        .take(rows)
        .getMany();
      const total = await query
        .where(`goods.goodsName LIKE '%${goodsName}%'`)
        .getCount();

      this.log.debug('分类列表:', list)

      await db.close();
      return { list, total };
    } catch (error) {
      await db.close();
      this.error(error);
    }
  }

  async insert(goodsColumnData) {
    const { db, repo, query } = await this._getInstance();
    let goodsNo: string = goodsColumnData.goodsNo;
    const maxNo: number = await query.where(`goods.goodsNo LIKE '${goodsNo}%'`).getCount() + 1;

    goodsNo = goodsNo + this.ctx.helper.prefixZero(maxNo, 4)
    goodsColumnData = repo.create({ ...goodsColumnData, goodsNo });

    try {
      await repo.save(goodsColumnData);
      this.log.info('新增一个商品：', goodsColumnData);
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
