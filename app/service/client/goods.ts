import { Repository } from 'typeorm';
import BaseService from '../../core/base-service';
import Goods from '../../model/entity/goods';
import GoodsDesc from '../../model/entity/goods-desc';

export default class GoodsService extends BaseService {

  // -------------------------------------------------------------------------
  // Public Properties
  // -------------------------------------------------------------------------

  // - 商品__实体
  readonly Goods: Repository<Goods>;
  readonly GoodsDesc: Repository<GoodsDesc>;

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------

  constructor(ctx) {
    super(ctx);
    this.Goods = this.conn.getRepository(Goods);
    this.GoodsDesc = this.conn.getRepository(GoodsDesc);
  }

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  // - 获得指定类目下的在售商品
  // async queryAssignOnlineGoods() { }

  // - 获得所有在售商品的类目
  // async queryOnlineGoodsCategorys() { }

  // - 获得所有的在售商品
  async queryOnlineGoods() {
    try {
      const list: any = this.GoodsDesc
        .createQueryBuilder('GD')
        .where('ISNULL(G.deletedAt)')
        .andWhere('G.isOnline = 1')
        .andWhere('GC.type = 3')
        .leftJoin('GD.goods', 'G')
        .leftJoin('G.categorys', 'GC')
        .leftJoin('GD.tags', 'T')
        .select([
          'G.id',
          'G.barCode',
          'G.goodsName',
          'G.goodsAlias',
          'G.madeIn',
          'G.spec',
          'G.specUnit',
          'G.specNum',
          'GC.name',
          'GD.description',
          'GD.unitPrice',
          'GD.resalePrice',
          'GD.goodsAmount',
          'T.tagName'
        ])
        .orderBy('G.updatedAt', 'DESC');

      return list.getMany();
    } catch (error) {
      this.error(error);
    }
  }
}
