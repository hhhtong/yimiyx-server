import { Repository, SelectQueryBuilder } from 'typeorm'
import BaseService from '../../core/base-service'
import Goods from '../../model/entity/goods'
import GoodsTag from '../../model/entity/goods-tag'
import { GoodsQuery, GoodsResult } from '../../common/QueryInterface'

export default class GoodsService extends BaseService {

  // -------------------------------------------------------------------------
  // Public Properties
  // -------------------------------------------------------------------------

  // - 商品__实体
  readonly goods: Repository<Goods>
  // - 商品标签__实体
  readonly goodsTag: Repository<GoodsTag>

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------

  constructor(ctx) {
    super(ctx)
    this.goods = this.conn.getRepository(Goods)
    this.goodsTag = this.conn.getRepository(GoodsTag)
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
    goodsName = '' }: GoodsQuery): Promise<GoodsResult> {
    let query: SelectQueryBuilder<Goods> = this.goods
      .createQueryBuilder('G')
      .where('ISNULL(G.deletedAt)')
    let total: number = 0

    if (+goodsNo) {
      query = query.andWhere(`G.goodsNo LIKE '%' :goodsNo '%'`, { goodsNo })
    }
    if (goodsName !== '') {
      query = query.andWhere(`G.goodsName LIKE '%' :goodsName '%'`, { goodsName })
    }
    if (+isOnline === 1) {
      query = query.andWhere(`G.isOnline = :isOnline`, { isOnline })
    } else if (+isOnline === 0) {
      query = query.andWhere(`G.isOnline != 1`)
    }

    total = await query.getCount()

    if (!disabledPage) {
      query = query
        .skip((page - 1) * rows)
        .take(rows)
    }

    query = query
      .leftJoinAndSelect('G.categorys', 'GC')
      .leftJoinAndSelect('G.tags', 'T')
      .orderBy('G.updatedAt', 'DESC')

    return { list: await query.getMany(), total }
  }

  // - 查询单个商品信息
  async queryOne(goodsNo: string): Promise<Goods> {
    return await this.goods
      .createQueryBuilder('G')
      .where('G.goodsNo = :goodsNo', { goodsNo })
      .leftJoin('G.goodsDesc', 'GD')
      .leftJoin('GD.tags', 'T')
      .getOne() || this.goods.create()
  }

  // - 删除一个商品
  async deleteOne(rowData: Partial<Goods>): Promise<void> {
    try {
      await this.goods.save({ ...rowData, deletedAt: new Date() })
    } catch (err) {
      this.error(err)
    }
  }

  // - 根据id查找
  async findById(id: number): Promise<Goods> {
    return await this.goods.findOne(id) || this.goods.create()
  }

  // - 保存一个商品
  async saveOne(rowData: Partial<Goods>): Promise<void> {
    try {
      await this.goods.save(this.goods.create(rowData))
    } catch (err) {
      this.error(err)
    }
  }

  // - 创建新标签
  async createTags(id: number, tags: string[]): Promise<void> {
    let temp: GoodsTag[] = []
    try {
      // - 先删除该商品之前存在的标签
      await this.goodsTag.delete({ goods: { id } })
      for (const tagName of tags) {
        temp.push(this.goodsTag.create({ goods: { id }, tagName }))
      }
      // - 然后在保存新标签
      await this.goodsTag.save(temp)
    } catch (err) {
      this.error(err)
    }
  }

  // - 获得最大的商品编号
  async getMaxGoodsNo(goodsNoPrefix: string): Promise<string> {
    let maxNo: number = await this.goods
      .createQueryBuilder('G')
      .where(`G.goodsNo LIKE :goodsNoPrefix '%'`, { goodsNoPrefix })
      .getCount()
    return goodsNoPrefix + this.ctx.helper.prefixZero(++maxNo, 4)
  }
}
