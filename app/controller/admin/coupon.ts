import BaseController from '../../core/base-controller';
import { CouponQuery, CouponResult, CouponPartial } from '../../common/QueryInterface';

export default class CouponController extends BaseController {

  async getCouponList(): Promise<void> {
    const query: CouponQuery = this.ctx.query;
    try {
      let result: CouponResult = await this.service.admin.coupon.query(query);
      this.success(result);
    } catch (error) {
      this.fail(error);
    }
  }

  async saveCoupon(): Promise<void> {
    const couponData: CouponPartial = this.ctx.request.body;
    try {
      await this.service.admin.coupon.save(couponData);
      this.success();
    } catch (error) {
      this.fail(error);
    }
  }

  async deleteCoupon(): Promise<void> {
    const params: CouponPartial = this.ctx.request.body;
    try {
      await this.service.admin.coupon.remove(params.couponId);
      this.success();
    } catch (error) {
      this.fail(error);
    }
  }
}
