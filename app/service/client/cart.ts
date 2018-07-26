import { Repository, SelectQueryBuilder } from 'typeorm';
import BaseService from '../../core/base-service';
import User from '../../model/entity/user';
import Cart from '../../model/entity/cart';

interface IParams {
  openid: string,
  goodsId: number,
  goodsNum: number
}

export default class CartService extends BaseService {

  // -------------------------------------------------------------------------
  // Public Properties
  // -------------------------------------------------------------------------

  // - 用户
  readonly User: Repository<User>;
  // - 购物车
  readonly Cart: Repository<Cart>;

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------

  constructor(ctx) {
    super(ctx);
    this.User = this.conn.getRepository(User);
    this.Cart = this.conn.getRepository(Cart);
  }

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  // - 通过openid获得该用户下的所有购物车里的商品
  async findByOpenid(openid: string): Promise<Cart[]> {
    try {
      this.Cart.find
      const res: Cart[] = await this.Cart
        .createQueryBuilder('C')
        .leftJoin('C.user', 'U')
        .leftJoin('C.goods', 'G')
        .leftJoin('G.tags', 'T')
        .where('U.openid = :openid')
        .setParameters({ openid })
        .orderBy('C.createdAt', 'DESC')
        .select([
          'C.id',
          'C.num',
          'G.id',
          'G.activityType',
          'G.cover',
          'G.spec',
          'G.description',
          'G.goodsName',
          'G.resalePrice',
          'G.unitPrice',
          'T.tagName'
        ])
        .getMany();
      return res;
    } catch (err) {
      this.error(err);
    }
  }

  // - 通过商品ID获得某个商品在购物车中的记录
  async findByGoodsId(openid: string, goodsId: number): Promise<Cart> {
    try {
      const res: Cart = await this.Cart
        .createQueryBuilder('C')
        .leftJoin('C.user', 'U')
        .leftJoin('C.goods', 'G')
        .where('U.openid = :openid AND G.id = :goodsId')
        .setParameters({ openid, goodsId })
        .getOne();
      return res || await this.Cart.create({});
    } catch (err) {
      this.error(err);
    }
  }

  // - 新增或者更新一个商品到数据库
  async save(raw: IParams): Promise<void> {
    try {
      await this.Cart.save(raw);
    } catch (err) {
      this.error(err);
    }
  }

  // - 从购物车记录中删除一条数据
  async delete(openid: string, goodsId: number): Promise<Cart> {
    try {
      const raw = await this.Cart.findOne(goodsId);
      return await this.Cart.remove(raw);
    } catch (err) {
      this.error(err);
    }
  }
}