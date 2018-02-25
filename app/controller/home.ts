import { Controller } from 'egg';

export default class HomeController extends Controller {

  // const pageIndex = ctx.query.pageIndex;
  async index() {
    const { service, ctx } = this;
    await service.supplier.insert({ title: '@', text: '#' });
    await ctx.renderClient('app/app.js');
  }

  async server() {
    await this.ctx.render('app/app.js', { message: 'server render demo' });
  }
}