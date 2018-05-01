import { Controller } from 'egg';
/**
 * 业务码说明
 * 50000 操作成功
 * 50001 操作失败
 * 50002 数据库相关操作失败
 * 50003 待定
 * 50004 待定
 * 50005 待定
 * ...
 */
export default class BaseController extends Controller {
  get user() {
    return this.ctx.session.user;
  }

  success(data = {}, msg = '操作成功') {
    this.ctx.body = {
      code: 50000,
      data,
      msg
    };
    return data;
  }

  fail(data: any = {}, code = 50001, msg = '操作失败') {
    if (typeof data.sqlMessage === 'string') {
      code = 50002
      msg = data.sqlMessage
    } else {
      msg = data.toString()
    }

    this.ctx.body = {
      code,
      data,
      msg
    };
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }


  /**
   * 数据重排变成嵌套
   */
  $refix(list: Array<object>) {
    const oneList = list.filter(item => item.type === 1);
    const twoList = list.filter(item => item.type === 2);
    const threeList = list.filter(item => item.type === 3);
    return this.$mixin(oneList.reverse(), this.$mixin(twoList, threeList));
  }

  /**
   * 将平级结构转成树形结构
   */
  $mixin(list1: Array<any>, list2: Array<any>): Array<object> {
    if (list2.length <= 0) {
      list2 = list1
    }

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
  $unmixin(list: any): Array<object> {
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