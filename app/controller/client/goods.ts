import BaseController from '../../core/base-controller';

export default class GoodsController extends BaseController {

  async index() {
    const { service } = this;
    try {
      let list = await service.client.goods.queryOnlineGoods();
      for (const item of list) {
        const { spec, unitPrice, categorys } = item;
        item.smallImg = 'https://www.34580.com/static/img/vegetable.36ef04b.png'; // - mock
        item.specList = [{ spec, unitPrice }]; // - 暂时只有一种规格
        item.categoryName = categorys[0].name;
        this.$expel(item, ['spec', 'unitPrice', 'categorys']);
      }
      this.success(list);
    } catch (error) {
      this.fail(error);
    }
  }

  async goodsDetail() {

  }
}
