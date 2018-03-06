import BaseController from '../core/base-controller';

export default class GoodsCategoryController extends BaseController {

  async index() {
    const { service, ctx } = this;
    let { list, total, idMax } = await service.goodsCategory.query(ctx.query);
    const oneList = list.filter(item => item.type === 1);
    const twoList = list.filter(item => item.type === 2);
    const threeList = list.filter(item => item.type === 3);

    list = this.mixin(oneList, this.mixin(twoList, threeList));

    return this.success({ list, total, idMax });
  }

  async add() {
    const { service, ctx } = this;
    const rowData = { ...ctx.request.body, createdAt: new Date() };
    await service.goodsCategory.insert(rowData);
    this.success();
  }

  async delete() {
    const { service, ctx } = this;
    const rowData: any = ctx.request.body
    await service.goodsCategory.delete([rowData.id], { isDelete: 1 });
    this.success();
  }

  async update() {
    const { service, ctx } = this;
    const [treeData, deleteIds]: any = ctx.request.body
    const rowData: any = this.unmixin(treeData);

    if (deleteIds.length > 0) {
      await service.goodsCategory.delete(deleteIds, { isDelete: 1 });
    }
    await service.goodsCategory.update(rowData);
    this.success();
  }

  /**
   * 将平级结构转成树形结构
   */
  mixin(list1: Array<any>, list2: Array<any>): Array<object> {
    list2.forEach(item2 => {
      item2.expand = true
      item2.readonly = true
      list1.forEach(item1 => {
        if (item2.pid === item1.id) {
          item1.expand = true
          item1.readonly = true
          if (!item1.children) {
            item1.children = [item2];
          } else {
            item1.children = [item2, ...item1.children];
          }
        }
      });
    })

    return list1;
  }

  /**
   * 将树形结构转成平级结构
   */
  unmixin(list: any): Array<object> {
    const categoryList = [];
    const next = (item: any) => {
      if (item.name !== '') {
        categoryList.push(item);
      }
      if (item.children instanceof Array) {
        item.children.forEach(children => next(children));
      }
    };

    list.forEach(item => next(item));
    return categoryList;
  }
}
