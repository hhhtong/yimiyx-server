import { Repository } from 'typeorm';
import BaseService from '../../core/base-service';
import User from '../../model/entity/user';
import Coupon from '../../model/entity/coupon';

export default class CouponService extends BaseService {

  // -------------------------------------------------------------------------
  // Public Properties
  // -------------------------------------------------------------------------

  // - 用户
  readonly User: Repository<User>;
  // - 优惠券
  readonly Coupon: Repository<Coupon>;

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------

  constructor(ctx) {
    super(ctx);
    this.User = this.conn.getRepository(User);
    this.Coupon = this.conn.getRepository(Coupon);
  }

  // -------------------------------------------------------------------------
  // Getter Field
  // -------------------------------------------------------------------------

  get selectField() {
    return [
      'C.couponId',
      'C.couponName',
      'C.couponType',
      'C.couponMoney',
      'C.spendMoney',
      'C.couponDes',
      'C.dataFlag',
      'C.validStartTime',
      'C.validEndTime'
    ]
  }

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  // - 通过openid获得该用户下的所有优惠券
  async findByOpenid(openid: string): Promise<Coupon[] | undefined> {
    try {
      return await this.Coupon
        .createQueryBuilder('C')
        .leftJoin('C.user', 'U')
        .where('U.openid = :openid')
        .setParameters({ openid })
        .orderBy('C.dataFlag', 'DESC')
        .select(this.selectField)
        .getMany();
    } catch (err) {
      this.error(err);
    }
  }

  // - 查询指定id的优惠券
  async findByCouponId(couponId: Coupon['couponId']): Promise<Coupon | undefined> {
    try {
      return await this.Coupon
        .createQueryBuilder('C')
        .where('C.couponId = :couponId')
        .setParameters({ couponId })
        .select(this.selectField)
        .getOne();
    } catch (err) {
      this.error(err);
    }
  }
}