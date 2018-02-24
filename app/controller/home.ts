import { Controller } from 'egg';

export default class HomeController extends Controller {

  async index() {
    const { ctx } = this;
    const connection = await ctx.connectDB;

    console.log('@@@', connection);
    await ctx.renderClient('app/app.js');
  }

  async server() {
    const { ctx } = this;
    await ctx.render('app/app.js', { message: 'server render' });
  }

  // const pageIndex = ctx.query.pageIndex;
}