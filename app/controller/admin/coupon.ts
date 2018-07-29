import BaseController from '../../core/base-controller';
import { CouponQuery, CouponResult, CouponLiteral } from '../../common/query-interface';

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
    const couponData: CouponLiteral = this.ctx.request.body;
    try {
      await this.service.admin.coupon.save(couponData);
      this.success();
    } catch (error) {
      this.fail(error);
    }
  }

  async deleteCoupon(): Promise<void> {
    const { service, ctx } = this;
    const params: CouponLiteral = ctx.request.body;
    try {
      // await service.admin.coupon.delete([params.id]);
      this.success();
    } catch (error) {
      this.fail(error);
    }
  }
}
