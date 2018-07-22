import { Repository } from 'typeorm';
import BaseService from '../../core/base-service';
import Goods from '../../model/entity/goods';

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

  // - 获得指定类目下的在售商品
  // async queryAssignOnlineGoods() { }

  // - 获得所有在售商品的类目
  // async queryOnlineGoodsCategorys() { }

  // - 获得所有的在售商品
  async queryOnline() {
    try {
      const list: any = this.Goods
        .createQueryBuilder('G')
        .where('ISNULL(G.deletedAt)')
        .andWhere('G.isOnline = 1')
        .andWhere('GC.type = 3')
        .leftJoin('G.categorys', 'GC')
        .leftJoin('G.tags', 'T')
        .select([
          'G.id',
          'G.barCode',
          'G.goodsName',
          'G.goodsAlias',
          'G.madeIn',
          'G.spec',
          'G.specNum',
          'G.cover',
          'G.description',
          'G.resalePrice',
          'G.unitPrice',
          'G.goodsAmount',
          'GC.name',
          'T.tagName'
        ])
        .orderBy('G.updatedAt', 'DESC');

      return list.getMany();
    } catch (error) {
      this.error(error);
    }
  }

  // - 查询一个商品详细
  async queryOne(id: number) {
    try {
      const data: any = await this.Goods
        .createQueryBuilder('G')
        .where('G.id = :id', { id })
        .leftJoin('G.tags', 'T')
        .select([
          'G.id',
          'G.goodsName',
          'G.goodsAlias',
          'G.madeIn',
          'G.spec',
          'G.specNum',
          'G.carousels',
          'G.description',
          'G.resalePrice',
          'G.unitPrice',
          'G.goodsAmount',
          'T.tagName'
        ]);

      return data.getOne();
    } catch (error) {
      this.error(error);
    }
  }
}
