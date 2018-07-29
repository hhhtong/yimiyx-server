import { Repository } from 'typeorm';
import BaseService from '../../core/base-service';
import Coupon from '../../model/entity/coupon';
import { CouponQuery, CouponResult } from '../../common/query-interface';

export default class CouponService extends BaseService {

  // -------------------------------------------------------------------------
  // Public Properties
  // -------------------------------------------------------------------------

  // - 优惠券
  readonly Coupon: Repository<Coupon>;

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------

  constructor(ctx) {
    super(ctx);
    this.Coupon = this.conn.getRepository(Coupon);
  }

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  async query({
    page = 1,
    rows = 20,
    couponMoney1,
    couponMoney2 }: CouponQuery): Promise<CouponResult> {
    let where: string;
    if (couponMoney1 && couponMoney2) {
      where += `C.couponMoney BETWEEN :couponMoney1 AND :couponMoney2`;
    } else {
      where = '1 = 1';
    }

    try {
      const [list, total] = await this.Coupon
        .createQueryBuilder('C')
        .andWhere(where)
        .setParameters({ couponMoney1, couponMoney2 })
        .orderBy('C.updatedAt', 'DESC')
        .skip((page - 1) * rows)
        .take(rows)
        .getManyAndCount();

      return { list, total };
    } catch (err) {
      this.error(err);
    }
  }

  // - 新增一种优惠券
  async save(raw: Partial<Coupon>): Promise<void> {
    try {
      raw = this.Coupon.create(raw);
      await this.Coupon.save(raw);
    } catch (err) {
      this.error(err);
    }
  }

  // - 更新某个优惠券
  async saveById(couponId: number, data: Partial<Coupon>): Promise<Coupon> {
    try {
      let raw: Coupon = await this.Coupon.findOne(couponId);
      raw = { ...raw, ...data }
      return await this.Coupon.save(raw);
    } catch (err) {
      this.error(err);
    }
  }

  // - 删除某个优惠券
  async remove(couponId: number): Promise<Coupon> {
    try {
      const raw = await this.Coupon.findOne(couponId);
      return await this.Coupon.remove(raw);
    } catch (err) {
      this.error(err);
    }
  }
}