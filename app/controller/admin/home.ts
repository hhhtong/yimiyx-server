import BaseController from '../../core/base-controller';

export default class HomeController extends BaseController {

  async index (): Promise<void> {
    await this.ctx.render('index.html')
  }
}
