import { Repository } from 'typeorm';
import BaseService from '../../core/base-service';
import Goods from '../../model/entity/goods';

export default class GoodsService extends BaseService {

  // -------------------------------------------------------------------------
  // Public Properties
  // -------------------------------------------------------------------------

  //- 商品__实体
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

  async query(goodsName: string) {
    const where = goodsName ? `g.goodsName LIKE '%${goodsName}%'` : '1 = 1';

    try {
      const query = this.Goods
        .createQueryBuilder('g')
        .where('ISNULL(g.deletedAt)')
        .andWhere(where);
      let list: any = await query.orderBy('g.createdAt', 'DESC');
      let total: number = await query.getCount();

      list = await list
        .leftJoinAndSelect('g.categorys', 'categorys')
        .getMany();

      return { list, total };
    } catch (error) {
      this.error(error);
    }
  }
}
