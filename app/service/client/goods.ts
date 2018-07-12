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

  async query({ page = 1, rows = 20 }) {

    try {
      let list: any = this.Goods
        .createQueryBuilder('g')
        .where('ISNULL(g.deletedAt)')
        .skip((page - 1) * rows)
        .take(rows)
        .orderBy('g.createdAt', 'DESC');

      list = await list
        .leftJoinAndSelect('g.categorys', 'categorys')
        .getMany();

      return { list };
    } catch (error) {
      this.error(error);
    }
  }
}
