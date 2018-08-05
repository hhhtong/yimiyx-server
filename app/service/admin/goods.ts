import { Repository, SelectQueryBuilder } from 'typeorm';
import BaseService from '../../core/base-service';
import Goods from '../../model/entity/goods';
import GoodsTag from '../../model/entity/goods-tag';
import { GoodsQuery, GoodsResult } from '../../common/QueryInterface';

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
  async queryAll({
    page = 1,
    rows = 20,
    disabledPage = false,
    isOnline = 'all',
    goodsNo = '',
    goodsName }: GoodsQuery): Promise<GoodsResult> {
    const where1: string = +goodsNo ? `G.goodsNo LIKE '%${goodsNo}%'` : '1 = 1';
    const where2: string = goodsName ? `G.goodsName LIKE '%${goodsName}%'` : '1 = 1';
    const where3: string = +isOnline === 1
      ? `G.isOnline = ${isOnline}`
      : +isOnline === 0
        ? 'G.isOnline != 1'
        : '1 = 1';

    let query: SelectQueryBuilder<Goods> = this.Goods
      .createQueryBuilder('G')
      .where('ISNULL(G.deletedAt)')
      .andWhere(where1)
      .andWhere(where2)
      .andWhere(where3)
      .orderBy('G.updatedAt', 'DESC');
    const total: number = await query.getCount();

    if (!disabledPage) {
      query = query
        .skip((page - 1) * rows)
        .take(rows);
    }

    const list: Goods[] = await query
      .leftJoinAndSelect('G.categorys', 'GC')
      .leftJoinAndSelect('G.tags', 'T')
      .getMany();
    return { list, total };
  }

  // - 查询单个商品信息
  async queryOne(goodsNo: string): Promise<Goods> {
    return await this.Goods
      .createQueryBuilder('G')
      .where('G.goodsNo = :goodsNo', { goodsNo })
      .leftJoin('G.goodsDesc', 'GD')
      .leftJoin('GD.tags', 'T')
      .getOne() || this.Goods.create();
  }

  // - 删除一个商品
  async deleteOne(rowData: Partial<Goods>): Promise<void> {
    try {
      await this.Goods.save({ ...rowData, deletedAt: new Date() });
    } catch (err) {
      this.error(err);
    }
  }

  // - 根据id查找
  async findById(id: number): Promise<Goods> {
    return await this.Goods.findOne(id) || this.Goods.create();
  }

  // - 保存一个商品
  async saveOne(rowData: Partial<Goods>): Promise<void> {
    try {
      await this.Goods.save(this.Goods.create(rowData));
    } catch (err) {
      this.error(err);
    }
  }

  // - 创建新标签
  async createTags(id: number, tags: string[]): Promise<void> {
    let temp: GoodsTag[] = [];
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
  async getMaxGoodsNo(goodsNoPrefix: string): Promise<string> {
    let maxNo: number = await this.Goods
      .createQueryBuilder('G')
      .where(`G.goodsNo LIKE :goodsNoPrefix '%'`, { goodsNoPrefix })
      .getCount();
    return goodsNoPrefix + this.ctx.helper.prefixZero(++maxNo, 4);
  }
}
