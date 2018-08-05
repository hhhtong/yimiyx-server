import BaseController from '../../core/base-controller'
import * as sendToWormhole from 'stream-wormhole'
import { write as awaitWriteStream } from 'await-stream-ready'
import * as path from 'path'
import * as fs from 'fs-extra'
import { GoodsPartial, GoodsQuery } from '../../common/QueryInterface'

export default class GoodsController extends BaseController {
  // - 获得商品列表
  async index(): Promise<void> {
    const query: GoodsQuery = this.ctx.query
    let { list, total }: any = await this.service.admin.goods.queryAll(query)
    for (const item of list) {
      // item.categorys = this.$refix(item.categorys);
      item.categoryIds = item.categorys.map(({ id }) => id)
      item.tags = item.tags.map(({ tagName }) => tagName)
      this.$sqlDateFormat(item, ['createdAt', 'updatedAt'])
    }
    this.success({ list, total })
  }

  // - 获取单个商品信息
  async one(): Promise<void> {
    const { goodsNo } = this.ctx.query
    try {
      let data = await this.service.admin.goods.queryOne(goodsNo)
      this.success(data)
    } catch (err) {
      throw err
    }
  }

  // - 保存商品
  async save(): Promise<void> {
    const { service, ctx } = this
    const raw: GoodsPartial = ctx.request.body

    if (raw.categorys) {
      if (!raw.goodsNo) { // 无goodsNo参数时 表示新增
        // 以数组中的第一个类目作为序号前缀
        raw.goodsNo = await service.admin.goods.getMaxGoodsNo(raw.categorys[0].no)
      }
      // 获取Goods表中的categorys[]
      let categorys: any[] = []
      for (const item of raw.categorys) {
        categorys = [...categorys, ...(item as any).ids.map(id => ({ id }))]
      }

      raw.categorys = categorys
    }

    try {
      await service.admin.goods.saveOne(raw)
      this.success()
    } catch (err) {
      throw err
    }
  }

  // - 删除商品
  async delete(): Promise<void> {
    const { service, ctx } = this
    const raw: GoodsPartial = ctx.request.body
    try {
      await service.admin.goods.deleteOne(raw)
      this.success()
    } catch (err) {
      throw err
    }
  }

  // - 保存上传的图片
  async uploadImg(): Promise<void> {
    const { ctx } = this
    const { baseDir } = this.config
    const stream = await ctx.getFileStream()
    const filename: string = ctx.helper.uuid(15, 36) + path.extname(stream.filename).toLowerCase()
    // - 存储路径按商品编码归类：public/upload/goods/0523133306/3HYHHSWYEH8X7AY.png
    const dir: string = path.join(baseDir, 'public/upload/goods', stream.fields.goodsNo)

    await fs.ensureDir(dir) // - 确保该目录存在，否则创建一个
    const target: string = path.join(dir, filename)
    const writeStream = fs.createWriteStream(target)
    try {
      await awaitWriteStream(stream.pipe(writeStream))
      this.success({ url: target.replace(baseDir, ''), filename })
    } catch (err) {
      await sendToWormhole(stream)
      throw err
    }
  }

  // - 保存或者补充商品详细信息, 将完善该记录的一些字段数据到数据库，通常用于第一次上架该商品
  async saveFull(): Promise<void> {
    type SGoodsPartial = GoodsPartial & { tags: string[] }
    const { service, ctx } = this
    const params: SGoodsPartial = ctx.request.body
    const { id } = params
    delete params.categorys // - 删除类目，不然保存的时候会更新类目
    try {
      let raw: GoodsPartial = {}
      if (id) {
        await service.admin.goods.createTags(id, params.tags)
        raw = await service.admin.goods.findById(id)
      }
      // console.log(params);

      await service.admin.goods.saveOne({ ...raw, ...params, isOnline: 1 })
      this.success()
    } catch (err) {
      throw err
    }
  }

  // - 切换商品状态(1：在售 OR 0：下架)
  async toggleStatus(): Promise<void> {
    let { id, isOnline } = this.ctx.request.body
    isOnline = isOnline === 1 ? 0 : 1
    try {
      const raw = await this.service.admin.goods.findById(id)
      await this.service.admin.goods.saveOne({ ...raw, isOnline })
      this.success(isOnline)
    } catch (err) {
      throw err
    }
  }
}
