import { Repository } from 'typeorm';
import BaseService from '../../core/base-service';
import Coupon from '../../model/entity/coupon';
import { CouponQuery, CouponResult } from '../../common/QueryInterface';

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
    couponType = 0,
    couponName = '',
    couponMoney1,
    couponMoney2 }: CouponQuery): Promise<CouponResult> {
    let query = this.Coupon.createQueryBuilder('C');

    if (couponMoney1 && couponMoney2) {
      query = query.where(`C.couponMoney BETWEEN :couponMoney1 AND :couponMoney2`, { couponMoney1, couponMoney2 })
    }
    if (couponType > 0) {
      query = query.andWhere(`C.couponType = :couponType`, { couponType});
    }
    if (couponName !== '') {
      query = query.andWhere(`C.couponName LIKE '%' :couponName '%'`, { couponName});
    }

    const [list, total] = await query
      .orderBy('C.updatedAt', 'DESC')
      .skip((page - 1) * rows)
      .take(rows)
      .getManyAndCount();

    return { list, total };
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
  async saveById(couponId: number, data: Partial<Coupon>): Promise<Coupon | undefined> {
    try {
      let raw = await this.Coupon.findOne(couponId);
      if (raw) {
        raw = { ...raw, ...data }
        return await this.Coupon.save(raw);
      }
    } catch (err) {
      this.error(err);
    }
  }

  // - 删除某个优惠券
  async remove(couponId: number): Promise<Coupon | undefined> {
    try {
      const raw = await this.Coupon.findOne(couponId);
      if (raw) {
        return await this.Coupon.remove(raw);
      }
    } catch (err) {
      this.error(err);
    }
  }
}