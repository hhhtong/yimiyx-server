import { Repository, SelectQueryBuilder } from 'typeorm';
import BaseService from '../../core/base-service';
import User from '../../model/entity/client-user';
import Cart from '../../model/entity/client-cart';

interface IParams {
  openid: string,
  goodsId: number,
  quantity: number
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
      return await this.Cart.find({
        join: {
          alias: 'C',
          leftJoinAndSelect: {
            U: 'C.user',
            G: 'C.goods'
          }
        },
        where: `U.openid = ${openid}`,
        order: { 'createdAt': 'DESC' }
      });
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

  // - 新增一个商品到购物车
  async save(raw: IParams): Promise<void> {
    try {
      await this.Cart.save(raw);
    } catch (err) {
      this.error(err);
    }
  }

  // - 从购物车中删除一个商品
  async delete(openid: string, goodsId: number): Promise<Cart> {
    try {
      const raw = await this.Cart.findOne(goodsId);
      return await this.Cart.remove(raw);
    } catch (err) {
      this.error(err);
    }
  }
}