import { Repository } from 'typeorm';
import BaseService from '../../core/base-service';
import Goods from '../../model/entity/goods';
import GoodsTag from '../../model/entity/goods-tag';

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
  // - 商品标签__实体
  readonly GoodsTag: Repository<GoodsTag>;

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------

  constructor(ctx) {
    super(ctx);
    this.Goods = this.conn.getRepository(Goods);
    this.GoodsTag = this.conn.getRepository(GoodsTag);
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
        .andWhere(where1)
        .andWhere(where2)
        .andWhere(where3);
      let list: any = await query.orderBy('G.updatedAt', 'DESC');

      if (!disabledPage) {
        list = await list
          .skip((page - 1) * rows)
          .take(rows)
      }

      list = await list
        .leftJoinAndSelect('G.categorys', 'GC')
        .leftJoinAndSelect('G.tags', 'T')
        .getMany();
      return { list, total: await query.getCount() };
    } catch (err) {
      this.error(err);
    }
  }

  // - 查询单个商品信息
  async queryOne(goodsNo: string) {
    try {
      const query = this.Goods
        .createQueryBuilder('G')
        .where('G.goodsNo = :goodsNo', { goodsNo })
        .leftJoin('G.goodsDesc', 'GD')
        .leftJoin('GD.tags', 'T')
      return query.getOne();
    } catch (err) {
      this.error(err);
    }
  }

  // - 删除一个商品
  async deleteOne(rowData: any) {
    try {
      await this.Goods.save({ ...rowData, deletedAt: new Date() });
    } catch (err) {
      this.error(err);
    }
  }

  // - 根据id查找
  async findById(id: number) {
    try {
      return await this.Goods.findOne(id);
    } catch (err) {
      this.error(err);
    }
  }

  // - 保存一个商品
  async saveOne(rowData: any) {
    try {
      await this.Goods.save(this.Goods.create(rowData));
    } catch (err) {
      this.error(err);
    }
  }

  // - 创建新标签
  async createTags(id: number, tags: string[]) {
    let temp = [];
    try {
      // - 先删除该商品之前存在的标签
      await this.GoodsTag.delete({ goods: { id } })
      for (const tagName of tags) {
        temp.push(this.GoodsTag.create({ goods: { id }, tagName }));
      }
      // - 然后在保存新标签
      this.GoodsTag.save(temp);
    } catch (err) {
      this.error(err);
    }
  }

  // - 获得最大的商品编号
  async getMaxGoodsNo(goodsNoPrefix: string) {
    const maxNo: number = await this.Goods.createQueryBuilder('G').where(`G.goodsNo LIKE '${goodsNoPrefix}%'`).getCount() + 1;
    return goodsNoPrefix + this.ctx.helper.prefixZero(maxNo, 4);
  }
}
