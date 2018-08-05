import { Repository } from 'typeorm'
import BaseService from '../../core/base-service'
import Goods from '../../model/entity/goods'

export default class OrderService extends BaseService {

  // -------------------------------------------------------------------------
  // Public Properties
  // -------------------------------------------------------------------------

  // - 商品__实体
  readonly goods: Repository<Goods>

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------

  constructor(ctx) {
    super(ctx)
    this.goods = this.conn.getRepository(Goods)
  }

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  // - 查询一个商品详细
  async queryOne(id: number) {
    try {
      const data: any = this.goods
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
        ])

      return data.getOne()
    } catch (error) {
      this.error(error)
    }
  }
}
