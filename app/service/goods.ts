import { Repository, ObjectLiteral } from 'typeorm';
import BaseService from '../core/base-service';
import Goods from '../db/entity/goods';

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

  // -------------------------------------------------------------------------
  // Public Properties
  // -------------------------------------------------------------------------

  //- 商品__实体
  readonly Goods: Repository<ObjectLiteral>;

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------

  constructor(ctx) {
    super(ctx);
    this.Goods = this.conn.getRepository(Goods);
  }

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  async query({ page = 1, rows = 20, disabledPage = false, isOnline, goodsNo, goodsName }: query) {
    const where1 = +goodsNo ? `g.goodsNo LIKE '%${goodsNo}%'` : '1 = 1';
    const where2 = goodsName ? `g.goodsName LIKE '%${goodsName}%'` : '1 = 1';
    const where3 = +isOnline === 1
      ? `g.isOnline = ${isOnline}`
      : +isOnline === 0
        ? 'g.isOnline != 1'
        : '1 = 1';

    try {
      const query = this.Goods
        .createQueryBuilder('g')
        .where('ISNULL(g.deletedAt)')
        .andWhere(`${where1} AND ${where2} AND ${where3}`);
      let list: any = await query.orderBy('g.createdAt', 'DESC');
      let total: number = await query.getCount();

      if (disabledPage) {
        list = await list
          .leftJoinAndSelect('g.categorys', 'categorys')
          .getMany();
      } else {
        list = await list
          .skip((page - 1) * rows)
          .take(rows)
          .leftJoinAndSelect('g.categorys', 'categorys')
          .getMany();
      }

      return { list, total };
    } catch (error) {
      this.error(error);
    }
  }

  async save(rowData: any) {
    try {
      await this.Goods.save(this.Goods.create(rowData));
    } catch (error) {
      this.error(error);
    }
  }

  async getMaxGoodsNo(goodsNoPrefix: string) {
    const maxNo: number = await this.Goods.createQueryBuilder('g').where(`g.goodsNo LIKE '${goodsNoPrefix}%'`).getCount() + 1;
    return goodsNoPrefix + this.ctx.helper.prefixZero(maxNo, 4);
  }

  async delete(rowData: any) {
    try {
      await this.Goods.save({ ...rowData, deletedAt: new Date() });
    } catch (error) {
      this.error(error);
    }
  }
}
