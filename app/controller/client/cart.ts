import BaseController from '../../core/base-controller';
import BaseWxController from '../../core/base-wx-controller';

export default class CartController extends BaseWxController {

  // - 获取购物车列表
  async getCart(): Promise<void> {
    const { skey } = this.ctx.query;
    try {
      const { openid } = await this.$skey2openid(skey);
      const result = await this.service.client.cart.findByOpenid(openid);
      this.success(result);
    } catch (err) {
      this.fail(err);
    }
  }

  // - 增加购物车
  async addCart(): Promise<void> {
    const { ctx, service } = this;
    const { skey, id } = ctx.request.body;
    try {
      const { openid } = await this.$skey2openid(skey);
      let raw = await service.client.cart.findByGoodsId(openid, id);
      if (raw.id) {
        // - 表中存在数据，直接对数量加1
        raw.quantity++;
      } else {
        // - 表中不存在数据，表示第一次新增，赋值1
        raw.quantity = 1;
        raw.user = { id: 1 };
        raw.goods = { id };
      }
      await service.client.cart.save(raw);
      this.success();
    } catch (err) {
      this.fail(err);
    }
  }

  // - 删除购物车
  async removeCart(): Promise<void> {

  }
}