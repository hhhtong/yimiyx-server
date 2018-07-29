import { Controller } from 'egg';

export default class HomeController extends Controller {

  // - 客户端渲染
  async index(): Promise<void> {
    await this.ctx.renderClient('app/app.js');
  }

  // - 服务端渲染
  async server(): Promise<void> {
    await this.ctx.render('app/app.js', { message: 'server render demo' });
  }
}