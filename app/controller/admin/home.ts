import { Controller } from 'egg';

export default class HomeController extends Controller {

  // - 客户端渲染
  async index(): Promise<void> {
    await this.ctx.render('index.html');
  }
}
