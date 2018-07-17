import BaseController from '../../core/base-controller';

export default class GoodsController extends BaseController {

  async index() {
    const { service } = this;
    try {
      let list = await service.client.goods.queryOnlineGoods();
      // for (const item of list) {
      //   const { unitPrice } = item.goodsDesc;
      //   item.smallImg = 'https://www.34580.com/static/img/vegetable.36ef04b.png'; // - mock
      //   item.specList = [{ spec: item.spec + item.specUnit, unitPrice }]; // - 暂时只有一种规格
      //   item.categoryName = item.categorys[0].name;
      //   for (const [key, value] of Object.entries(item.goodsDesc)) {
      //     item[key] = value;
      //   }
      //   this.$expel(item, ['categorys', 'specUnit', 'goodsDesc']);
      // }
      for (const item of list) {
        const { unitPrice } = item;
        const { spec, specUnit, categorys } = item.goods;
        item.smallImg = 'https://www.34580.com/static/img/vegetable.36ef04b.png'; // - mock
        item.specList = [{ spec: spec + specUnit, unitPrice }]; // - 暂时只有一种规格
        item.categoryName = categorys[0].name;
        for (const [key, value] of Object.entries(item.goods)) {
          item[key] = value;
        }
        this.$expel(item, ['unitPrice', 'spec', 'specUnit', 'goods']);
      }
      this.success(list);
    } catch (error) {
      this.fail(error);
    }
  }

  async goodsDetail() {

  }
}
