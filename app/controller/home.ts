import { Controller } from 'egg';

export default class HomeController extends Controller {

  async index() {
    const { service, ctx } = this;
    await ctx.renderClient('app/app.js');
  }

  async server() {
    await this.ctx.render('app/app.js', { message: 'server render demo' });
  }
}