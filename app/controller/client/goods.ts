import BaseController from '../../core/base-controller';

export default class GoodsController extends BaseController {

  async index() {
    const { service } = this;
    try {
      let list = await service.client.goods.queryOnline();
      for (const item of list) this.__dispose(item);
      this.success(list);
    } catch (err) {
      this.fail(err);
    }
  }

  async detail() {
    const { id } = this.ctx.query;
    try {
      const rowData = await this.service.client.goods.queryOne(id);
      this.__dispose(rowData);
      for (const item of rowData.specList) {
        item.packagingMethod = 'XXX食品级包装';
        item.guaranteePeriod = '3天';
        item.storageMethod = '-15°阴冷环境密存';
      }
      this.success(rowData);
    } catch (err) {
      this.fail(err);
    }
  }

  __dispose(item: any) {
    const { spec, unitPrice, categorys } = item;
    item.mainImg = 'https://www.34580.com/static/img/vegetable.36ef04b.png'; // - mock
    item.imgs = item.imgs ? JSON.parse(item.imgs) : [];
    item.specList = [{ spec, unitPrice }]; // - 暂时只有一种规格
    if (categorys) {
      item.categoryName = categorys[0].name;
    }
    item.tagName = item.tags.map(({ tagName }) => tagName)[0] || '限时特价';
    this.$expel(item, ['spec', 'unitPrice', 'categorys', 'tags']);
  }
}
