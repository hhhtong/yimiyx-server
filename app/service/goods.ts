import BaseService from '../core/base-service';
import Goods from '../db/entity/goods';

interface query {
  page: number,
  rows: number
}

interface query {
  goodsNo?: string, // 商品编号
  goodsName?: string, // 商品名称
  isOnline: string | number // 是否出售中的商品
}

export default class GoodsService extends BaseService {

  private async _getInstance(name = 'goods') {
    const db = await this.db;
    const repo = db.getRepository(Goods);
    const query = repo.createQueryBuilder(name);

    return { db, repo, query };
  }

  async query({ page = 1, rows = 20, goodsNo, goodsName, isOnline }: query) {
    let { db, query } = await this._getInstance();
    const where1 = +goodsNo ? `goods.goodsNo LIKE '%${goodsNo}%'` : '1 = 1';
    const where2 = +isOnline === 1
      ? `goods.isOnline = ${isOnline}`
      : +isOnline === 0
        ? 'goods.isOnline != 1'
        : '1 = 1';

    try {
      query = query
        .where('ISNULL(goods.deletedAt)')
        .andWhere(`goods.goodsName LIKE '%${goodsName}%' AND ${where1} AND ${where2}`);

      const list = await query
        .orderBy('goods.createdAt', 'DESC')
        .skip((page - 1) * rows)
        .take(rows)
        .leftJoinAndSelect('goods.categorys', 'categorys')
        .getMany();
      const total = await query.getCount();

      this.log.debug('商品列表:', list)

      await db.close();
      return { list, total };
    } catch (error) {
      await db.close();
      this.error(error);
    }
  }

  async save(goodsColumnData) {
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

  async delete(id: number) {
    const { db, repo } = await this._getInstance();

    try {
      await repo.updateById(id, { deletedAt: new Date() });
      this.log.info('删除一个商品,ID：', id);
      await db.close();
    } catch (error) {
      await db.close();
      this.error(error);
    }
  }
}
