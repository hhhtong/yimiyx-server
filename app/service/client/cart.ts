import { Repository } from 'typeorm'
import BaseService from '../../core/base-service'
import User from '../../model/entity/user'
import Cart from '../../model/entity/cart'

export default class CartService extends BaseService {

  // -------------------------------------------------------------------------
  // Public Properties
  // -------------------------------------------------------------------------

  // - 用户
  readonly user: Repository<User>
  // - 购物车
  readonly cart: Repository<Cart>

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------

  constructor(ctx) {
    super(ctx)
    this.user = this.conn.getRepository(User)
    this.cart = this.conn.getRepository(Cart)
  }

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  // - 通过openid获得该用户下的所有购物车里的商品
  async findByOpenid(openid: string): Promise<Cart[]> {
    const res = await this.cart
      .createQueryBuilder('C')
      .leftJoin('C.user', 'U')
      .leftJoin('C.goods', 'G')
      .leftJoin('G.tags', 'T')
      .where('U.openid = :openid')
      .setParameters({ openid })
      .orderBy('C.createdAt', 'DESC')
      .select([
        'C.id',
        'C.goodsNum',
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
      .getMany()
    return res
  }

  // - 通过商品ID获得某个商品在购物车中的记录
  async findByGoodsId(openid: string, goodsId: number): Promise<Cart | undefined> {
    try {
      const res = await this.cart
        .createQueryBuilder('C')
        .leftJoin('C.user', 'U')
        .leftJoin('C.goods', 'G')
        .where('U.openid = :openid AND G.id = :goodsId')
        .setParameters({ openid, goodsId })
        .getOne()
      return res || this.cart.create({})
    } catch (err) {
      this.error(err)
    }
  }

  // - 新增或者更新一个商品
  async save(raw: Cart): Promise<void> {
    try {
      await this.cart.save(raw)
    } catch (err) {
      this.error(err)
    }
  }

  // - 从购物车记录中删除一条数据
  async delete(goodsId: number): Promise<Cart | undefined> {
    try {
      const raw = await this.cart.findOne(goodsId)
      if (raw) {
        return await this.cart.remove(raw)
      }
    } catch (err) {
      this.error(err)
    }
  }
}
