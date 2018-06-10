import { Repository, ObjectLiteral } from 'typeorm';
import BaseService from '../core/base-service';
import GoodsCategory from '../db/entity/goods-category';

export default class GoodsCategoryService extends BaseService {

  // -------------------------------------------------------------------------
  // Public Properties
  // -------------------------------------------------------------------------

  //- 商品分类__实体
  readonly GC: Repository<ObjectLiteral>;

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------

  constructor(ctx) {
    super(ctx);
    this.GC = this.conn.getRepository(GoodsCategory);
  }

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  async query({ page = 1, rows = 20, name }) {
    const where = name ? `category.name LIKE '%${name}%'` : '1 = 1';

    try {
      const query = await this.GC.createQueryBuilder('category');
      const list = await query
        .andWhere(`(${where} OR category.type != 1)`)
        .orderBy('category.no', 'DESC')
        // .skip((page - 1) * rows)
        // .take(rows)
        .getMany();
      const total = await query
        .andWhere(`(${where} AND category.type = 1)`)
        .getCount();
      const idMax = await query
        .andWhere(where)
        .select("MAX(id) AS idMax")
        .getRawMany();

      return { list, total, idMax: idMax[0].idMax };
    } catch (error) {
      this.error(error);
    }
  }

  async save(rowData: any) {
    try {
      await this.GC.save(rowData);
    } catch (error) {
      this.error(error);
    }
  }

  async delete(ids: number[]) {
    try {
      await this.GC.remove(await this.GC.findByIds(ids))
    } catch (error) {
      this.error(error);
    }
  }
}
