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
      const raw = await service.client.cart.findByGoodsId(openid, id);
      if (raw.id) {
        // - 商品存在于数据库中，直接对数量+1
        raw.quantity++;
      } else {
        // - 找到user_id,不等同于openid
        const userData = await service.client.user.findByOpenid(openid);
        // - 表中不存在数据，表示第一次新增，对商品数量赋值1
        raw.quantity = 1;
        raw.user = { id: userData.id };
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
    const { ctx, service } = this;
    const { skey, id } = ctx.request.body;
    try {
      const { openid } = await this.$skey2openid(skey);
      const raw = await service.client.cart.findByGoodsId(openid, id);
      if (--raw.quantity <= 0) {
        // - 购物车中该商品的数量减去本次 <=0 直接从数据库中删除该记录
        await service.client.cart.delete(openid, id);
      } else {
        // - 减完之后数量 >0 更新该条记录
        await service.client.cart.save(raw);
      }
      this.success();
    } catch (err) {
      this.fail(err);
    }
  }
}