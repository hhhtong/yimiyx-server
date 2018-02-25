import { Controller } from 'egg';
import { Supplier } from "../entity/supplier";

export default class HomeController extends Controller {

  async index() {
    const { ctx } = this;
    const connection = await ctx.connectDB();
    const supplier: any = new Supplier();
    supplier.title = "@";
    supplier.text = "#";
    await connection.manager.save(supplier);
    console.log('插入数据成功：', supplier);
    await ctx.renderClient('app/app.js');
  }

  async server() {
    const { ctx } = this;
    await ctx.render('app/app.js', { message: 'server render' });
  }
  // const pageIndex = ctx.query.pageIndex;
}