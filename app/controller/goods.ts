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
      let { list, total } = await service.goods.queryAll(ctx.query);
      for (const item of list) {
        item.categorys = this.$refix(item.categorys);
      }
      this.success({ list, total });
    } catch (err) {
      throw err;
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
      await service.goods.saveOne(rowData);
      this.success();
    } catch (err) {
      throw err;
    }
  }

  // - 删除商品
  async delete() {
    const { service, ctx } = this;
    const rowData: any = ctx.request.body;
    try {
      await service.goods.deleteOne(rowData);
      this.success();
    } catch (err) {
      throw err;
    }
  }

  // - 获取商品详情
  async desc() {
    const { goodsNo } = this.ctx.query;
    try {
      const data = await this.service.goods.queryDesc(goodsNo);
      this.success(data);
    } catch (err) {
      throw err;
    }
  }

  // - 保存上传的图片
  async uploadImg() {
    const { ctx } = this;
    const { baseDir } = this.config;
    const stream = await ctx.getFileStream();
    const filename = encodeURIComponent(stream.fields.name) + path.extname(stream.filename).toLowerCase();
    const today = ctx.helper.moment().format('YYYY_MM_DD');
    // - 存储路径按日期归类：public/upload/goods/2018_06_06/0523133306_01.png
    const dir = path.join(baseDir, 'public/upload/goods', today);

    await fs.ensureDir(dir); // - 确保该目录存在，否则创建一个
    const target = path.join(dir, filename);
    const writeStream = fs.createWriteStream(target);
    try {
      await awaitWriteStream(stream.pipe(writeStream));
      this.success({ url: target.replace(baseDir, ''), filename });
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }
  }

  // - 保存商品详细, 通常用于第一次上架该商品
  async saveDesc() {
    const { id } = this.ctx.query;
    const params = this.ctx.request.body;
    try {
      const result = await this.service.goods.saveOneDesc(id, params);
      this.success(result);
    } catch (err) {
      throw err;
    }
  }

  // - 切换商品状态(1：在售 OR 0：下架)
  async toggleStatus() {
    let { id, isOnline } = this.ctx.request.body;
    isOnline = isOnline === 1 ? 0 : 1;
    try {
      const rowData = await this.service.goods.findById(id);
      rowData.isOnline = isOnline;
      await this.service.goods.saveOne(rowData);
      this.success(isOnline)
    } catch (err) {
      throw err;
    }
  }
}
