import { Controller } from 'egg';

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
  }

  fail(data = {}, code = 50001, msg = '操作失败') {
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
}