import { Repository } from 'typeorm';
import BaseService from '../core/base-service';
import Goods from '../model/entity/goods';

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

  // - 商品__实体
  readonly Goods: Repository<Goods>;

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

  // - 获得所有的商品
  async queryAll({ page = 1, rows = 20, disabledPage = false, isOnline, goodsNo, goodsName }: query) {
    const where1 = +goodsNo ? `G.goodsNo LIKE '%${goodsNo}%'` : '1 = 1';
    const where2 = goodsName ? `G.goodsName LIKE '%${goodsName}%'` : '1 = 1';
    const where3 = +isOnline === 1
      ? `G.isOnline = ${isOnline}`
      : +isOnline === 0
        ? 'G.isOnline != 1'
        : '1 = 1';

    try {
      const query = this.Goods
        .createQueryBuilder('G')
        .where('ISNULL(G.deletedAt)')
        .andWhere(`${where1} AND ${where2} AND ${where3}`);
      let list: any = await query.orderBy('G.createdAt', 'DESC');
      let total: number = await query.getCount();

      if (disabledPage) {
        list = await list
          .leftJoinAndSelect('G.categorys', 'categorys')
          .getMany();
      } else {
        list = await list
          .skip((page - 1) * rows)
          .take(rows)
          .leftJoinAndSelect('G.categorys', 'categorys')
          .getMany();
      }

      return { list, total };
    } catch (error) {
      this.error(error);
    }
  }

  // - 获得商品详情
  async queryDesc(goodsNo: string) {
    try {
      const query = this.Goods
        .createQueryBuilder('G')
        .where('G.goodsNo = :goodsNo', { goodsNo })
        .leftJoin('G.goodsDesc', 'GD')
        .leftJoin('GD.tags', 'T')
      return query.getOne();
    } catch (error) {
      this.error(error);
    }
  }

  // - 保存一个商品
  async saveOne(rowData: any) {
    try {
      await this.Goods.save(this.Goods.create(rowData));
    } catch (error) {
      this.error(error);
    }
  }

  // - 获得最大的商品编号
  async getMaxGoodsNo(goodsNoPrefix: string) {
    const maxNo: number = await this.Goods.createQueryBuilder('G').where(`G.goodsNo LIKE '${goodsNoPrefix}%'`).getCount() + 1;
    return goodsNoPrefix + this.ctx.helper.prefixZero(maxNo, 4);
  }

  // - 删除一个商品
  async deleteOne(rowData: any) {
    try {
      await this.Goods.save({ ...rowData, deletedAt: new Date() });
    } catch (error) {
      this.error(error);
    }
  }
}
