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

  private async __getInstance(name = 'goods') {
    const db = await this.db;
    const repo = db.getRepository(Goods);
    const query = repo.createQueryBuilder(name);

    return { db, repo, query };
  }

  async query({ page = 1, rows = 20, goodsNo, goodsName, isOnline }: query) {
    let { db, query } = await this.__getInstance();
    const where1 = +goodsNo ? `goods.goodsNo LIKE '%${goodsNo}%'` : '1 = 1';
    const where2 = goodsName ? `goods.goodsName LIKE '%${goodsName}%'` : '1 = 1';
    const where3 = +isOnline === 1
      ? `goods.isOnline = ${isOnline}`
      : +isOnline === 0
        ? 'goods.isOnline != 1'
        : '1 = 1';

    try {
      query = query
        .where('ISNULL(goods.deletedAt)')
        .andWhere(`${where1} AND ${where2} AND ${where3}`);

      const list = await query
        .orderBy('goods.createdAt', 'DESC')
        .skip((page - 1) * rows)
        .take(rows)
        .leftJoinAndSelect('goods.categorys', 'categorys')
        .getMany();
      const total = await query.getCount();

      await db.close();
      return { list, total };
    } catch (error) {
      await db.close();
      this.error(error);
    }
  }

  async save(goodsColumnData) {
    const { db, repo } = await this.__getInstance();
    goodsColumnData = repo.create(goodsColumnData);

    try {
      await repo.save(goodsColumnData);
      await db.close();
    } catch (error) {
      await db.close();
      this.error(error);
    }
  }

  async getMaxGoodsNo(goodsNoPrefix: string) {
    const { db, query } = await this.__getInstance();
    const maxNo: number = await query.where(`goods.goodsNo LIKE '${goodsNoPrefix}%'`).getCount() + 1;

    await db.close();
    return goodsNoPrefix + this.ctx.helper.prefixZero(maxNo, 4);
  }

  async delete(id: number) {
    const { db, repo } = await this.__getInstance();

    try {
      await repo.updateById(id, { deletedAt: new Date() });
      await db.close();
    } catch (error) {
      await db.close();
      this.error(error);
    }
  }
}
