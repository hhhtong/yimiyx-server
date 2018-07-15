import BaseController from '../core/base-controller';
import * as sendToWormhole from 'stream-wormhole';
import { write as awaitWriteStream } from 'await-stream-ready';
import * as path from 'path';
import * as fs from 'fs-extra';

export default class GoodsController extends BaseController {
  // - 获得商品列表
  async index() {
    const { service, ctx } = this;
    try {
      let { list, total } = await service.goods.query(ctx.query);

      for (const item of list) {
        item.categorys = this.$refix(item.categorys);
      }
      this.success({ list, total });
    } catch (error) {
      this.fail(error);
    }
  }

  // - 保存商品
  async save() {
    const { service, ctx } = this;
    const rowData = ctx.request.body;

    if (!rowData.goodsNo) { // 无goodsNo参数时 表示新增
      // 以数组中的第一个类目作为序号前缀
      rowData.goodsNo = await this.service.goods.getMaxGoodsNo(rowData.categorys[0].no);
    }
    // 获取Goods表中的categorys[]
    let categorys = [];
    for (const item of rowData.categorys) {
      categorys = [...categorys, ...item.ids.map(id => ({ id }))];
    }

    rowData.categorys = categorys;
    try {
      await service.goods.save(rowData);
      this.success();
    } catch (error) {
      this.fail(error);
    }
  }

  // - 删除商品
  async delete() {
    const { service, ctx } = this;
    const rowData: any = ctx.request.body;
    try {
      await service.goods.delete(rowData);
      this.success();
    } catch (error) {
      this.fail(error);
    }
  }

  // - 保存上传的图片
  async uploadImg() {

    const { ctx } = this;
    const stream = await ctx.getFileStream();
    const filename = encodeURIComponent(stream.fields.name) + path.extname(stream.filename).toLowerCase();
    const today = ctx.helper.moment().format('YYYY/MM/DD');
    // - 存储路径按日期归类：public/goods/2018/06/06/0523133306_01.png
    const dir = path.join(this.config.baseDir, 'app/public/goods', today);

    await fs.ensureDir(dir); // - 确保该目录存在，否则创建一个

    const writeStream = fs.createWriteStream(path.join(dir, filename));
    try {
      await awaitWriteStream(stream.pipe(writeStream));
      this.success({ url: '/public/' + filename });
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }
  }

  // - 保存商品详细, 通常用于第一次上架该商品
  async saveDesc() {

  }

  // - 切换商品状态(1：在售 OR 0：下架)
  async toggleStatus() {

  }
}
