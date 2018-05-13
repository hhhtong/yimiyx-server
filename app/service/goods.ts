import BaseService from '../core/base-service';
import Goods from '../db/entity/goods';
import { WSAVERNOTSUPPORTED } from 'constants';

interface query {
  disabledPage: boolean, // 是否禁用分页，true将会忽略`page`和`rows`参数
  page?: number,
  rows?: number
}

interface query {
  isOnline?: string | number, // 是否出售中的商品
  goodsNo?: string, // 商品编号
  goodsName?: string // 商品名称
}

export default class GoodsService extends BaseService {

  private async __getInstance(name = 'goods') {
    const db = await this.db;
    const repo = db.getRepository(Goods);
    const query = repo.createQueryBuilder(name);

    return { db, repo, query };
  }

  async query({ page = 1, rows = 20, disabledPage = false, isOnline, goodsNo, goodsName }: query) {
    let { db, query, repo } = await this.__getInstance();
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

      let list = await query.orderBy('goods.createdAt', 'DESC');
      let total = await query.getCount();

      if (disabledPage) {
        list = await list
          .leftJoinAndSelect('goods.categorys', 'categorys')
          .getMany();
      } else {
        list = await list
          .skip((page - 1) * rows)
          .take(rows)
          .leftJoinAndSelect('goods.categorys', 'categorys')
          .getMany();
      }

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
